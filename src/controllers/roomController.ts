import { Request, Response } from "express";
import RoomService from "../services/roomService";
import { createMessage } from "../services/messageService";

class RoomController {
  private roomService: RoomService;

  constructor() {
    this.roomService = new RoomService();
  }
  async createMessage(req: Request, res: Response) {
    const roomId = Number(req.params.id);
    const { userId } = res.locals.user;
    const { message } = req.body;

    console.log({ roomId, userId, message });
    try {
      const newMessage = await createMessage({ message, userId, roomId });
      return res.status(201).json(newMessage);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  // Implement controller methods for room management
}

export default RoomController;
