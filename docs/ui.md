# UI / Layout aplikacji

##  Założenia ogólne

* Prosty i czytelny interfejs użytkownika
* Podział na:

  * część użytkownika
  * panel administratora
* Responsywność (desktop + mobile)
* Nawigacja oparta o navbar + routing

---

#  1. Strona główna / Lista samochodów

## Layout

```
[ NAVBAR ]
----------------------------------
| Logo | Samochody | Login/Register |
----------------------------------

[ FILTRY ]
----------------------------------
| Marka | Typ | Cena (od-do)       |
----------------------------------

[ LISTA SAMOCHODÓW ]
----------------------------------
| 🚗 Karta auta                  |
| 🚗 Karta auta                  |
| 🚗 Karta auta                  |
----------------------------------
```

## Funkcjonalności

* przeglądanie dostępnych samochodów
* filtrowanie:

  * marka
  * typ pojazdu
  * cena
* karta samochodu zawiera:

  * nazwę auta
  * podstawowe dane
  * przycisk „Szczegóły” / „Rezerwuj”

---

#  2. Szczegóły samochodu

## Layout

```
----------------------------------
| Zdjęcie / Nazwa samochodu      |
| Cena za dzień                  |
----------------------------------

[ INFORMACJE ]
- marka
- typ pojazdu
- opis

[ WYBÓR DATY ]
[ Sprawdź dostępność ]

[ REZERWUJ ]
```

## Funkcjonalności

* wyświetlenie szczegółów auta
* wybór zakresu dat
* sprawdzenie dostępności w wybranym terminie
* przejście do rezerwacji

---

#  3. Rezerwacja

## Layout

```
----------------------------------
| WYBRANY SAMOCHÓD              |
----------------------------------

[ DATY REZERWACJI ]
- od
- do

[ PODSUMOWANIE ]
- liczba dni
- cena całkowita

[ POTWIERDŹ REZERWACJĘ ]
```

## Funkcjonalności

* rezerwacja samochodu
* walidacja dostępności
* zapis rezerwacji w systemie

---

#  4. Panel użytkownika

## Layout

```
----------------------------------
| MENU                           |
| - Moje rezerwacje             |
----------------------------------

[ LISTA REZERWACJI ]
----------------------------------
| Auto | Data | Status          |
| Auto | Data | Status          |
----------------------------------
```

## Funkcjonalności

* podgląd własnych rezerwacji
* informacje:

  * samochód
  * daty
  * status

---

#  5. Logowanie i rejestracja

## Layout

```
[ LOGOWANIE ]
Email
Hasło
[ Zaloguj ]

[ REJESTRACJA ]
Email
Hasło
[ Zarejestruj ]
```

## Funkcjonalności

* rejestracja użytkownika
* logowanie do systemu
* obsługa sesji użytkownika

---

#  6. Panel administratora

## Layout

```
----------------------------------
| MENU ADMINA                    |
| - Samochody                   |
| - Rezerwacje                  |
| - Użytkownicy                 |
----------------------------------
```

---

## 6.1 Zarządzanie samochodami

```
[ LISTA SAMOCHODÓW ]
----------------------------------
| Nazwa | Cena | Edytuj | Usuń   |
----------------------------------

[ DODAJ SAMOCHÓD ]
```

### Funkcjonalności

* dodawanie nowych samochodów
* edycja danych samochodu
* usuwanie samochodów

---

## 6.2 Zarządzanie rezerwacjami

```
[ LISTA REZERWACJI ]
----------------------------------
| Użytkownik | Auto | Data       |
----------------------------------
```

### Funkcjonalności

* podgląd wszystkich rezerwacji
* zarządzanie rezerwacjami

---

## 6.3 Zarządzanie użytkownikami

```
[ LISTA UŻYTKOWNIKÓW ]
----------------------------------
| Email | Rola | Usuń            |
----------------------------------
```

### Funkcjonalności

* podgląd kont użytkowników
* zarządzanie kontami

---

#  Routing aplikacji

```
/                → lista samochodów
/cars/:id        → szczegóły samochodu
/booking/:id     → rezerwacja
/profile         → panel użytkownika
/admin           → panel admina
/login
/register
```
