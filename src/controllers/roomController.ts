import { Request, Response } from 'express';
import RoomService from '../services/roomService';

class RoomController {
  private roomService: RoomService;

  constructor() {
    this.roomService = new RoomService();
  }

  // Implement controller methods for room management
}

export default RoomController;
