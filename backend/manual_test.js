import { authService, carService, reservationService } from "./appContext.js";

// 1. Rejestracja
const user = authService.register("test@test.com");
console.log("User:", user);

// 2. Dodanie auta
const car = carService.addCar("BMW", "X5");
console.log("Car:", car);

// 3. Sprawdzenie dostępności
const isAvailable = reservationService.checkAvailability(
  car.id,
  new Date("2026-01-01"),
  new Date("2026-01-05")
);
console.log("Available:", isAvailable);

// 4. Rezerwacja
const reservation = reservationService.reserveCar(
  user.id,
  car.id,
  new Date("2026-01-01"),
  new Date("2026-01-05")
);
console.log("Reservation:", reservation);

// 5. Konflikt (powinno być null)
const second = reservationService.reserveCar(
  user.id,
  car.id,
  new Date("2026-01-02"),
  new Date("2026-01-04")
);
console.log("Second reservation (should fail):", second);