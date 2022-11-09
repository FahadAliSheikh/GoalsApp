const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { use } = require('../routes/userRoutes');


// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please fill in all the fields!')
    }
    // check if user exists
    const userExist = User.findOne({ email });
    if (!userExist) {
        res.status(400)
        throw new Error('User already exists!');
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    console.log('hash', hashPassword)
    // create user
    const user = await User.create({
        name,
        email,
        password: hashPassword
    })
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data!')
    }
})

// @desc Authenticate user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log('found user', user.email);
    console.log('found user', user.password);

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400).json({
            message: 'Invalid credentials!'
        })
    }

})

// @desc Get user
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
    // const { _id, name, email } = await User.findById(req.user.id);
    res.status(200).json(req.user)
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}