import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../db/config.js";

export const loginController = (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res
                .status(400)
                .json({ message: "username and password are required" });
        }

        const user = db
            .prepare("SELECT * FROM users WHERE username = ?")
            .get(username);
        if (!user) return res.status(400).json({ message: "user not found" });

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword)
            return res.status(400).json({ message: "user or password invalid" });

        // O segredo está exposto aqui de tal forma apenas para fins de exemplo,
        // mas em uma aplicação real o segredo deve ser gerado e armazenado em um lugar seguro.
        const token = jwt.sign({ user }, "secret", { expiresIn: "1h" });

        return res.json({
            user: { ...user, password: undefined },
            token,
            message: "user logged in",
        });
    } catch (error) {
        console.log(error);
    }
};

export const registerController = async (req, res) => {
    try {
        const { name, username, password } = req.body;

        if (!username || !password || !name)
            return res
                .status(400)
                .json({ message: "username, name and password are required" });

        const userExists = db
            .prepare("SELECT * FROM users WHERE username = ?")
            .get(username);

        if (userExists)
            return res.status(400).json({ message: "user already exists" });

        const passwordHash = await bcrypt.hash(password, 10);

        const userAdded = db
            .prepare(
                "INSERT INTO users (password, username, name) VALUES (?, ?, ?)"
            )
            .run(passwordHash, username, name);

        if (!userAdded)
            return res.status(400).json({ message: "user not added" });

        const user = db
            .prepare("SELECT * FROM users WHERE username = ?")
            .get(username);

        // O segredo está exposto aqui de tal forma apenas para fins de exemplo,
        // mas em uma aplicação real o segredo deve ser gerado e armazenado em um lugar seguro.
        const token = jwt.sign({ user }, "secret", { expiresIn: "1h" });

        return res.json({
            user: { ...user, password: undefined },
            token,
            message: "user created",
        });
    } catch (error) {
        console.log(error);
    }
};

export const createUserTable = (req, res, next) => {
    db.prepare(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)"
    ).run();
    next();
};
