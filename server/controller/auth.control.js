import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import responder from "../utils/responder.js"


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


export { postSignup }