# System wypożyczania samochodów

## Opis projektu

System wypożyczania samochodów to aplikacja internetowa umożliwiająca użytkownikom przeglądanie dostępnych pojazdów oraz dokonywanie ich rezerwacji online.  
Użytkownicy mogą tworzyć konto, logować się do systemu oraz zarządzać swoimi rezerwacjami.

System zawiera również panel administratora, który pozwala zarządzać flotą samochodów oraz rezerwacjami użytkowników.

---

## Użyte technologie

Frontend:
- React.js

Backend:
- Node.js
- Express

Baza danych:
- MongoDB

---

## Instrukcja uruchomienia projektu

### Wymagania

Aby uruchomić projekt lokalnie należy mieć zainstalowane:

- Node.js
- npm
- MongoDB

---

### 1. Sklonowanie repozytorium

```bash
git clone https://github.com/TWOJ_LOGIN/car-rental-system.git
cd car-rental-system
```

---

### 2. Uruchomienie backendu

```bash
cd backend
npm install
npm run dev
```

Backend będzie dostępny pod adresem:

```
http://localhost:5000
```

---

### 3. Uruchomienie frontendu

W nowym terminalu:

```bash
cd frontend
npm install
npm start
```

Frontend będzie dostępny pod adresem:

```
http://localhost:3000
```

---

## Dokumentacja

Dokumentacja projektu znajduje się w katalogu `docs` w repozytorium:

```
docs/
```

Można ją również zobaczyć tutaj:

https://github.com/TWOJ_LOGIN/car-rental-system/tree/main/docs