import { jest } from '@jest/globals';
import { ReservationService } from '../services/ReservationService.js';
import { ReservationModel } from '../models/models.js';

describe('ReservationService', () => {
  let reservationService;

  beforeEach(() => {
    reservationService = new ReservationService();
    jest.clearAllMocks();
  });

  describe('checkAvailability', () => {
    it('should return true if there is no conflict', async () => {
      const findOneSpy = jest.spyOn(ReservationModel, 'findOne').mockResolvedValue(null);

      const startDate = new Date('2026-01-01');
      const endDate = new Date('2026-01-05');
      const result = await reservationService.checkAvailability('car1', startDate, endDate);

      expect(findOneSpy).toHaveBeenCalledWith({
        carId: 'car1',
        $or: [
          {
            startDate: { $lte: endDate },
            endDate: { $gte: startDate }
          }
        ]
      });
      expect(result).toBe(true);
    });

  });

  describe('reserveCar', () => {
    it('should create and return a reservation if car is available', async () => {
      jest.spyOn(reservationService, 'checkAvailability').mockResolvedValue(true);
      
      const startDate = new Date('2026-01-01');
      const endDate = new Date('2026-01-05');
      const mockReservation = { userId: 'user1', carId: 'car1', startDate, endDate };
      const createdReservation = { _id: 'res1', ...mockReservation };

      const createSpy = jest.spyOn(ReservationModel, 'create').mockResolvedValue(createdReservation);

      const result = await reservationService.reserveCar('user1', 'car1', startDate, endDate);

      expect(createSpy).toHaveBeenCalledWith(mockReservation);
      expect(result).toEqual(createdReservation);
    });
  });
});
