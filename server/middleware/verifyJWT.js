
import jwt from "jsonwebtoken";
import responder from "../utils/responder.js";



const verifyToken = (req, res, next) => {
    try {
        let { token } = req.session;

        if (!token) {
            return responder(res, 404, null, "please login", false)
        }else{
             let decoded = jwt.verify(token, process.env.JWT_SECRET);
             req.user = decoded;
             next();
        }


    } catch (error) {
        return responder(res, error.status || 500, null, error.message, false)
    
    }
}
export default verifyToken;