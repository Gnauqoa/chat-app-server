import express, { RequestHandler } from "express";
import UserController from "../controllers/userController";
import authenticateToken from "../middleware/authUser";

const router = express.Router();
const userController = new UserController();

// Update the type of the authenticateToken middleware

router.post("/signIn", userController.signIn);
router.get("/current", [authenticateToken], userController.current);
router.put("/current", [authenticateToken], userController.update);

export default router;
