import { Router } from "express";
import upload from "../lib/multer.js";

const router = Router();

router.post("/upload-doc", upload.single("file"), (req, res, next) => {
    if (!req.file)
        return res.status(400).json({ message: "file not uploaded" });

    const file = req.file;
    console.log(file);
    res.status(200).json({ message: "file uploaded" });
});

export default router;
