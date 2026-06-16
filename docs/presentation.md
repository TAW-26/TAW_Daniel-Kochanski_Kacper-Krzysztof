# Prezentacja projektu - System wypożyczania samochodów

## Slajd 1: Tytuł i wprowadzenie
- **Tytuł:** System wypożyczania samochodów
- **Autorzy:** Daniel Kochanski, Kacper Krzysztof
- **Cel:** Przedstawienie pełnowymiarowej aplikacji internetowej do zarządzania wypożyczaniem samochodów

---

## Slajd 2: Cel projektu
- **Główny cel:** Stworzenie aplikacji umożliwiającej użytkownikom przeglądanie, rezerwację i zarządzanie wypożyczeniami samochodów online
- **Zakres funkcjonalności:**
  - Rejestracja i autoryzacja użytkowników
  - Przeglądanie katalogu samochodów z filtrowaniem
  - Sprawdzanie dostępności w wybranych terminach
  - Dokonywanie rezerwacji online
  - Panel administratora do zarządzania flotą i rezerwacjami
  - Profil użytkownika z historią rezerwacji

---

## Slajd 3: Architektura systemu - Przegląd
- **Architektura:** Client-Server (REST API)
- **Frontend:** React.js - SPA (Single Page Application)
- **Backend:** Node.js + Express
- **Baza danych:** MongoDB z Mongoose ODM
- **Autoryzacja:** JWT (JSON Web Tokens)
- **Routing:** Hash-based routing w React

---

## Slajd 4: Architektura - Frontend
- **Struktura komponentów:**
  - `App.js` - główny komponent zarządzający stanem i routingiem
  - `Navbar.js` - nawigacja zależna od statusu logowania
  - `HomePage.js` - lista samochodów z filtrami
  - `CarCard.js` - karta pojedynczego samochodu
  - `CarDetailPage.js` - szczegóły i rezerwacja
  - `AuthPage.js` - logowanie i rejestracja
  - `AdminPanel.js` - panel administratora
  - `ProfilePage.js` - profil użytkownika
- **Styling:** CSS3 z animacjami, transitions, responsive design
- **State Management:** React Hooks (useState, useEffect, useMemo, useCallback)

---

## Slajd 5: Architektura - Backend
- **API Endpoints:**
  - `/auth/*` - autoryzacja (login, register)
  - `/cars/*` - zarządzanie flotą (CRUD)
  - `/reservations/*` - zarządzanie rezerwacjami
  - `/users/*` - zarządzanie użytkownikami (admin)
- **Middleware:** JWT verification, error handling
- **Bezpieczeństwo:** bcryptjs do haszowania haseł
- **Baza danych:** MongoDB z modelami Mongoose

---

## Slajd 6: Model danych
- **User:** email, password (hashed), role (user/admin)
- **Car:** brand, name, type, price, seats, fuel, description, image
- **Reservation:** userId, carId, startDate, endDate, status

---

## Slajd 7: Wyzwania i rozwiązania
- **Wyzwanie:** Walidacja dostępności auta w terminie
  - **Rozwiązanie:** Endpoint `/check-availability` weryfikujący nakładanie się rezerwacji
- **Wyzwanie:** Bezpieczeństwo haseł
  - **Rozwiązanie:** bcryptjs do haszowania przed zapisem do bazy
- **Wyzwanie:** Autoryzacja w API
  - **Rozwiązanie:** JWT tokens z middleware weryfikującym

---


## Slajd 8: Znane ograniczenia
1. **Brak walidacji dat** - System nie sprawdza czy data rozpoczęcia jest wcześniejsza niż data zakończenia
2. **Brak walidacji dostępności** - Rezerwacje mogą się nakładać na ten sam samochód w tym samym terminiee
3. **Brak powiadomień** - Użytkownicy nie otrzymują powiadomień o rezerwacjach
4. **Brak systemu ocen** - Brak możliwości oceny samochodów i rezerwacji
5. **Brak obsługi anulacji** - Rezerwacje nie mogą być anulowane przez użytkowników
6. **Brak historii** - Brak pełnej historii zmian w systemie
7. **Brak testów** - Projekt nie posiada automatycznych testów

---

## Slajd 9: Instrukcja uruchomienia
**Wymagania:**
- Node.js (v14+)
- npm
- MongoDB

**Uruchomienie backendu:**
```bash
cd backend
npm install
npm run dev
```

**Uruchomienie frontendu:**
```bash
cd frontend
npm install
npm start
```

**Dostęp:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

---

## Slajd 10: Podsumowanie
- **Zrealizowane funkcjonalności:**
  - ✅ Pełny system autoryzacji
  - ✅ Katalog samochodów z filtrowaniem
  - ✅ System rezerwacji
  - ✅ Panel administratora
  - ✅ Profil użytkownika
  - ✅ Responsywny design
  - ✅ Ulepszenia UI/UX

- **Technologie:** React, Node.js, Express, MongoDB, JWT
- **Możliwości rozwoju:** Płatności, powiadomienia, testy, wielojęzyczność

---
