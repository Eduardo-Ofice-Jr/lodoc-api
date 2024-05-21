import { db } from "../lib/sqlite.js";
import fs from "fs";

export const uploadDoc = async (req, res, next) => {
    if (!req.file)
        return res.status(400).json({ message: "file not uploaded" });

    db.prepare(
        "INSERT INTO documents (name, path, user_id) VALUES (?, ?, ?)"
    ).run(req.file.originalname, req.file.path, req.user.id);

    console.log(req.user);
    res.status(200).json({ message: "file uploaded" });
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
                    ...doc,
                    image: `data:image/jpeg;base64,${imageBase64}`,
                };
            } catch (error) {
                console.error(`Error reading image for doc ${doc.id}:`, error);
                return doc;
            }
        })
    );
    console.log(docsWithImage);

    res.status(200).json({ docs: docsWithImage });
};
