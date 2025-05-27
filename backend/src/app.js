import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import connectDB from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import seedsRoutes from "./routes/seeds.route.js";
import { app, server } from "./lib/socket.io.js";

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();
connectDB();

app.use(cookieParser());
app.use(express.json({ limit: "100mb" }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use((req, res, next) => {
    console.log(new Date(), req.method, req.url);
    next();
})
app.use("/seeds", seedsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});