import { NextFunction, Request, Response } from "express";
import { signIn, updateUser, userSelect } from "../services/userService";
import { errorType } from "../utils/auth";
import prisma from "../config/prisma";

class UserController {
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const { userId } = res.locals.user;
      return res
        .status(200)
        .json({ data: await updateUser({ name, id: userId }) });
    } catch (error) {
      next(error);
    }
  }
  async signIn(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;

    try {
      const token = await signIn(username, password);

      if (token) {
        return res.status(200).json({ data: token });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      next(error);
    }
  }
  async current(req: Request, res: Response, next: NextFunction) {
    try {
      if (!res.locals.user.userId)
        return res.status(401).json({ message: "Unauthorized" });
      return res.status(200).json({
        data: await prisma.user.findUnique({
          where: { id: res.locals.user.userId },
          select: userSelect,
        }),
      });
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;
