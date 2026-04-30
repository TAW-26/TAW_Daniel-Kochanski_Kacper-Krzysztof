import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import AuthPage from './components/AuthPage';
import CarDetailPage from './components/CarDetailPage';
import AdminPanel from './components/AdminPanel';
import ProfilePage from './components/ProfilePage';
import {
  cars,
  brandOptions,
  typeOptions,
  userReservations,
  adminReservations,
  adminUsers,
} from './data';

function App() {
  const [brand, setBrand] = useState('Wszystkie');
  const [type, setType] = useState('Wszystkie');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [selectedCar, setSelectedCar] = useState(null);
  const [view, setView] = useState('home');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [availability, setAvailability] = useState('');
  const [reservationMessage, setReservationMessage] = useState('');
  const [userReservationsList, setUserReservationsList] = useState(userReservations);
  const [adminCarsList, setAdminCarsList] = useState(cars);
  const [adminReservationsList] = useState(adminReservations);
  const [adminUsersList] = useState(adminUsers);
  const [adminSection, setAdminSection] = useState('cars');
  const [adminCarForm, setAdminCarForm] = useState({
    id: null,
    brand: '',
    type: '',
    name: '',
    price: '',
    seats: '',
    fuel: '',
    description: '',
  });
  const [adminEditMode, setAdminEditMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [authMessage, setAuthMessage] = useState('');

  const filteredCars = useMemo(() => {
    return adminCarsList.filter((car) => {
      const matchBrand = brand === 'Wszystkie' || car.brand === brand;
      const matchType = type === 'Wszystkie' || car.type === type;
      const min = priceMin ? Number(priceMin) : 0;
      const max = priceMax ? Number(priceMax) : Number.MAX_SAFE_INTEGER;
      const matchPrice = car.price >= min && car.price <= max;
      return matchBrand && matchType && matchPrice;
    });
  }, [brand, type, priceMin, priceMax, adminCarsList]);

  const daysCount = useMemo(() => {
    if (!dateFrom || !dateTo) return 0;
    const from = new Date(dateFrom);
    const to = new Date(dateTo);
    const diff = Math.ceil((to - from) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [dateFrom, dateTo]);

  const totalPrice = selectedCar ? selectedCar.price * daysCount : 0;

  const parseHash = () => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) {
      return { view: 'home', carId: null };
    }
    if (hash === 'profile') {
      return { view: 'profile', carId: null };
    }
    if (hash === 'login') {
      return { view: 'login', carId: null };
    }
    if (hash === 'register') {
      return { view: 'register', carId: null };
    }
    if (hash === 'admin') {
      return { view: 'admin', carId: null };
    }
    let match = hash.match(/^details-(\d+)$/);
    if (match) {
      return { view: 'details', carId: Number(match[1]) };
    }
    match = hash.match(/^booking-(\d+)$/);
    if (match) {
      return { view: 'booking', carId: Number(match[1]) };
    }
    return { view: 'home', carId: null };
  };

  const setCarFromHash = useCallback(() => {
    const parsed = parseHash();
    if (parsed.view === 'profile') {
      if (!isLoggedIn) {
        window.location.hash = 'login';
        return;
      }
      setSelectedCar(null);
      setView('profile');
      setAvailability('');
      return;
    }
    if (parsed.view === 'login' || parsed.view === 'register') {
      setSelectedCar(null);
      setView(parsed.view);
      setAuthMessage('');
      setLoginEmail('');
      setLoginPassword('');
      setRegisterEmail('');
      setRegisterPassword('');
      return;
    }
    if (parsed.view === 'admin') {
      setSelectedCar(null);
      setView('admin');
      setAdminSection('cars');
      return;
    }
    if (parsed.view === 'details' || parsed.view === 'booking') {
      const car = cars.find((item) => item.id === parsed.carId);
      if (car) {
        setSelectedCar(car);
        setView(parsed.view);
        setDateFrom('');
        setDateTo('');
        setAvailability('');
        return;
      }
    }

    setSelectedCar(null);
    setView('home');
    setAvailability('');
  }, [isLoggedIn]);

  useEffect(() => {
    setCarFromHash();
    const handleHashChange = () => setCarFromHash();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [setCarFromHash]);

  const handleSelectCar = (car) => {
    window.location.hash = `details-${car.id}`;
  };

  const handleBack = () => {
    if (view === 'booking') {
      window.location.hash = `details-${selectedCar?.id ?? ''}`;
      return;
    }
    if (view === 'profile' || view === 'login' || view === 'register') {
      window.location.hash = '';
      return;
    }
    window.location.hash = '';
  };

  const navigate = (page) => {
    if (page === 'home') {
      window.location.hash = '';
      return;
    }
    window.location.hash = page;
  };

  const handleFieldChange = (field, value) => {
    if (field === 'loginEmail') setLoginEmail(value);
    if (field === 'loginPassword') setLoginPassword(value);
    if (field === 'registerEmail') setRegisterEmail(value);
    if (field === 'registerPassword') setRegisterPassword(value);
  };

  const handleLogin = () => {
    if (!loginEmail || !loginPassword) {
      setAuthMessage('Wprowadź email i hasło.');
      return;
    }
    if (!loginEmail.includes('@')) {
      setAuthMessage('Wprowadź prawidłowy email.');
      return;
    }
    setIsLoggedIn(true);
    setCurrentUserEmail(loginEmail);
    setAuthMessage('Zalogowano pomyślnie!');
    setLoginEmail('');
    setLoginPassword('');
    setTimeout(() => {
      window.location.hash = '';
    }, 1000);
  };

  const handleRegister = () => {
    if (!registerEmail || !registerPassword) {
      setAuthMessage('Wprowadź email i hasło.');
      return;
    }
    if (!registerEmail.includes('@')) {
      setAuthMessage('Wprowadź prawidłowy email.');
      return;
    }
    if (registerPassword.length < 6) {
      setAuthMessage('Hasło musi mieć co najmniej 6 znaków.');
      return;
    }
    setIsLoggedIn(true);
    setCurrentUserEmail(registerEmail);
    setAuthMessage('Konto utworzone. Zalogowano pomyślnie!');
    setRegisterEmail('');
    setRegisterPassword('');
    setTimeout(() => {
      window.location.hash = '';
    }, 1000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUserEmail('');
    window.location.hash = '';
  };

  const handleAdminSection = (section) => {
    setAdminSection(section);
  };

  const handleAdminFormChange = (field, value) => {
    setAdminCarForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditCar = (car) => {
    setAdminEditMode(true);
    setAdminCarForm({
      id: car.id,
      brand: car.brand,
      type: car.type,
      name: car.name,
      price: car.price,
      seats: car.seats,
      fuel: car.fuel,
      description: car.description,
    });
  };

  const handleDeleteCar = (id) => {
    setAdminCarsList(adminCarsList.filter((car) => car.id !== id));
    if (selectedCar?.id === id) {
      setSelectedCar(null);
      setView('home');
      window.location.hash = '';
    }
  };

  const handleSaveCar = () => {
    const newCar = {
      id: adminEditMode ? adminCarForm.id : adminCarsList.length + 1,
      brand: adminCarForm.brand,
      type: adminCarForm.type,
      name: adminCarForm.name,
      price: Number(adminCarForm.price) || 0,
      seats: Number(adminCarForm.seats) || 4,
      fuel: adminCarForm.fuel,
      description: adminCarForm.description,
    };

    if (adminEditMode) {
      setAdminCarsList(adminCarsList.map((car) => (car.id === newCar.id ? newCar : car)));
    } else {
      setAdminCarsList([...adminCarsList, newCar]);
    }

    setAdminCarForm({
      id: null,
      brand: '',
      type: '',
      name: '',
      price: '',
      seats: '',
      fuel: '',
      description: '',
    });
    setAdminEditMode(false);
  };

  const handleCancelEdit = () => {
    setAdminCarForm({
      id: null,
      brand: '',
      type: '',
      name: '',
      price: '',
      seats: '',
      fuel: '',
      description: '',
    });
    setAdminEditMode(false);
  };

  const handleCheckAvailability = () => {
    if (!dateFrom || !dateTo) {
      setAvailability('Wprowadź zakres dat, aby sprawdzić dostępność.');
      return;
    }
    if (daysCount <= 0) {
      setAvailability('Wybierz poprawny zakres dat (data zakończenia musi być późniejsza niż data rozpoczęcia).');
      return;
    }
    setAvailability('Termin dostępny! Możesz przejść do rezerwacji.');
  };

  const handleReserve = () => {
    if (!selectedCar) return;
    if (!dateFrom || !dateTo) {
      setAvailability('Wprowadź zakres dat, aby przejść do rezerwacji.');
      return;
    }
    if (daysCount <= 0) {
      setAvailability('Wybierz poprawny zakres dat (data zakończenia musi być późniejsza niż data rozpoczęcia).');
      return;
    }
    setAvailability('');
    setReservationMessage('');
    window.location.hash = `booking-${selectedCar.id}`;
  };

  const handleConfirmBooking = () => {
    if (!selectedCar || daysCount <= 0) {
      setReservationMessage('Wprowadź poprawny zakres dat przed potwierdzeniem rezerwacji.');
      return;
    }
    const newReservation = {
      id: userReservationsList.length + 1,
      userEmail: currentUserEmail || 'guest@example.com',
      carId: selectedCar.id,
      carBrand: selectedCar.brand,
      carName: selectedCar.name,
      dateFrom: dateFrom,
      dateTo: dateTo,
      status: 'Potwierdzona',
    };
    setUserReservationsList([...userReservationsList, newReservation]);
    setReservationMessage(`Rezerwacja ${selectedCar.brand} ${selectedCar.name} na ${daysCount} dni została potwierdzona.`);
  };

  return (
    <div className="app-container">
      <Navbar isLoggedIn={isLoggedIn} onNavigate={navigate} onLogout={handleLogout} />

      <main>
        {view === 'login' && (
          <AuthPage
            view="login"
            loginEmail={loginEmail}
            loginPassword={loginPassword}
            registerEmail={registerEmail}
            registerPassword={registerPassword}
            authMessage={authMessage}
            onLogin={handleLogin}
            onRegister={handleRegister}
            onFieldChange={handleFieldChange}
            onNavigate={navigate}
          />
        )}

        {view === 'register' && (
          <AuthPage
            view="register"
            loginEmail={loginEmail}
            loginPassword={loginPassword}
            registerEmail={registerEmail}
            registerPassword={registerPassword}
            authMessage={authMessage}
            onLogin={handleLogin}
            onRegister={handleRegister}
            onFieldChange={handleFieldChange}
            onNavigate={navigate}
          />
        )}

        {view === 'home' && (
          <HomePage
            brand={brand}
            type={type}
            priceMin={priceMin}
            priceMax={priceMax}
            brandOptions={brandOptions}
            typeOptions={typeOptions}
            onBrandChange={setBrand}
            onTypeChange={setType}
            onPriceMinChange={setPriceMin}
            onPriceMaxChange={setPriceMax}
            filteredCars={filteredCars}
            onSelectCar={handleSelectCar}
          />
        )}

        {(view === 'details' || view === 'booking') && selectedCar && (
          <CarDetailPage
            view={view}
            selectedCar={selectedCar}
            dateFrom={dateFrom}
            dateTo={dateTo}
            daysCount={daysCount}
            totalPrice={totalPrice}
            availability={availability}
            reservationMessage={reservationMessage}
            onDateFromChange={setDateFrom}
            onDateToChange={setDateTo}
            onCheckAvailability={handleCheckAvailability}
            onReserve={handleReserve}
            onConfirmBooking={handleConfirmBooking}
            onBack={handleBack}
          />
        )}

        {view === 'admin' && (
          <AdminPanel
            adminSection={adminSection}
            adminCarsList={adminCarsList}
            adminReservationsList={adminReservationsList}
            adminUsersList={adminUsersList}
            adminCarForm={adminCarForm}
            adminEditMode={adminEditMode}
            onSectionChange={handleAdminSection}
            onEditCar={handleEditCar}
            onDeleteCar={handleDeleteCar}
            onSaveCar={handleSaveCar}
            onCancelEdit={handleCancelEdit}
            onFormChange={handleAdminFormChange}
          />
        )}

        {view === 'profile' && (
          <ProfilePage
            userReservationsList={userReservationsList}
            currentUserEmail={currentUserEmail}
            onBack={handleBack}
          />
        )}
      </main>
    </div>
  );
}

export default App;
