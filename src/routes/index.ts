import express from "express";
import messageRouter from "./message";
import roomRouter from "./room";
import userRouter from "./user";

const router = express.Router();

router.use("/messages", messageRouter);
router.use("/rooms", roomRouter);
router.use("/users", userRouter);

export default router;
