export default function AdminPanel({
  adminSection,
  adminCarsList,
  adminReservationsList,
  adminUsersList,
  adminCarForm,
  adminEditMode,
  onSectionChange,
  onEditCar,
  onDeleteCar,
  onDeleteUser,
  onSaveCar,
  onCancelEdit,
  onFormChange,
  isLoading,
  error,
}) {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Ładowanie danych admina...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="error-state">
          <p>Wystąpił błąd: {error}</p>
        </div>
      );
    }

    return (
      <div className="admin-content">
        {adminSection === 'cars' && (
          <>
            <div className="admin-section-header">
              <h2>Lista samochodów</h2>
              <p>Dodaj nowe auta lub edytuj istniejące pozycje.</p>
            </div>
            <div className="admin-table">
              <div className="table-header">
                <div>Nazwa</div>
                <div>Cena</div>
                <div>Edytuj</div>
                <div>Usuń</div>
              </div>
              {adminCarsList.length > 0 ? (
                adminCarsList.map((car) => (
                  <div key={car._id || car.id} className="table-row">
                    <div>{car.brand} {car.name}</div>
                    <div>{car.price} zł</div>
                    <div>
                      <button className="secondary-button" onClick={() => onEditCar(car)}>
                        Edytuj
                      </button>
                    </div>
                    <div>
                      <button className="secondary-button" onClick={() => onDeleteCar(car._id || car.id)}>
                        Usuń
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">Brak samochodów w bazie.</div>
              )}
            </div>
            <div className="admin-form">
              <h3>{adminEditMode ? 'Edytuj samochód' : 'Dodaj samochód'}</h3>
              <div className="form-grid">
                <label>
                  Marka
                  <input value={adminCarForm.brand} onChange={(event) => onFormChange('brand', event.target.value)} />
                </label>
                <label>
                  Model
                  <input value={adminCarForm.name} onChange={(event) => onFormChange('name', event.target.value)} />
                </label>
                <label>
                  Typ
                  <input value={adminCarForm.type} onChange={(event) => onFormChange('type', event.target.value)} />
                </label>
                <label>
                  Cena
                  <input type="number" value={adminCarForm.price} onChange={(event) => onFormChange('price', event.target.value)} />
                </label>
                <label>
                  Miejsca
                  <input type="number" value={adminCarForm.seats} onChange={(event) => onFormChange('seats', event.target.value)} />
                </label>
                <label>
                  Paliwo
                  <input value={adminCarForm.fuel} onChange={(event) => onFormChange('fuel', event.target.value)} />
                </label>
                <label className="full-width">
                  Opis
                  <input value={adminCarForm.description} onChange={(event) => onFormChange('description', event.target.value)} />
                </label>
              </div>
              <div className="admin-form-actions">
                <button className="primary-button" onClick={onSaveCar}>
                  Zapisz
                </button>
                {adminEditMode && (
                  <button className="secondary-button" onClick={onCancelEdit}>
                    Anuluj
                  </button>
                )}
              </div>
            </div>
          </>
        )}

        {adminSection === 'reservations' && (
          <>
            <div className="admin-section-header">
              <h2>Lista rezerwacji</h2>
              <p>Przegląd wszystkich rezerwacji w systemie.</p>
            </div>
            <div className="admin-table">
              <div className="table-header">
                <div>Użytkownik</div>
                <div>Auto</div>
                <div>Data</div>
                <div>Status</div>
              </div>
              {adminReservationsList.length > 0 ? (
                adminReservationsList.map((reservation) => (
                  <div key={reservation._id || reservation.id} className="table-row">
                    <div>{reservation.userEmail || reservation.user || reservation.userId}</div>
                    <div>{reservation.carBrand || reservation.carId}</div>
                    <div>{new Date(reservation.startDate).toLocaleDateString()} — {new Date(reservation.endDate).toLocaleDateString()}</div>
                    <div>{reservation.status || 'Potwierdzona'}</div>
                  </div>
                ))
              ) : (
                <div className="no-results">Brak rezerwacji w bazie.</div>
              )}
            </div>
          </>
        )}

        {adminSection === 'users' && (
          <>
            <div className="admin-section-header">
              <h2>Lista użytkowników</h2>
              <p>Przegląd kont i ról w systemie.</p>
            </div>
            <div className="admin-table">
              <div className="table-header">
                <div>Email</div>
                <div>Rola</div>
                <div>Usuń</div>
              </div>
              {adminUsersList.length > 0 ? (
                adminUsersList.map((user) => (
                  <div key={user._id || user.id} className="table-row">
                    <div>{user.email}</div>
                    <div>{user.role || 'Użytkownik'}</div>
                    <div>
                      <button className="secondary-button" onClick={() => onDeleteUser(user._id || user.id)}>Usuń</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">Brak użytkowników w bazie.</div>
              )}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <section className="admin-page">
      <div className="admin-container">
        <aside className="admin-menu">
          <h3>MENU ADMINA</h3>
          <button className={adminSection === 'cars' ? 'active' : ''} onClick={() => onSectionChange('cars')}>
            Samochody
          </button>
          <button className={adminSection === 'reservations' ? 'active' : ''} onClick={() => onSectionChange('reservations')}>
            Rezerwacje
          </button>
          <button className={adminSection === 'users' ? 'active' : ''} onClick={() => onSectionChange('users')}>
            Użytkownicy
          </button>
        </aside>

        {renderContent()}
      </div>
    </section>
  );
}
