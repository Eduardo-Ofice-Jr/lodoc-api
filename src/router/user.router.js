import { Router } from "express";
const router = Router();

import {
    loginController,
    registerController,
} from "../controllers/user.controller.js";

router.post("/login", loginController);
router.post("/register", registerController);

// for development
import { db } from "../db/config.js";

router.delete("/delete-all", (req, res) => {
    db.prepare("delete from users").run();
    db.prepare("drop table if exists users").run();
    res.status(200).json({ message: "users deleted" });
});

export default router;
