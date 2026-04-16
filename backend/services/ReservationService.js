import { ReservationModel } from "../models/models.js";

export class ReservationService {
  async checkAvailability(carId, startDate, endDate) {
    const conflict = await ReservationModel.findOne({
      carId,
      $or: [
        {
          startDate: { $lte: endDate },
          endDate: { $gte: startDate }
        }
      ]
    });

    return !conflict;
  }

  async reserveCar(userId, carId, startDate, endDate) {
    const available = await this.checkAvailability(carId, startDate, endDate);
    if (!available) return null;

    return await ReservationModel.create({
      userId,
      carId,
      startDate,
      endDate
    });
  }

  async getAllReservations() {
    return await ReservationModel.find();
  }

  async getUserReservations(userId) {
    return await ReservationModel.find({ userId });
  }
}