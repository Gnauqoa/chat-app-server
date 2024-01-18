import express from "express";
import UserController from "../controllers/userController";

const userRouter = express.Router();
const userController = new UserController();

// Define routes for user management

export default userRouter;
