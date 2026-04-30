export default function CarCard({ car, onSelect }) {
  return (
    <article className="car-card">
      <div className="car-card-image">
        <img src={car.image} alt={`${car.brand} ${car.name}`} />
      </div>
      <div className="car-card-content">
        <div className="car-card-title">
          <h3>{car.brand} {car.name}</h3>
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
