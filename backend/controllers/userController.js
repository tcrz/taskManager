const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const asyncHandler = require("express-async-handler");
const validateRequestBody = require("../utils");

// Register user
const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    validateRequestBody(req.body, res)
    //check if user already exists and throw error
    const userAvailable = await User.findOne({email})
    if (userAvailable) {
        res.status(400)
        throw new Error("Email is already linked to an account")
    }
    // check password length then hash password
    if (password.length < 8) {
        res.status(400)
        throw new Error("Password must be atleast 8 characters")
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    // create user
    const user = await User.create({username, email, password: hashedPassword})
    // throw error if user creation fails
    if (!user) {
        res.status(400)
        throw new Error("User data is not valid")
    }
    res.status(201).json({message: "Registration successful", user: {_id: user.id, username, email}})
})

// Login user
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    validateRequestBody(req.body, res)
    const user = await User.findOne({ email })
    if (!user) {
        res.status(401)
        throw new Error("Invalid email or password")
    }
    //compare password with hashed password in db and return token and user's data
    const doPasswordsMatch = await bcrypt.compare(password, user.password)
    if (user && doPasswordsMatch) {
        const token = jwt.sign({
            user: {
                _id: user.id,
                username: user.username,
                email: user.email
            }
        },
        process.env.JWT_SECRET, {expiresIn: "3m"})
        res.status(200).json({ message: "Login successful", token, user: {username: user.username, email: user.email} })
    } else {
        res.status(401)
        throw new Error("Invalid email or password")
    }
})

// Current user Info
// Can only be accessed by current user
const currentUser = asyncHandler(async (req, res) => {
    res.json({user: req.user, message: "current user"})
})

module.exports = {
    registerUser,
    loginUser,
    currentUser
}