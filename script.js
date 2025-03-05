const jsonLocation = "json/";
const lekcjeLocation = "lekcje/";

function loadMenu() {
	const nav = document.querySelector("nav");

	fetch(`${jsonLocation}lekcje.json`)
		.then((response) => response.json())
		.then((data) => {
			data.forEach((category, index) => {
        const button = document.createElement("button");
        button.innerText = category.nazwa;
        button.onclick = () => loadCategory(index);
        nav.appendChild(button);
    	});
		})
}

function loadCategory(index) {
	const main = document.querySelector("main");
	main.innerHTML = "";

	fetch(`${jsonLocation}lekcje.json`)
		.then((response) => response.json())
		.then((data) => {
			const name = document.createElement("h2");
			name.innerHTML = data[index].nazwa;
			main.appendChild(name);

			data[index].lekcje.forEach((lesson) => {
				const button = document.createElement("button");
				button.innerText = lesson.tytul;
				button.onclick = () => loadLesson(lesson.plik);
				main.appendChild(button);
			})
		})
}

function loadLesson(file) {
	const main = document.querySelector("main");

	fetch(`${lekcjeLocation}${file}`)
		.then((response) => response.text())
		.then((markdownText) => {
			const lesson = document.createElement("div");
			lesson.classList.add("md");
			lesson.innerHTML = marked.parse(markdownText);
			main.innerHTML = "";
			main.appendChild(lesson);
			hljs.highlightAll();

			loadQuiz(file);
		})
}

function loadQuiz(file) {
	const main = document.querySelector("main");

	fetch(`${jsonLocation}quizy.json`)
		.then((response) => response.json())
		.then((quizData) => {
			if (quizData[file]) {
				const quizDiv = document.createElement("div");
				quizDiv.innerHTML = "<hr><h2>Quiz</h2>";
				quizDiv.classList.add("quiz");

				quizData[file].forEach((question, index) => {
					const div = document.createElement("div");
					div.innerHTML = `<p><strong>${question.pytanie}</strong></p>`;

					question.odpowiedzi.forEach((answer, i) => {
						div.innerHTML += `
							<label>
								<input type="radio" name="pyt${index}" value="${i}"> ${answer}
							</label><br>`;
					});

					quizDiv.appendChild(div);
				})

				quizDiv.innerHTML += `<button onclick="checkQuiz('${file}')">Sprawdź odpowiedzi</button><p id="quiz-result"></p>`;
				main.appendChild(quizDiv);
			}
		})
}

function checkQuiz(file) {
	fetch(`${jsonLocation}quizy.json`)
		.then((response) => response.json())
		.then((quizData) => {
			if (!quizData[file]) return;
			
			let correct = 0;
			quizData[file].forEach((question, index) => {
				const selected = document.querySelector(`input[name="pyt${index}"]:checked`);
				if (selected && parseInt(selected.value) === question.poprawna) {
					correct++;
				}
			})

			document.getElementById("quiz-result").innerText = `Twój wynik: ${correct} / ${quizData[file].length}`;
		})
}

document.addEventListener("DOMContentLoaded", loadMenu);