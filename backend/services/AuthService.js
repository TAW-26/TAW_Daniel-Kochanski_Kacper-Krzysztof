import { User } from "../models/models.js";

export class AuthService {
  constructor() {
    this.users = [];
    this.nextId = 1;
  }

  register(email) {
    const user = new User(this.nextId++, email);
    this.users.push(user);
    return user;
  }

  login(email) {
    return this.users.find(u => u.email === email) || null;
  }
}