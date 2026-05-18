import { jest } from '@jest/globals';
import { AuthService } from '../services/AuthService.js';
import { UserModel } from '../models/models.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Usunięto jest.mock

describe('AuthService', () => {
  let authService;

  beforeEach(() => {
    authService = new AuthService();
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should hash password and create a new user', async () => {
      const mockEmail = 'test@example.com';
      const mockPassword = 'password123';
      const mockHashedPassword = 'hashedPassword123';
      const mockUser = { _id: '1', email: mockEmail, role: 'user' };

      const hashSpy = jest.spyOn(bcrypt, 'hash').mockResolvedValue(mockHashedPassword);
      const createSpy = jest.spyOn(UserModel, 'create').mockResolvedValue(mockUser);

      const result = await authService.register(mockEmail, mockPassword);

      expect(hashSpy).toHaveBeenCalledWith(mockPassword, 10);
      expect(createSpy).toHaveBeenCalledWith({
        email: mockEmail,
        password: mockHashedPassword,
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('login', () => {

    it('should return user and token if login is successful', async () => {
      const mockUser = { _id: '1', email: 'test@example.com', password: 'hashedPassword', role: 'user' };
      const mockToken = 'mockJwtToken';

      jest.spyOn(UserModel, 'findOne').mockResolvedValue(mockUser);
      const compareSpy = jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      const signSpy = jest.spyOn(jwt, 'sign').mockReturnValue(mockToken);

      const result = await authService.login('test@example.com', 'correctpass');

      expect(compareSpy).toHaveBeenCalledWith('correctpass', 'hashedPassword');
      expect(signSpy).toHaveBeenCalledWith(
        { id: mockUser._id, email: mockUser.email, role: mockUser.role },
        'super_secret_key_123',
        { expiresIn: '1h' }
      );
      expect(result).toEqual({ user: mockUser, token: mockToken });
    });
  });
});
