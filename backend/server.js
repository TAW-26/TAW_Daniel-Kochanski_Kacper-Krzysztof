import express from "express";
import { connectDB } from "./db.js";

// 🔥 połączenie z DB
connectDB();

// 🔥 teraz importujemy SERWISY DB (NIE appContext)
import { AuthService } from "./services/AuthService.js";
import { CarService } from "./services/CarService.js";
import { ReservationService } from "./services/ReservationService.js";
import { UserService } from "./services/UserService.js";

// instancje serwisów
const authService = new AuthService();
const carService = new CarService();
const reservationService = new ReservationService();
const userService = new UserService(authService);

const app = express();
app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

/* =========================
   🚗 CARS
========================= */

// GET wszystkie auta
app.get("/cars", async (req, res) => {
  const cars = await carService.getAllCars();
  res.json(cars);
});

// GET filtr
app.get("/cars/filter", async (req, res) => {
  const { brand } = req.query;
  const cars = await carService.filterCars({ brand });
  res.json(cars);
});

// GET po ID
app.get("/cars/:id", async (req, res) => {
  const car = await carService.getCar(req.params.id);

  if (!car) return res.status(404).json({ error: "Car not found" });

  res.json(car);
});

// POST dodaj auto
app.post("/cars", async (req, res) => {
  const { brand, model } = req.body;

  if (!brand || !model) {
    return res.status(400).json({ error: "Missing data" });
  }

  const car = await carService.addCar(brand, model);
  res.status(201).json(car);
});

// PUT edytuj auto
app.put("/cars/:id", async (req, res) => {
  const { brand, model } = req.body;

  const car = await carService.editCar(req.params.id, brand, model);

  if (!car) return res.status(404).json({ error: "Car not found" });

  res.json(car);
});

// DELETE auto
app.delete("/cars/:id", async (req, res) => {
  const success = await carService.deleteCar(req.params.id);

  if (!success) return res.status(404).json({ error: "Car not found" });

  res.status(204).send();
});

/* =========================
   👤 USERS
========================= */

app.get("/users", async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
});

app.delete("/users/:id", async (req, res) => {
  const success = await userService.deleteUser(req.params.id);

  if (!success) return res.status(404).json({ error: "User not found" });

  res.status(204).send();
});

/* =========================
   🔐 AUTH
========================= */

app.post("/auth/register", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email required" });
  }

  const user = await authService.register(email);
  res.status(201).json(user);
});

app.post("/auth/login", async (req, res) => {
  const { email } = req.body;

  const user = await authService.login(email);

  if (!user) return res.status(404).json({ error: "User not found" });

  res.json(user);
});

/* =========================
   📅 RESERVATIONS
========================= */

app.get("/reservations", async (req, res) => {
  const reservations = await reservationService.getAllReservations();
  res.json(reservations);
});

app.get("/reservations/user/:userId", async (req, res) => {
  const reservations = await reservationService.getUserReservations(req.params.userId);
  res.json(reservations);
});

app.post("/reservations", async (req, res) => {
  const { userId, carId, startDate, endDate } = req.body;

  if (!userId || !carId || !startDate || !endDate) {
    return res.status(400).json({ error: "Missing data" });
  }

  const reservation = await reservationService.reserveCar(
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

/* =========================
   ❌ ERROR HANDLER
========================= */

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});