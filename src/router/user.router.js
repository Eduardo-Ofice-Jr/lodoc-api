import { Router } from "express";
const router = Router();

import {
    loginController,
    registerController,
} from "../controllers/user.controller.js";

router.post("/login", loginController);
router.post("/register", registerController);

export default router;
