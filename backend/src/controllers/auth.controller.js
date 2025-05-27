const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Utils = require("../lib/utils");

const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({ message: "Email already exist" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email: email,
            fullName: fullName,
            password: hashedPassword,
        });
        if (newUser) {
            Utils.generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                message: "User created successfully",
                _id: newUser._id,
                email: newUser.email,
                fullName: newUser.fullName,
                profilePic: newUser.profilePic,
            });
        }
    } catch (error) {
        console.log("Error in signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        Utils.generateToken(user._id, res);
        res.status(200).json({
            message: "Login successful",
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error in login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const logout = async (req, res) => {
    try {
        res.cookie("jwt_token", "", { maxAge: 0 });
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.log("Error in logout:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateProfile = async (req, res) => {
    const { profilePic } = req.body;
    try {
        if (!profilePic) {
            return res.status(400).json({ message: "Please provide a profile picture" });
        }

        const uploadResponse = await Utils.cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(req.user._id, { profilePic: uploadResponse.secure_url }, { new: true });

        res.status(200).json(updatedUser)
    } catch (error) {
        console.log("Error in update profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in check auth controller: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    signup: signup,
    login: login,
    logout: logout,
    updateProfile: updateProfile,
    checkAuth: checkAuth
}