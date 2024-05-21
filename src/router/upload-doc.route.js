import { Router } from "express";
import { getDocs, uploadDoc } from "../controllers/upload-doc.controller.js";
import upload from "../lib/multer.js";
import { jwtVerify } from "../middleware/jwt-verify.js";

const router = Router();

router.post("/upload-doc", jwtVerify, upload.single("file"), uploadDoc);
router.get("/get-docs", jwtVerify, getDocs);

export default router;
