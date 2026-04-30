import CarCard from './CarCard';

export default function HomePage({
  brand,
  type,
  priceMin,
  priceMax,
  brandOptions,
  typeOptions,
  onBrandChange,
  onTypeChange,
  onPriceMinChange,
  onPriceMaxChange,
  filteredCars,
  onSelectCar,
}) {
  return (
    <>
      <section className="hero">
        <h1>Wybierz samochód na każdą podróż</h1>
        <p>Proste filtrowanie, przejrzyste karty aut i szybki start rezerwacji.</p>
      </section>

      <section className="filters" id="filters">
        <div className="filter-column">
          <label>Marka</label>
          <select value={brand} onChange={(event) => onBrandChange(event.target.value)}>
            {brandOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-column">
          <label>Typ</label>
          <select value={type} onChange={(event) => onTypeChange(event.target.value)}>
            {typeOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-column price-range">
          <label>Cena (od-do)</label>
          <div className="price-inputs">
            <input
              type="number"
              min="0"
              placeholder="Od"
              value={priceMin}
              onChange={(event) => onPriceMinChange(event.target.value)}
            />
            <span>—</span>
            <input
              type="number"
              min="0"
              placeholder="Do"
              value={priceMax}
              onChange={(event) => onPriceMaxChange(event.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="car-list" id="cars">
        <div className="section-header">
          <h2>Lista samochodów</h2>
          <p>Znajdź najlepszą ofertę dla siebie.</p>
        </div>

        <div className="car-grid">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <CarCard key={car.id} car={car} onSelect={onSelectCar} />
            ))
          ) : (
            <div className="no-results">Brak samochodów spełniających kryteria.</div>
          )}
        </div>
      </section>
    </>
  );
}
