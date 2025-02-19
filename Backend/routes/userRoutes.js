import express from "express";
import { getAllUser, login, singup } from "../controllers/userController.js";

const router = express.Router();

router.get("/",getAllUser);
router.post("/signup",singup);
router.post("/login",login);

export default router;