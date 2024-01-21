import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma";

const authMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;
    const messageId = Number(req.params.messageId);
    const message = await prisma.message.findFirst({
      where: {
        id: messageId,
      },
    });
    if (message?.userId !== user.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default authMessage;
