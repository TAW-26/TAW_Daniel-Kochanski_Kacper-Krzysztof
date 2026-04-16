import { Car } from "../models/models.js";

export class CarService {
  constructor() {
    this.cars = [];
    this.nextId = 1;
  }

  addCar(brand, model) {
    const car = new Car(this.nextId++, brand, model);
    this.cars.push(car);
    return car;
  }

  editCar(id, brand, model) {
    const car = this.getCar(id);
    if (!car) return null;

    car.brand = brand;
    car.model = model;
    return car;
  }

  deleteCar(id) {
    const index = this.cars.findIndex(c => c.id === id);
    if (index === -1) return false;

    this.cars.splice(index, 1);
    return true;
  }

  getCar(id) {
    return this.cars.find(c => c.id === id) || null;
  }

  getAllCars() {
    return this.cars;
  }

  filterCars({ brand }) {
    let result = [...this.cars];

    if (brand) {
      result = result.filter(c => c.brand === brand);
    }

    return result;
  }
}