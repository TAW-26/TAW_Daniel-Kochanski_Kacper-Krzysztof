import bcrypt from "bcrypt";
import { connectDB } from "./db.js";
import { CarModel, UserModel, ReservationModel } from "./models/models.js";

await connectDB();

// Clear existing data
await CarModel.deleteMany({});
await UserModel.deleteMany({});
await ReservationModel.deleteMany({});

const hashedAdminPassword = await bcrypt.hash("admin123", 10);
const hashedUserPassword = await bcrypt.hash("user123", 10);

await UserModel.insertMany([
  {
    email: "admin@test.com",
    password: hashedAdminPassword,
    role: "admin"
  },
  {
    email: "user@test.com",
    password: hashedUserPassword,
    role: "user"
  }
]);

await CarModel.insertMany([
  {
    brand: 'Toyota',
    type: 'Sedan',
    name: 'Corolla',
    price: 120,
    seats: 5,
    fuel: 'Hybrid',
    description: 'Praktyczny i ekonomiczny sedan idealny na miasto.',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=500&auto=format&fit=crop'
  },
  {
    brand: 'BMW',
    type: 'SUV',
    name: 'X3',
    price: 240,
    seats: 5,
    fuel: 'Diesel',
    description: 'Komfortowy SUV z nowoczesnym wyposażeniem.',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=500&auto=format&fit=crop'
  },
  {
    brand: 'Ford',
    type: 'Hatchback',
    name: 'Focus',
    price: 110,
    seats: 5,
    fuel: 'Petrol',
    description: 'Dynamiczny kompaktowy samochód dla codziennych tras.',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=500&auto=format&fit=crop'
  }
]);

console.log("DB cleared and seeded with admin and users");
process.exit();