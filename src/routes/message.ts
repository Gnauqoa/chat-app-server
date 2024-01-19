import express from "express";

import authenticateToken from "../middleware/authUser";
import MessageController from "../controllers/messageController";

const messageController = new MessageController();

const messageRouter = express.Router();
messageRouter.delete(
  "/:id",
  [authenticateToken],
  messageController.deleteMessage
);
export default messageRouter;
