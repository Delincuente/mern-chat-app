const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Message = require("../models/message.model");
const Utils = require("../lib/utils");
const { sendMessageSocket } = require("../lib/socket.io");

const getUsersList = async (req, res) => {
    try {
        const filteredUsers = await User.find({ _id: { $ne: req.user._id } }).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersList:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const loginId = req.user._id;
        const messages = await Message.find({
            $or: [
                { senderId: loginId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: loginId }
            ]
        })
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in get messages controller: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const loginId = req.user._id;
        const { id: receiverId } = req.params;
        
        let imageUrl;
        if (image) {
            const uploadResponse = await Utils.cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId: loginId,
            receiverId: receiverId,
            text: text,
            image: imageUrl
        });

        await newMessage.save();

        // todo: real time functionality goes here ==> socket.io
        sendMessageSocket(newMessage)
        res.status(201).json(newMessage);
    } catch (error) {
        console.log(error);
        console.log("Error in send message controller: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getUsersList: getUsersList,
    getMessages: getMessages,
    sendMessage: sendMessage
}