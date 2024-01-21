import express from "express";
import RoomController from "../controllers/roomController";
import authenticateToken from "../middleware/authUser";
import formatPagination from "../middleware/formatPagination";
import authRoom from "../middleware/authRoom";

const roomRouter = express.Router();
const roomController = new RoomController();

roomRouter.post(
  "/:roomId/messages",
  authenticateToken,
  authRoom,
  roomController.createMessage
);
roomRouter.get(
  "/:roomId/messages",
  [authenticateToken, authRoom, formatPagination],
  roomController.getMessages
);
export default roomRouter;
