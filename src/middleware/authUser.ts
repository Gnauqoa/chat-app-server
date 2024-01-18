import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET } from "../config/jwt";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(token, JWT_ACCESS_SECRET, (err: any, user: any) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Forbidden: Invalid access token" });
    }
    res.locals.user = user;
    next();
  });
};

export default authenticateToken;
