import { NextFunction, Request, Response } from "express";
import { getMessages, getRooms, update } from "../services/roomService";
import { createMessage } from "../services/messageService";

import { io } from "../..";

class RoomController {
  async update(req: Request, res: Response, next: NextFunction) {
    const roomId = Number(req.params.roomId);
    const { name } = req.body;

    try {
      const updatedRoom = await update({ roomId, name });
      return res.status(200).json({ data: updatedRoom });
    } catch (error) {
      next(error);
    }
  }

  async createMessage(req: Request, res: Response, next: NextFunction) {
    const roomId = Number(req.params.roomId);
    const { userId } = res.locals.user;
    const { message } = req.body;

    try {
      const newMessage = await createMessage({ message, userId, roomId });
      io.to(`room-${roomId}`).emit("newMessage", { data: newMessage });
      return res.status(201).json({ data: newMessage });
    } catch (error) {
      next(error);
    }
  }
  async getMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const roomId = Number(req.params.roomId);

      return res.status(200).json({
        data: await getMessages({
          roomId,
          skip: parseInt(req.query.offset as string),
          take: parseInt(req.query.limit as string),
          page: parseInt(req.query.page as string),
        }),
      });
    } catch (err) {
      next(err);
    }
  }
  async getRooms(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query.query as string;
      const userId = res.locals.user.userId;
      const skip = parseInt(req.query.offset as string);
      const take = parseInt(req.query.limit as string);
      const page = parseInt(req.query.page as string);

      return res.status(200).json({
        data: await getRooms({
          query,
          userId,
          skip,
          take,
          page,
        }),
      });
    } catch (err) {
      next(err);
    }
  }
  // Implement controller methods for room management
}

export default RoomController;
