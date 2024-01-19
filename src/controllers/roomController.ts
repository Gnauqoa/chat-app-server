import { NextFunction, Request, Response } from "express";
import RoomService from "../services/roomService";
import { createMessage } from "../services/messageService";

class RoomController {
  private roomService: RoomService;

  constructor() {
    this.roomService = new RoomService();
  }
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
  // Implement controller methods for room management
}

export default RoomController;
