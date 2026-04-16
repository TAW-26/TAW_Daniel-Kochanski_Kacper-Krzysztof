import { AuthService } from "./services/AuthService.js";
import { CarService } from "./services/CarService.js";
import { ReservationService } from "./services/ReservationService.js";
import { UserService } from "./services/UserService.js";

export const authService = new AuthService();
export const carService = new CarService();
export const reservationService = new ReservationService(carService);
export const userService = new UserService(authService);