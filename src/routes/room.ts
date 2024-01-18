import express from 'express';
import RoomController from '../controllers/roomController';

const router = express.Router();
const roomController = new RoomController();

// Define routes for room management

export default router;
