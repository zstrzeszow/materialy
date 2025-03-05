# Instalacja Apache na Ubuntu

![Apache Logo](media/zst2.png)

Aby zainstalować serwer Apache na Ubuntu, wykonaj poniższe kroki.

## 1️⃣ Zainstaluj Apache
Wpisz w terminalu:
```bash
sudo apt update
sudo apt install apache2 -y
```

## 2️⃣ Sprawdź status usługi
Uruchom polecenie:
```bash
sudo systemctl status apache2
```

Jeśli zobaczysz `active (running)`, oznacza to, że serwer działa poprawnie. ✅

---

## **📝 Zadanie**
1. Zainstaluj Apache na swoim komputerze.
2. Sprawdź, czy działa wpisując w przeglądarkę `http://localhost`.
