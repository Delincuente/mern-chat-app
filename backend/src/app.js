require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path")
const connectDB = require("./lib/db");
const authRoutes = require("./routes/auth.route");
const messageRoutes = require("./routes/message.route");
const seedsRoutes = require("./routes/seeds.route");
const { app, server } = require("./lib/socket.io");
connectDB();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(cookieParser());
app.use(express.json({ limit: "100mb" }));
app.use(cors({
    origin: process.env.CLIENT_URL,
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