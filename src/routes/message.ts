import express from 'express';
import MessageController from '../controllers/messageController';

const messageRouter = express.Router();
const messageController = new MessageController();

// Define routes for message management

export default messageRouter;
