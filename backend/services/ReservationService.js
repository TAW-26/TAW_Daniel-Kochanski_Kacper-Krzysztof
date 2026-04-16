import { Reservation } from "../models/models.js";

export class ReservationService {
  constructor(carService) {
    this.reservations = [];
    this.nextId = 1;
    this.carService = carService;
  }

  checkAvailability(carId, startDate, endDate) {
    return !this.reservations.some(r => {
      if (r.carId !== carId) return false;

      return !(endDate < r.startDate || startDate > r.endDate);
    });
  }

  reserveCar(userId, carId, startDate, endDate) {
    const car = this.carService.getCar(carId);
    if (!car) return null;

    const isAvailable = this.checkAvailability(carId, startDate, endDate);
    if (!isAvailable) return null;

    const reservation = new Reservation(
      this.nextId++,
      userId,
      carId,
      startDate,
      endDate
    );

    this.reservations.push(reservation);
    return reservation;
  }

  getUserReservations(userId) {
    return this.reservations.filter(r => r.userId === userId);
  }

  // dla administratora
  getAllReservations() {
    return this.reservations;
  }
}