import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import AuthPage from './components/AuthPage';
import CarDetailPage from './components/CarDetailPage';
import AdminPanel from './components/AdminPanel';
import ProfilePage from './components/ProfilePage';
import {
  brandOptions,
  typeOptions,
} from './data';
import { api } from './api';

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userReservationsList, setUserReservationsList] = useState([]);
  const [adminCarsList, setAdminCarsList] = useState([]);
  const [adminReservationsList, setAdminReservationsList] = useState([]);
  const [adminUsersList, setAdminUsersList] = useState([]);
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
  const [currentUserId, setCurrentUserId] = useState('');
  const [currentUserRole, setCurrentUserRole] = useState('user');
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
      if (!isLoggedIn || currentUserRole !== 'admin') {
        window.location.hash = '';
        return { view: 'home', carId: null };
      }
      return { view: 'admin', carId: null };
    }
    let match = hash.match(/^details-([a-zA-Z0-9]+)$/);
    if (match) {
      return { view: 'details', carId: match[1] };
    }
    match = hash.match(/^booking-([a-zA-Z0-9]+)$/);
    if (match) {
      return { view: 'booking', carId: match[1] };
    }
    return { view: 'home', carId: null };
  };

  const fetchCars = useCallback(async (brandFilter = 'Wszystkie') => {
    setIsLoading(true);
    setError(null);
    try {
      const data = brandFilter === 'Wszystkie' 
        ? await api.getCars() 
        : await api.getCarsByBrand(brandFilter);
      setAdminCarsList(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

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
      
      // Fetch user reservations
      const fetchUserReservations = async () => {
        setIsLoading(true);
        try {
          const data = await api.getUserReservations(currentUserId); 
          setUserReservationsList(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchUserReservations();
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
      const car = adminCarsList.find((item) => (item.id === parsed.carId || item._id === parsed.carId));
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
  }, [isLoggedIn, adminCarsList, currentUserId]);

  useEffect(() => {
    fetchCars(brand);
  }, [fetchCars, brand]);

  useEffect(() => {
    setCarFromHash();
    const handleHashChange = () => setCarFromHash();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [setCarFromHash]);

  const handleSelectCar = (car) => {
    window.location.hash = `details-${car._id || car.id}`;
  };

  const handleBack = () => {
    if (view === 'booking') {
      window.location.hash = `details-${selectedCar?._id || selectedCar?.id || ''}`;
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

  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      setAuthMessage('Wprowadź email i hasło.');
      return;
    }
    setIsLoading(true);
    setAuthMessage('');
    try {
      const data = await api.login(loginEmail, loginPassword);
      setIsLoggedIn(true);
      setCurrentUserEmail(loginEmail);
      setCurrentUserId(data.user._id || data.user.id);
      setCurrentUserRole(data.user.role || 'user');
      setAuthMessage('Zalogowano pomyślnie!');
      setLoginEmail('');
      setLoginPassword('');
      setTimeout(() => {
        window.location.hash = '';
      }, 1000);
    } catch (err) {
      setAuthMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!registerEmail || !registerPassword) {
      setAuthMessage('Wprowadź email i hasło.');
      return;
    }
    setIsLoading(true);
    setAuthMessage('');
    try {
      await api.register(registerEmail, registerPassword);
      setAuthMessage('Konto utworzone. Możesz się teraz zalogować.');
      setRegisterEmail('');
      setRegisterPassword('');
      setTimeout(() => {
        window.location.hash = 'login';
      }, 1500);
    } catch (err) {
      setAuthMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUserEmail('');
    setCurrentUserId('');
    setCurrentUserRole('user');
    localStorage.removeItem('token');
    window.location.hash = '';
  };

  const handleAdminSection = async (section) => {
    setAdminSection(section);
    setIsLoading(true);
    setError(null);
    try {
      if (section === 'users') {
        const data = await api.getUsers();
        setAdminUsersList(data);
      } else if (section === 'reservations') {
        const data = await api.getReservations();
        setAdminReservationsList(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminFormChange = (field, value) => {
    setAdminCarForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleDeleteUser = async (id) => {
    setIsLoading(true);
    try {
      await api.deleteUser(id);
      setAdminUsersList(adminUsersList.filter((u) => (u._id || u.id) !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditCar = (car) => {
    setAdminEditMode(true);
    setAdminCarForm({
      id: car._id || car.id,
      brand: car.brand,
      type: car.type,
      name: car.name,
      price: car.price,
      seats: car.seats,
      fuel: car.fuel,
      description: car.description,
    });
  };

  const handleDeleteCar = async (id) => {
    setIsLoading(true);
    try {
      await api.deleteCar(id);
      setAdminCarsList(adminCarsList.filter((car) => (car._id || car.id) !== id));
      if (selectedCar?._id === id || selectedCar?.id === id) {
        setSelectedCar(null);
        setView('home');
        window.location.hash = '';
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveCar = async () => {
    const carData = {
      brand: adminCarForm.brand,
      type: adminCarForm.type,
      name: adminCarForm.name,
      price: Number(adminCarForm.price) || 0,
      seats: Number(adminCarForm.seats) || 4,
      fuel: adminCarForm.fuel,
      description: adminCarForm.description,
      image: adminCarForm.image || `https://via.placeholder.com/500x320?text=${adminCarForm.brand}+${adminCarForm.name}`,
    };

    setIsLoading(true);
    try {
      if (adminEditMode) {
        await api.updateCar(adminCarForm.id, carData);
      } else {
        await api.addCar(carData);
      }
      await fetchCars();
      handleCancelEdit();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
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

  const handleCheckAvailability = async () => {
    if (!dateFrom || !dateTo) {
      setAvailability('Wprowadź zakres dat, aby sprawdzić dostępność.');
      return;
    }
    if (daysCount <= 0) {
      setAvailability('Wybierz poprawny zakres dat (data zakończenia musi być późniejsza niż data rozpoczęcia).');
      return;
    }
    
    setIsLoading(true);
    setAvailability('');
    try {
      const { available } = await api.checkAvailability(selectedCar._id || selectedCar.id, dateFrom, dateTo);
      if (available) {
        setAvailability('Termin dostępny! Możesz przejść do rezerwacji.');
      } else {
        setAvailability('Termin niedostępny. Wybierz inną datę.');
      }
    } catch (err) {
      setAvailability(err.message);
    } finally {
      setIsLoading(false);
    }
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
    window.location.hash = `booking-${selectedCar._id || selectedCar.id}`;
  };

  const handleConfirmBooking = async () => {
    if (!selectedCar || daysCount <= 0) {
      setReservationMessage('Wprowadź poprawny zakres dat przed potwierdzeniem rezerwacji.');
      return;
    }
    setIsLoading(true);
    setReservationMessage('');
    try {
      await api.reserveCar(selectedCar._id || selectedCar.id, dateFrom, dateTo);
      setReservationMessage(`Rezerwacja ${selectedCar.brand} ${selectedCar.name} na ${daysCount} dni została potwierdzona.`);
    } catch (err) {
      setReservationMessage(err.message);
    } finally {
      setIsLoading(false);
    }
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
            isLoading={isLoading}
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
            isLoading={isLoading}
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
            isLoading={isLoading}
            error={error}
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
            isLoading={isLoading}
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
            onDeleteUser={handleDeleteUser}
            onSaveCar={handleSaveCar}
            onCancelEdit={handleCancelEdit}
            onFormChange={handleAdminFormChange}
            isLoading={isLoading}
            error={error}
          />
        )}

        {view === 'profile' && (
          <ProfilePage
            userReservationsList={userReservationsList}
            currentUserEmail={currentUserEmail}
            onBack={handleBack}
            isLoading={isLoading}
            error={error}
          />
        )}
      </main>
    </div>
  );
}

export default App;
