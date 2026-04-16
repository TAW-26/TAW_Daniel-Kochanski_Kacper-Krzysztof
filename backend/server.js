import express from "express";
import { authService, carService, reservationService, userService } from "./appContext.js";

const app = express();
app.use(express.json());

const PORT = 3000;

// GET wszystkie auta
app.get("/cars", (req, res) => {
  res.json(carService.getAllCars());
});

// GET filtr
app.get("/cars/filter", (req, res) => {
  const { brand } = req.query;
  const cars = carService.filterCars({ brand });
  res.json(cars);
});

// GET po ID
app.get("/cars/:id", (req, res) => {
  const car = carService.getCar(Number(req.params.id));
  if (!car) return res.status(404).json({ error: "Car not found" });

  res.json(car);
});

// POST dodaj auto
app.post("/cars", (req, res) => {
  const { brand, model } = req.body;

  if (!brand || !model) {
    return res.status(400).json({ error: "Missing data" });
  }

  const car = carService.addCar(brand, model);
  res.status(201).json(car);
});

// PUT edytuj auto
app.put("/cars/:id", (req, res) => {
  const { brand, model } = req.body;

  const car = carService.editCar(Number(req.params.id), brand, model);
  if (!car) return res.status(404).json({ error: "Car not found" });

  res.json(car);
});

// DELETE auto
app.delete("/cars/:id", (req, res) => {
  const success = carService.deleteCar(Number(req.params.id));
  if (!success) return res.status(404).json({ error: "Car not found" });

  res.status(204).send();
});

// GET wszyscy użytkownicy
app.get("/users", (req, res) => {
  res.json(userService.getAllUsers());
});

// DELETE user
app.delete("/users/:id", (req, res) => {
  const success = userService.deleteUser(Number(req.params.id));
  if (!success) return res.status(404).json({ error: "User not found" });

  res.status(204).send();
});

// POST register
app.post("/auth/register", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email required" });
  }

  const user = authService.register(email);
  res.status(201).json(user);
});

// POST login
app.post("/auth/login", (req, res) => {
  const { email } = req.body;

  const user = authService.login(email);
  if (!user) return res.status(404).json({ error: "User not found" });

  res.json(user);
});

// GET wszystkie (admin)
app.get("/reservations", (req, res) => {
  res.json(reservationService.getAllReservations());
});

// GET rezerwacje użytkownika
app.get("/reservations/user/:userId", (req, res) => {
  const reservations = reservationService.getUserReservations(Number(req.params.userId));
  res.json(reservations);
});

// POST rezerwacja
app.post("/reservations", (req, res) => {
  const { userId, carId, startDate, endDate } = req.body;

  if (!userId || !carId || !startDate || !endDate) {
    return res.status(400).json({ error: "Missing data" });
  }

  const reservation = reservationService.reserveCar(
    userId,
    carId,
    new Date(startDate),
    new Date(endDate)
  );

  if (!reservation) {
    return res.status(409).json({ error: "Car not available" });
  }

  res.status(201).json(reservation);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});