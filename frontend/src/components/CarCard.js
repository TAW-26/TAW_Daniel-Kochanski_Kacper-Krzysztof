export default function CarCard({ car, onSelect }) {
  return (
    <article className="car-card">
      <div className="car-card-image">
        <img
          src={car.image}
          alt={`${car.brand} ${car.name}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='500' height='320' viewBox='0 0 500 320'><rect width='100%' height='100%' fill='%23e9ecef'/><text x='50%' y='50%' font-family='Arial, sans-serif' font-size='24' fill='%236c757d' dominant-baseline='middle' text-anchor='middle'>Brak zdjęcia</text></svg>";
          }}
        />
      </div>
      <div className="car-card-content">
        <div className="car-card-title">
          <h3>
            {car.brand} {car.name}
          </h3>
          <span className="car-price">{car.price} zł / dzień</span>
        </div>
        <p>{car.description}</p>
        <ul className="car-features">
          <li>Typ: {car.type}</li>
          <li>Miejsca: {car.seats}</li>
          <li>Paliwo: {car.fuel}</li>
        </ul>
      </div>
      <div className="car-card-actions">
        <button className="secondary-button" onClick={() => onSelect(car)}>
          Szczegóły
        </button>
        <button className="primary-button" onClick={() => onSelect(car)}>
          Rezerwuj
        </button>
      </div>
    </article>
  );
}
