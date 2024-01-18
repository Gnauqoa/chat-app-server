import { Request, Response } from 'express';
import UserService from '../services/userService';

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  // Implement controller methods for user management
}

export default UserController;
