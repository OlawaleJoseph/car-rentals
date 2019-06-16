import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = async (req, res, next) =>{
    const token = req.headers["x-access-token"];
    if(!token){
        return res.status(400).send("No Token Provided")
    }else{
        try{
            const verifiedUser = await jwt.verify(token, process.env.jwt_secret)
            req.user = verifiedUser.userObj;
            next();
        }catch(error){
            res.status(400).send("Invalid Token")
        }
        
    }
}

export default verifyToken;