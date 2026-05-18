import { jest } from '@jest/globals';
import { CarService } from '../services/CarService.js';
import { CarModel } from '../models/models.js';

describe('CarService', () => {
  let carService;

  beforeEach(() => {
    carService = new CarService();
    jest.clearAllMocks();
  });

  describe('addCar', () => {
    it('should create and return a new car', async () => {
      const mockCarData = { brand: 'BMW', model: 'X5', price: 200 };
      const mockCreatedCar = { _id: '1', ...mockCarData };

      const createSpy = jest.spyOn(CarModel, 'create').mockResolvedValue(mockCreatedCar);

      const result = await carService.addCar(mockCarData);

      expect(createSpy).toHaveBeenCalledWith(mockCarData);
      expect(result).toEqual(mockCreatedCar);
    });
  });

  describe('getAllCars', () => {
    it('should return all cars', async () => {
      const mockCars = [{ brand: 'BMW' }, { brand: 'Audi' }];
      const findSpy = jest.spyOn(CarModel, 'find').mockResolvedValue(mockCars);

      const result = await carService.getAllCars();

      expect(findSpy).toHaveBeenCalledWith();
      expect(result).toEqual(mockCars);
    });
  });


});
