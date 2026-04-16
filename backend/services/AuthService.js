import { UserModel } from "../models/models.js";

export class AuthService {
  async register(email) {
    return await UserModel.create({ email });
  }

  async login(email) {
    return await UserModel.findOne({ email });
  }
}