import express, { RequestHandler } from "express";
import UserController from "../controllers/userController";
import authenticateToken from "../middleware/authUser";
import formatPagination from "../middleware/formatPagination";

const router = express.Router();
const userController = new UserController();

// Update the type of the authenticateToken middleware

router.post("/signIn", userController.signIn);
router.put("password", userController.changePassword);
router.get("/current", [authenticateToken], userController.current);
router.put("/current", [authenticateToken], userController.update);
router.get(
  "/",
  [authenticateToken, formatPagination],
  userController.searchUserByName
);
export default router;
