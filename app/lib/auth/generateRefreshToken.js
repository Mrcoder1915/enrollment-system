import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()
const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "7d"})
}

export default generateRefreshToken