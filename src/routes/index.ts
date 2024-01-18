import express from "express";
import messageRouter from "./message";
import roomRouter from "./room";
import userRouter from "./user";

const router = express.Router();

router.use("/message", messageRouter);
router.use("/room", roomRouter);
router.use("/user", userRouter);

export default router;
