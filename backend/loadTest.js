import autocannon from "autocannon";

async function runLoadTest() {
  console.log(
    "Rozpoczynanie testu obciążeniowego dla http://localhost:5000/cars...",
  );
  console.log("Współbieżność: 100 połączeń | Czas trwania: 10 sekund");

  const instance = autocannon(
    {
      url: "http://localhost:5000/cars",
      connections: 100,
      duration: 10,
      pipelining: 1,
    },
    (err, result) => {
      if (err) {
        console.error("Błąd podczas wykonywania testu obciążeniowego:", err);
        return;
      }
      console.log(
        "\n================ TEST OBCIĄŻENIOWY UKOŃCZONY ================",
      );
      console.log(`Łączna liczba żądań: ${result.requests.total}`);
      console.log(`Średnia liczba żądań/s (RPS): ${result.requests.average}`);
      console.log(
        `Średni czas odpowiedzi (Latency): ${result.latency.average} ms`,
      );
      console.log(
        `Maksymalny czas odpowiedzi (Max Latency): ${result.latency.max} ms`,
      );
      console.log(`Błędy (kody nie-2xx): ${result.errors}`);
      console.log(
        "=============================================================\n",
      );
    },
  );

  autocannon.track(instance, { renderProgressBar: true });
}

runLoadTest();
