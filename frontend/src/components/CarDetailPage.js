export default function CarDetailPage({
  view,
  selectedCar,
  dateFrom,
  dateTo,
  daysCount,
  totalPrice,
  availability,
  reservationMessage,
  onDateFromChange,
  onDateToChange,
  onCheckAvailability,
  onReserve,
  onConfirmBooking,
  onBack,
  isLoading,
}) {
  if (!selectedCar) {
    return null;
  }

  if (view === 'details') {
    return (
      <section className="car-detail">
        <div className="detail-card">
          <div className="detail-hero">
            <img className="detail-image" src={selectedCar.image} alt={`${selectedCar.brand} ${selectedCar.name}`} />
            <div className="detail-meta">
              <h2>{selectedCar.brand} {selectedCar.name}</h2>
              <div className="detail-price">{selectedCar.price} zł / dzień</div>
              <p className="detail-description">{selectedCar.description}</p>
            </div>
          </div>

          <div className="detail-info">
            <h3>Informacje</h3>
            <ul>
              <li>Marka: {selectedCar.brand}</li>
              <li>Typ pojazdu: {selectedCar.type}</li>
              <li>Paliwo: {selectedCar.fuel}</li>
              <li>Miejsca: {selectedCar.seats}</li>
            </ul>
          </div>

          <div className="detail-booking">
            <h3>Wybór daty</h3>
            <div className="date-grid">
              <label>
                Od
                <input type="date" value={dateFrom} onChange={(event) => onDateFromChange(event.target.value)} />
              </label>
              <label>
                Do
                <input type="date" value={dateTo} onChange={(event) => onDateToChange(event.target.value)} />
              </label>
            </div>
            <button className="secondary-button" onClick={onCheckAvailability}>
              Sprawdź dostępność
            </button>

            {daysCount > 0 && (
              <div className="booking-summary">
                <span>Liczba dni: {daysCount}</span>
                <span>Cena całkowita: {totalPrice} zł</span>
              </div>
            )}

            {availability && <div className="availability-message">{availability}</div>}

            <div className="detail-actions">
              <button className="secondary-button" onClick={onBack}>
                Powrót do listy
              </button>
              <button className="primary-button" onClick={onReserve}>
                Rezerwuj
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="car-detail">
      <div className="detail-card">
        <div className="detail-hero">
          <img className="detail-image" src={selectedCar.image} alt={`${selectedCar.brand} ${selectedCar.name}`} />
          <div className="detail-meta">
            <h2>{selectedCar.brand} {selectedCar.name}</h2>
            <div className="detail-price">{selectedCar.price} zł / dzień</div>
          </div>
        </div>

        <div className="detail-booking">
          <h3>Daty rezerwacji</h3>
          <div className="date-grid">
            <label>
              Od
              <input type="date" value={dateFrom} onChange={(event) => onDateFromChange(event.target.value)} />
            </label>
            <label>
              Do
              <input type="date" value={dateTo} onChange={(event) => onDateToChange(event.target.value)} />
            </label>
          </div>

          {daysCount > 0 && (
            <div className="booking-summary">
              <span>Liczba dni: {daysCount}</span>
              <span>Cena całkowita: {totalPrice} zł</span>
            </div>
          )}

          {reservationMessage && <div className="availability-message">{reservationMessage}</div>}

          <div className="detail-actions">
            <button className="secondary-button" onClick={onBack}>
              Powrót do szczegółów
            </button>
            <button className="primary-button" onClick={onConfirmBooking}>
              Potwierdź rezerwację
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
