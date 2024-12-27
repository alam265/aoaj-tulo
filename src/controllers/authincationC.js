const express = require("express")
const app = express()
const User = require("../models/User")
const bcrypt = require("bcrypt") 
const jwt = require("jsonwebtoken")




module.exports.renderReg = (req, res)=> {
    res.render('reg')
}
module.exports.renderLogin = (req, res)=> {
    res.render('login')
}



module.exports.register = async (req, res) => {
    console.log(req.body)
    const { username, name, email, password, nid } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ Username: username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            username, name, email, password:hashedPassword, nid

        });

        await newUser.save(); // Save the new user to the database

        // Store user in session and generate JWT token
        req.session.User = newUser;
        const token = jwt.sign(
            { username: newUser.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        req.session.token = token;

        // Render the dashboard view with the new user
        res.render('dashboard', { user:newUser });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};




module.exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, Username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Save token and user details in session
        req.session.token = token;
        req.session.User = user;

        // Render the dashboard view with the logged-in user
        res.render('dashboard', { user });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};



module.exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }

        res.status(200).json({ message: 'Logout successful' });
    });
};

