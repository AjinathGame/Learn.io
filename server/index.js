import express from 'express';
import { config } from 'dotenv';

config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//db connection
import connectDB from './config/connectDB.js';
import responder from './utils/responder.js';
import { postSignup } from './controller/auth.control.js';


app.post("/signup",postSignup);
app.get("/health", (req, res) => {
    return responder(res, 200, null, "Server is healthy", true);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});