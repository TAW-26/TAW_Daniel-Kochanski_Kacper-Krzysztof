export const cars = [
  {
    id: 1,
    brand: 'Toyota',
    type: 'Sedan',
    name: 'Corolla',
    price: 120,
    seats: 5,
    fuel: 'Hybrid',
    description: 'Praktyczny i ekonomiczny sedan idealny na miasto.',
    image: 'https://via.placeholder.com/500x320?text=Toyota+Corolla',
  },
  {
    id: 2,
    brand: 'BMW',
    type: 'SUV',
    name: 'X3',
    price: 240,
    seats: 5,
    fuel: 'Diesel',
    description: 'Komfortowy SUV z nowoczesnym wyposażeniem.',
    image: 'https://via.placeholder.com/500x320?text=BMW+X3',
  },
  {
    id: 3,
    brand: 'Ford',
    type: 'Hatchback',
    name: 'Focus',
    price: 110,
    seats: 5,
    fuel: 'Petrol',
    description: 'Dynamiczny kompaktowy samochód dla codziennych tras.',
    image: 'https://via.placeholder.com/500x320?text=Ford+Focus',
  },
  {
    id: 4,
    brand: 'Toyota',
    type: 'SUV',
    name: 'RAV4',
    price: 210,
    seats: 5,
    fuel: 'Hybrid',
    description: 'Wszechstronny SUV z wygodnym wnętrzem.',
    image: 'https://via.placeholder.com/500x320?text=Toyota+RAV4',
  },
];

export const brandOptions = ['Wszystkie', 'Toyota', 'BMW', 'Ford'];
export const typeOptions = ['Wszystkie', 'Sedan', 'SUV', 'Hatchback'];

export const userReservations = [
  {
    id: 1,
    userEmail: 'anna@example.com',
    carId: 1,
    carBrand: 'Toyota',
    carName: 'Corolla',
    dateFrom: '2024-05-01',
    dateTo: '2024-05-05',
    status: 'Potwierdzona',
  },
  {
    id: 2,
    userEmail: 'marek@example.com',
    carId: 2,
    carBrand: 'BMW',
    carName: 'X3',
    dateFrom: '2024-05-10',
    dateTo: '2024-05-15',
    status: 'Oczekująca',
  },
  {
    id: 3,
    userEmail: 'anna@example.com',
    carId: 4,
    carBrand: 'Toyota',
    carName: 'RAV4',
    dateFrom: '2024-04-15',
    dateTo: '2024-04-18',
    status: 'Zakończona',
  },
];

export const adminReservations = [
  {
    id: 1,
    user: 'anna@example.com',
    car: 'Toyota Corolla',
    dates: '2024-05-01 — 2024-05-05',
    status: 'Potwierdzona',
  },
  {
    id: 2,
    user: 'marek@example.com',
    car: 'BMW X3',
    dates: '2024-05-10 — 2024-05-15',
    status: 'Oczekująca',
  },
];

export const adminUsers = [
  { id: 1, email: 'anna@example.com', role: 'Użytkownik' },
  { id: 2, email: 'marek@example.com', role: 'Użytkownik' },
  { id: 3, email: 'admin@example.com', role: 'Admin' },
];
