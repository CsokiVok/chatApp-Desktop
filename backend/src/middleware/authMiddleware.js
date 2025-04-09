import jwt, { decode } from "jsonwebtoken"
import User  from "../models/user.js"

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1] || null;

        if(!token){
            return res.status(401).json({message: "No token"});
        }

        const decoded = jwt.verify(token, process.env.JWTSECRET)
        if(!decoded){
            return res.status(401).json({message: "Invalid token"});
        }

        const user = await User.findById(decoded.userId).select("-password")

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("Error in authMidleWare " + error.message);
        res.status(500).json({message: "Internal server error"})
    }
}
