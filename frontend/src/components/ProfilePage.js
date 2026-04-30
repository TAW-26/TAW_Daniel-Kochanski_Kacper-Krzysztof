export default function ProfilePage({ userReservationsList, currentUserEmail, onBack, isLoading, error }) {
  return (
    <section className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h2>Mój profil</h2>
          <p>Przegląd Twoich rezerwacji</p>
          {currentUserEmail && <p className="profile-user">Zalogowany jako: {currentUserEmail}</p>}
        </div>

        <div className="profile-menu">
          <h3>Menu</h3>
          <ul>
            <li>Moje rezerwacje</li>
          </ul>
        </div>

        <div className="reservations-section">
          <h3>Lista rezerwacji</h3>
          <div className="reservations-table">
            <div className="table-header">
              <div className="col-auto">Auto ID</div>
              <div className="col-date">Data</div>
              <div className="col-status">Status</div>
            </div>
            {isLoading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Ładowanie rezerwacji...</p>
              </div>
            ) : error ? (
              <div className="error-state">
                <p>Wystąpił błąd: {error}</p>
              </div>
            ) : currentUserEmail ? (
              userReservationsList.length > 0 ? (
                userReservationsList.map((reservation) => (
                  <div key={reservation._id || reservation.id} className="table-row">
                    <div className="col-auto">
                      {reservation.carBrand || reservation.carId} {reservation.carName || ''}
                    </div>
                    <div className="col-date">
                      {new Date(reservation.startDate || reservation.dateFrom).toLocaleDateString()} — {new Date(reservation.endDate || reservation.dateTo).toLocaleDateString()}
                    </div>
                    <div className="col-status">
                      <span className={`status-badge ${(reservation.status || 'Potwierdzona').toLowerCase().replace(/\s/g, '-')}`}>
                        {reservation.status || 'Potwierdzona'}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-reservations">Brak rezerwacji dla tego konta.</div>
              )
            ) : (
              <div className="no-reservations">Zaloguj się, aby zobaczyć swoje rezerwacje.</div>
            )}
          </div>
        </div>

        <div className="profile-actions">
          <button className="secondary-button" onClick={onBack}>
            Powrót do listy samochodów
          </button>
        </div>
      </div>
    </section>
  );
}
