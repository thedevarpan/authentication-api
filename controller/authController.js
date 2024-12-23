const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const checkExistingUser = await userModel.findOne({ $or: [{ username }, { email }] });


        if (checkExistingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false,
            });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const createdUser = await userModel.create({
            username,
            email,
            password: hashedPassword,
            role: role || "user",
        });

        res.status(201).json({
            message: "User created successfully",
            success: true,
            data: createdUser,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Unexpected error occurred",
            success: false,
        });

    }
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkExistingUser = await userModel.findOne({ email });

        if (!checkExistingUser) {
            return res.status(400).json({
                message: "User does not exist",
                success: false,
            });
        }

        //check password & hashed password is same or not
        const isPasswordValid = await bcrypt.compare(password, checkExistingUser.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "email or password is incorrect",
                success: false,
            });
        }

        // JWT access token
        const token = jwt.sign({
            userId: checkExistingUser._id,
            email: checkExistingUser.email,
            role: checkExistingUser.role,
        }, process.env.JWT_SECRET, { expiresIn: "2h" });

        //send cookie
        res.cookie("token", token);

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: {
                token,
                user: checkExistingUser,
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Unexpected error occurred",
            success: false,
        });

    }
}

module.exports = { registerUser, loginUser };