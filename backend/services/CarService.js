import { CarModel } from "../models/models.js";

export class CarService {
  async addCar(carData) {
    return await CarModel.create(carData);
  }

  async getAllCars() {
    return await CarModel.find();
  }

  async getCar(id) {
    return await CarModel.findById(id);
  }

  async filterCars({ brand }) {
    const filter = {};
    if (brand && brand !== 'Wszystkie') filter.brand = brand;
    return await CarModel.find(filter);
  }

  async deleteCar(id) {
    const res = await CarModel.findByIdAndDelete(id);
    return !!res;
  }

  async editCar(id, carData) {
    return await CarModel.findByIdAndUpdate(
      id,
      carData,
      { new: true }
    );
  }
}