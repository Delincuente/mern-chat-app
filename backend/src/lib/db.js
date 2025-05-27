import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected successfully: ${conn.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection faild:", error);
    }
};

module.exports = connectDB;