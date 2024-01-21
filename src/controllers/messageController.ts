import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma";
import { deleteMessage } from "../services/messageService";
import { io } from "../..";

class MessageController {
  async deleteMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const message = await deleteMessage({ id: Number(id) });
      io.to(`room-${message.roomId}`).emit("deleteMessage", { data: message });

      return res.status(200).json({ message: "Message deleted" });
    } catch (error) {
      next(error);
    }
  }
}

export default MessageController;
