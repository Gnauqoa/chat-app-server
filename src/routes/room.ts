import express from 'express';
import RoomController from '../controllers/roomController';

const roomRouter = express.Router();
const roomController = new RoomController();

// Define routes for room management

export default roomRouter;
