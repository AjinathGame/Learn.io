import express from 'express';
import { config } from 'dotenv';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';

config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "*",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized:false,
    cookie:{
        httpOnly:true,
        maxAge:24*60*60*1000*7 // 7 day
    }
}))


//db connection
import connectDB from './config/connectDB.js';
import responder from './utils/responder.js'; 
import { postLogin, postSignup } from './controller/auth.control.js';
import verifyToken from './middleware/verifyJWT.js';
import { ganarateRoadmap } from './controller/roadmapControl.js';



app.post("/signup",postSignup);
app.post("/login",postLogin);

app.post("/genrate",verifyToken,ganarateRoadmap)

app.get("/health", (req, res) => {
    return responder(res, 200, null, "Server is healthy", true);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});