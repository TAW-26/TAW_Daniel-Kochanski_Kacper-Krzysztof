export class UserService {
  constructor(authService) {
    this.authService = authService;
  }

  getAllUsers() {
    return this.authService.users;
  }

  deleteUser(userId) {
    const index = this.authService.users.findIndex(u => u.id === userId);
    if (index === -1) return false;

    this.authService.users.splice(index, 1);
    return true;
  }
}