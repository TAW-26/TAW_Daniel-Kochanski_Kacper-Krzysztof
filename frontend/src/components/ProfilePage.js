export default function ProfilePage({ userReservationsList, currentUserEmail, onBack }) {
  const filteredReservations = userReservationsList.filter((reservation) => reservation.userEmail === currentUserEmail);

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
              <div className="col-auto">Auto</div>
              <div className="col-date">Data</div>
              <div className="col-status">Status</div>
            </div>
            {currentUserEmail ? (
              filteredReservations.length > 0 ? (
                filteredReservations.map((reservation) => (
                  <div key={reservation.id} className="table-row">
                    <div className="col-auto">
                      {reservation.carBrand} {reservation.carName}
                    </div>
                    <div className="col-date">
                      {reservation.dateFrom} — {reservation.dateTo}
                    </div>
                    <div className="col-status">
                      <span className={`status-badge ${reservation.status.toLowerCase().replace(/\s/g, '-')}`}>
                        {reservation.status}
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
