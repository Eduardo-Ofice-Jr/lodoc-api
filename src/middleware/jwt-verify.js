import jwt from "jsonwebtoken"

export const jwtVerify = (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) return res.status(401).json({ message: "token not found" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: "invalid token" });
        req.user = decoded.user;
        next();
    });
}