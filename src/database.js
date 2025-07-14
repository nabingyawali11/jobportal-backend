import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const Url = process.env.DATABASE_URL;


const connectDB = async () => {
    try{
        await mongoose.connect(Url);

        console.log("MongoDB connected.....");
    } catch(error){
        console.log(error.message);

        process.exit(1);
    }
};

export default connectDB;