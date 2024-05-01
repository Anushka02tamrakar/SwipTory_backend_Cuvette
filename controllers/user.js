const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//load user

const loadUser = async (req, res, next) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username });
        if (user) {
            res.json({ success: true, username: username, userId: user._id, user });

        } else {
            res.status(400).json("User doesn't exist");
        }
    } catch (error) {
        next(new Error('Error getting user'));
    }
};

// // register User

const register = async (req, res, next) => {
    try {

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json("Please provide username and password");
        }

        const existedUser = await User.findOne({ username });

        if (existedUser) {
            return res.status(400).json("User already exists")
        }

        const hashedPasword = bcrypt.hashSync(password, 10)

        const user = new User({ username, password: hashedPasword });
        await user.save();

        //generate token and login that user

        const token = jwt.sign({ username: username }, process.env.JWT_SECRET);
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            strict: true,
        });
        res.status(201).json({
            success: true,
            token,
            username: username,
            userId: user._id,
            user,
        });
    } catch (error) {
        next(new Error('Error registering user'))
    }

};

//login user

const login = async (req, res, next) => {
    try {

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json("please provide username and password")
        }

        const user = await User.findOne({ username });

        if (!user) {
            res.status(400).json('Please enter valid username')
        } else {
            //compare password
            const comparePassword = await bcrypt.compare(password, user.password)

            if (!comparePassword) {
                return res.status(400).json('Please enter valid password')
            }

            //generate token
            const token = jwt.sign({ username: username }, process.env.JWT_SECRET, {
                expiresIn: "10d",
            });
            //set cookie
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
            });
            res.status(200).json({
                success: true,
                token,
                username: username,
                userId: user._id,
                user,
            })
        }



    } catch (error) {
        next(new Error('Error logging in user'))
    }
};

// //logout user

const logout = async (req, res, next) => {
    try {
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        next(new Error('Error logging out user'));
    }
};

module.exports = {
    register, 
    login, 
    logout,
    loadUser,
};
