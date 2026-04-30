import mongoose from "mongoose";

// USER
export const UserModel = mongoose.model(
  "User",
  new mongoose.Schema({
    email: String,
    password: String,
    role: { type: String, default: "user" }
  })
);

// CAR
export const CarModel = mongoose.model(
  "Car",
  new mongoose.Schema({
    brand: String,
    model: String,
    type: String,
    name: String,
    price: Number,
    seats: Number,
    fuel: String,
    description: String,
    image: String
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