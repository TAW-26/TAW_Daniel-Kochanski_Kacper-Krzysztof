import { CarModel } from "../models/models.js";

export class CarService {
  async addCar(brand, model) {
    return await CarModel.create({ brand, model });
  }

  async getAllCars() {
    return await CarModel.find();
  }

  async getCar(id) {
    return await CarModel.findById(id);
  }

  async deleteCar(id) {
    const res = await CarModel.findByIdAndDelete(id);
    return !!res;
  }

  async editCar(id, brand, model) {
    return await CarModel.findByIdAndUpdate(
      id,
      { brand, model },
      { new: true }
    );
  }
}