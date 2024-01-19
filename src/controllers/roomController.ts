import { NextFunction, Request, Response } from "express";
import { getMessages } from "../services/roomService";
import { createMessage } from "../services/messageService";

class RoomController {
  async createMessage(req: Request, res: Response, next: NextFunction) {
    const roomId = Number(req.params.id);
    const { userId } = res.locals.user;
    const { message } = req.body;

    try {
      const newMessage = await createMessage({ message, userId, roomId });
      return res.status(201).json(newMessage);
    } catch (error) {
      next(error);
    }
  }
  async getMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const roomId = Number(req.params.id);

      return res
        .status(200)
        .json({ data: { items: await getMessages({ roomId }) } });
    } catch (err) {
      next(err);
    }
  }
  // Implement controller methods for room management
}

export default RoomController;
