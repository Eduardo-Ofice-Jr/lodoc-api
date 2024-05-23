import { db } from "../lib/sqlite.js";
import fs from "fs";

export const uploadDoc = async (req, res, next) => {
    try {
        if (!req.user) return res.status(401).json({ message: "unauthorized" });

        if (!req.file)
            return res.status(400).json({ message: "file not uploaded" });

        const timestamp = new Date().toLocaleString();
        const doc = db
            .prepare(
                "INSERT INTO documents (name, path, user_id, created_at) VALUES (?, ?, ?, ?)"
            )
            .run(req.file.originalname, req.file.path, req.user.id, timestamp);

        if (!doc) {
            fs.unlinkSync(req.file.path);

            return res.status(400).json({ message: "doc not added" });
        }

        res.status(200).json({ message: "file uploaded" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal server error" });
    }
};

export const getDocs = async (req, res) => {
    const docs = db
        .prepare("SELECT * FROM documents WHERE user_id = ?")
        .all(req.user.id);

    const docsWithImage = await Promise.all(
        docs.map(async (doc) => {
            try {
                const imagePath = doc.path;
                const imageBuffer = await fs.promises.readFile(imagePath);
                const imageBase64 = imageBuffer.toString("base64");
                return {
                    createdAt: doc.created_at,
                    name: doc.name,
                    image: `data:image/jpeg;base64,${imageBase64}`,
                };
            } catch (error) {
                console.error(`Error reading image for doc ${doc.id}:`, error);
                return doc;
            }
        })
    );

    res.status(200).json({ docs: docsWithImage });
};
