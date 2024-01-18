import { Request, Response } from "express";
import UserService from "../services/userService";
import { errorType } from "../utils/auth";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async signIn(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      // Implement authentication logic (you may use a library like bcrypt for password hashing)
      const token = await this.userService.signIn(username, password);

      if (token) {
        return res.status(200).json(token);
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      const err = error as errorType;
      return res.status(err.status).json({ message: err.message });
    }
  }

  // Other controller methods for user management
}

export default UserController;
