import { connectDB } from "./db.js";
import { CarModel } from "./models/models.js";

await connectDB();

await CarModel.insertMany([
  { brand: "BMW", model: "X5" },
  { brand: "Audi", model: "A4" }
]);

console.log("DB seeded");
process.exit();