import express from "express";
import RoomController from "../controllers/roomController";
import authenticateToken from "../middleware/authUser";

const roomRouter = express.Router();
const roomController = new RoomController();

roomRouter.post(
  "/:id/message",
  [authenticateToken],
  roomController.createMessage
);
roomRouter.get("/:id/messages", [authenticateToken], roomController.getMessages);
export default roomRouter;
