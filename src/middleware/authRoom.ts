import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma";

export type RoomPrivateRequest = Request<{ roomId: number }>;

const authRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    const roomId = Number(req.params.roomId);
    const roomUser = await prisma.roomUser.findFirst({
      where: {
        userId: user.userId,
        roomId: roomId,
      },
    });

    if (!roomUser) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default authRoom;
