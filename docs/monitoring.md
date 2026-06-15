# Dokumentacja Monitoringu Aplikacji (Prometheus & Grafana)

Niniejszy dokument opisuje konfigurację i uruchomienie lokalnego systemu monitorowania dla aplikacji backendowej (Node.js/Express) wypożyczalni samochodów, opartego o model pull przy użyciu serwera **Prometheus** oraz panelu wizualizacyjnego **Grafana**.

---

## 1. Jak działa monitoring w aplikacji

System monitorowania działa w oparciu o model **pull**. 
- Aplikacja Node.js zbiera metryki w pamięci podręcznej za pomocą biblioteki `prom-client` i udostępnia je na dedykowanym punkcie końcowym (endpoint) `http://localhost:5000/metrics`.
- Serwer Prometheus w regularnych odstępach czasu (konfigurowalnych, np. co 5 sekund) odpytuje endpoint `/metrics` i zapisuje pobrane dane w bazie danych szeregów czasowych (TSDB).
- Grafana łączy się z serwerem Prometheus jako źródło danych (Data Source) i wizualizuje metryki na dashboardzie.

### Unikanie wysokiej kardynalności (High Cardinality)
W middleware monitorującym zastosowano mapowanie ścieżek żądania za pomocą `req.route?.path ?? req.path`. Dzięki temu ścieżki zawierające dynamiczne identyfikatory bazodanowe (np. `/cars/65b2a5d2fb321a0012abc345`) są rejestrowane jako wzorce (np. `/cars/:id`). Zapobiega to eksplozji liczby unikalnych szeregów czasowych w bazie danych Prometheusa i chroni go przed wyczerpaniem pamięci RAM.

---

## 2. Metryki Aplikacji

Aplikacja udostępnia następujące kluczowe metryki:

| Nazwa Metryki | Typ | Etykiety (Labels) | Opis |
| :--- | :--- | :--- | :--- |
| `process_resident_memory_bytes` | Gauge | *Brak (domyślna)* | Aktualne zużycie pamięci fizycznej RAM przez proces Node.js. |
| `process_uptime_seconds` | Counter | *Brak (domyślna)* | Czas działania procesu Node.js w sekundach. |
| `http_requests_total` | Counter | `method`, `route`, `status_code` | Łączna liczba odebranych żądań HTTP (pozwala filtrować wg metody, trasy i statusu HTTP). |
| `http_request_duration_ms` | Histogram | `method`, `route`, `status_code` | Czas trwania żądań w ms, grupowany w kubełki (`[5, 10, 25, 50, 100, 250, 500, 1000]`). |
| `active_connections` | Gauge | *Brak* | Liczba aktualnie przetwarzanych połączeń HTTP. |
| `api_errors_total` | Counter | `type` | Łączna liczba błędów API typu `bad_request` (400) oraz `not_found` (404). |

---

## 3. Konfiguracja i Uruchomienie Prometheusa

Prometheus jest uruchamiany jako pojedynczy plik binarny.

