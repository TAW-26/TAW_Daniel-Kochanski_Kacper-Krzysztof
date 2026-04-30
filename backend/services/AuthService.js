import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/models.js";

const JWT_SECRET = "super_secret_key_123";

export class AuthService {

  async register(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      email,
      password: hashedPassword
    });

    return user;
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { user, token };
  }
}