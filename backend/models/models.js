import mongoose from "mongoose";

// USER
export const UserModel = mongoose.model(
  "User",
  new mongoose.Schema({
    email: String
  })
);

// CAR
export const CarModel = mongoose.model(
  "Car",
  new mongoose.Schema({
    brand: String,
    model: String
  })
);

// RESERVATION
export const ReservationModel = mongoose.model(
  "Reservation",
  new mongoose.Schema({
    userId: String,
    carId: String,
    startDate: Date,
    endDate: Date
  })
);