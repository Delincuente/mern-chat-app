require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io")

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [process.env.CLIENT_URL]
    }
});

const userSocketMap = {};

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    socket.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

const sendMessageSocket = (messageData) => {
    const socketId = userSocketMap[messageData.receiverId];
    if (socketId) {
        io.to(socketId).emit("newMessage", messageData);
        console.log("Send message:...", socketId)
    }
};

module.exports = { app, server, io, sendMessageSocket };