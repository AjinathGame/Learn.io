import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        if(conn){
            console.log(`MongoDB connected successfully`);
        }else{
            console.log(`MongoDB connection failed`);
        }
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
    }
}

export default connectDB;
