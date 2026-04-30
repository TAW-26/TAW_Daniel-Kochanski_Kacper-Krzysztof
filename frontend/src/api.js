const API_URL = 'http://localhost:5000';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const api = {
  // CARS
  async getCars() {
    const res = await fetch(`${API_URL}/cars`);
    if (!res.ok) throw new Error('Failed to fetch cars');
    return res.json();
  },

  async getCarsByBrand(brand) {
    const res = await fetch(`${API_URL}/cars/filter?brand=${brand}`);
    if (!res.ok) throw new Error('Failed to filter cars');
    return res.json();
  },

  async addCar(carData) {
    const res = await fetch(`${API_URL}/cars`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(carData),
    });
    if (!res.ok) throw new Error('Failed to add car');
    return res.json();
  },

  async updateCar(id, carData) {
    const res = await fetch(`${API_URL}/cars/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(carData),
    });
    if (!res.ok) throw new Error('Failed to update car');
    return res.json();
  },

  async deleteCar(id) {
    const res = await fetch(`${API_URL}/cars/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete car');
    return true;
  },

  // AUTH
  async login(email, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Login failed');
    }
    const data = await res.json();
    if (data.token) localStorage.setItem('token', data.token);
    return data;
  },

  async register(email, password) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Registration failed');
    }
    return res.json();
  },

  // RESERVATIONS
  async checkAvailability(carId, startDate, endDate) {
    const res = await fetch(`${API_URL}/reservations/check?carId=${carId}&startDate=${startDate}&endDate=${endDate}`);
    if (!res.ok) throw new Error('Failed to check availability');
    return res.json();
  },

  async getReservations() {
    const res = await fetch(`${API_URL}/reservations`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch reservations');
    return res.json();
  },

  async getUserReservations(userId) {
    const res = await fetch(`${API_URL}/reservations/user/${userId}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch user reservations');
    return res.json();
  },

  async reserveCar(carId, startDate, endDate) {
    const res = await fetch(`${API_URL}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ carId, startDate, endDate }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Reservation failed');
    }
    return res.json();
  },

  // USERS
  async getUsers() {
    const res = await fetch(`${API_URL}/users`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  },

  async deleteUser(id) {
    const res = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete user');
    return true;
  }
};
