import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import responder from "../utils/responder.js"
import jwt from "jsonwebtoken";


const postSignup = async (req, res) => {
    try {

        let { email, password, name } = req.body;

        if (!email || !password || !name) {
            return responder(res, 406, null, "to signup email,password & name is required", false);
        }

        let userIsExist = await User.findOne({ email: email }) // use findOne

        if (userIsExist) {
            return responder(res, 406, null, "email already exist", false);
        }

        // convert password into incrypt form 

        let salt = await bcrypt.genSalt(10); // genarate salt to convert pass. into hash form
        let hashPass = await bcrypt.hash(password, salt); // ganarate pass into hash from 

        // save user into db

        let createdUser = await User.create({
            name: name,
            email: email,
            password: hashPass
        });

        let savedUser = await createdUser.save();

        if (savedUser) {
            return responder(res, 200, null, "account created successfully", true);
        }

        return responder(res, 404, null, "something went wrong", false);

    } catch (error) {
        return responder(res, error.status || 500, null, error.message, false)
    }
}

const postLogin = async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password) {
        return responder(res, 406, null, "to login email & password is required", false);
    }

    let findedUser = await User.findOne({ email: email });

    if (!findedUser) {
        return responder(res, 404, null, "user not found", false);
    }

    let isPassMatch = await bcrypt.compare(password, findedUser.password);

    if (!isPassMatch) {
        return responder(res, 404, null, "invalid password", false);

    }
      
    let token = jwt.sign({
        id:findedUser._id,
        name:findedUser.name,
        email:findedUser.email
    },process.env.JWT_SECRET)

    req.session.token = token;

    return responder(res, 200, null, "login successfully", true);
    

}


export { postSignup , postLogin }