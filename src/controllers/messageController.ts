import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma";
import { deleteMessage } from "../services/messageService";

class MessageController {
  async deleteMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await deleteMessage({ id: Number(id) });
      return res.status(200).json({ message: "Message deleted" });
    } catch (error) {
      next(error);
    }
  }
}

export default MessageController;
