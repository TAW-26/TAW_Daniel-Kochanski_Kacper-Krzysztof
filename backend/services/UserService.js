import { UserModel } from "../models/models.js";

export class UserService {
  async getAllUsers() {
    return await UserModel.find();
  }

  async deleteUser(userId) {
    const res = await UserModel.findByIdAndDelete(userId);
    return !!res;
  }
}