### 3.1. Instalacja
- **Windows:** Pobierz plik `.zip` ze strony [prometheus.io/download](https://prometheus.io/download), rozpakuj go.
- **macOS:** `brew install prometheus`
- **Linux:** Pobierz paczkę `tar.gz` ze strony pobierania i rozpakuj ją.

### 3.2. Plik konfiguracyjny (`backend/prometheus.yml`)
W projekcie w katalogu `backend/` znajduje się gotowa konfiguracja:
```yaml
global:
  scrape_interval:     15s   # Domyślny interwał zbierania metryk
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'car-rental-backend'
    static_configs:
      - targets: ['localhost:5000']   # Adres i port naszej aplikacji Express
    metrics_path: '/metrics'
    scrape_interval: 5s              # Krótszy interwał na potrzeby dewelopmentu
```

### 3.3. Uruchomienie serwera Prometheus
W terminalu przejdź do katalogu z binarką Prometheusa (lub jeśli masz go w PATH) i uruchom polecenie wskazujące na plik konfiguracyjny w naszym projekcie:

- **Windows / Linux / macOS (z katalogu binarki):**
  ```bash
  ./prometheus --config.file=/sciezka/do/projektu/backend/prometheus.yml
  ```
  *(Zastąp `/sciezka/do/projektu` rzeczywistą ścieżką do folderu projektu).*

Po uruchomieniu przejdź w przeglądarce pod adres: **[http://localhost:9090](http://localhost:9090)**.
W menu górnym wybierz **Status** -> **Targets** i upewnij się, że cel `car-rental-backend` ma status **UP** (zielony).

---

## 4. Konfiguracja i Uruchomienie Grafany

Grafana pozwala na wizualizację danych zebranych przez Prometheusa.

### 4.1. Instalacja i Uruchomienie
- **Windows:** Pobierz instalator `.msi` ze strony [grafana.com/grafana/download](https://grafana.com/grafana/download) i przejdź przez instalator. Usługa Grafany uruchomi się automatycznie.
- **macOS:** `brew install grafana && brew services start grafana`
- **Linux:** `sudo apt install grafana && sudo systemctl start grafana-server`

Domyślnie Grafana działa pod adresem **[http://localhost:3000](http://localhost:3000)**. 
*(Ponieważ nasz backend działa na porcie `5000`, nie dochodzi do konfliktu portów).*

Zaloguj się danymi: **admin / admin** (przy pierwszym logowaniu zostaniesz poproszony o zmianę hasła).

### 4.2. Dodanie źródła danych (Datasource)
1. W lewym menu wybierz: **Connections** -> **Data sources**.
2. Kliknij **Add new data source**.
3. Wybierz **Prometheus**.
4. W polu **Prometheus server URL** wpisz: `http://localhost:9090`.
5. Przewiń na sam dół i kliknij **Save & test**. Powinien pojawić się zielony komunikat o poprawnym połączeniu.

### 4.3. Import gotowego dashboardu
1. W lewym menu wybierz: **Dashboards** -> **Import** (lub kliknij "+" w prawym górnym rogu i wybierz *Import dashboard*).
2. Kliknij **Upload dashboard JSON file** i wskaż plik z projektu: `backend/grafana-dashboard.json`.
3. W sekcji *Prometheus* na dole okna importu wybierz z listy dodane wcześniej źródło danych.
4. Kliknij **Import**.

Dashboard zawiera 9 paneli pogrupowanych w sekcje (Uptime, Aktywne połączenia, Łączna liczba żądań, Wykres pamięci RAM, Przepustowość RPS, Latency p50/p95, Metody HTTP, Popularność endpointów oraz Statystyka Błędów API).

---

## 5. Ściąga zapytań PromQL

W interfejsie Prometheusa (`http://localhost:9090`) lub w panelach Grafany używane są poniższe zapytania:

| Zapytanie PromQL | Co mierzy |
| :--- | :--- |
| `rate(http_requests_total[1m])` | Średnia liczba żądań HTTP na sekundę (obliczana z ostatniej minuty). |
| `sum by(method)(rate(http_requests_total[1m]))` | Przepływ żądań na sekundę z podziałem na metody HTTP (GET, POST, PUT, DELETE). |
| `histogram_quantile(0.95, sum by (le) (rate(http_request_duration_ms_bucket[1m])))` | Czas w ms, w którym mieści się 95% wszystkich zapytań (95 percentyl czasu odpowiedzi). |
| `process_resident_memory_bytes / 1024 / 1024` | Zużycie pamięci RAM w megabajtach (MB). |
| `sum by(route) (rate(http_requests_total[1m]))` | Przepływ żądań na sekundę na poszczególne ścieżki i szablony tras. |
| `sum by(type) (api_errors_total)` | Sumaryczna liczba błędów API (400 / 404) z podziałem na ich typ (`bad_request` / `not_found`). |

---

## 6. Procedura Weryfikacji (Testowanie lokalne)

Aby sprawdzić, czy cały system działa prawidłowo:
1. Uruchom bazę danych MongoDB lokalnie (lub upewnij się, że jest dostępna).
2. Uruchom backend:
   ```bash
   cd backend
   npm run dev
   ```
3. Wyślij zapytanie testowe na endpoint metryk:
   ```bash
   curl http://localhost:5000/metrics
   ```
   Powinieneś otrzymać tekst zaczynający się od linii `# HELP ...` i `# TYPE ...`.
4. Wygeneruj błędy API w celu przetestowania metryki `api_errors_total`:
   - Odpytaj nieistniejący samochód (wygenerowanie błędu 404):
     ```bash
     curl http://localhost:5000/cars/65b2a5d2fb321a0012abc345
     ```
   - Wyślij żądanie rejestracji bez wymaganych danych (wygenerowanie błędu 400):
     ```bash
     curl -X POST http://localhost:5000/auth/register -H "Content-Type: application/json" -d "{}"
     ```
5. Wejdź na `http://localhost:9090` i wyszukaj metrykę `api_errors_total` lub `http_requests_total` klikając **Execute**. Powinny pojawić się zainkrementowane wartości z odpowiednimi etykietami.
