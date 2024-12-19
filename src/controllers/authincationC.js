const express = require("express")
const app = express()
const User = require("../models/User")
const bcrypt = require("bcrypt") 
const jwt = require("jsonwebtoken")
const session = require("express-session")


module.exports.register = async (req, res) => {
    const { Username, Name, Email, Password, NID } = req.body;
    
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ where: { Username } });
        if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
        }
    
        // Hash password
        const hashedPassword = await bcrypt.hash(Password, 10);
    
        // Create new user
        const newUser = await User.create({
        Username,
        Name,
        Email,
        Password: hashedPassword,
        NID
        });
    
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
    } 


module.exports.login =  async (req, res) => {
    const { Username, Password } = req.body;
    
    try {
        // Check if user exists
        const user = await User.findOne({ where: { Username } });
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }
    
        // Validate password
        const isPasswordValid = await bcrypt.compare(Password, user.Password);
        if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        // Generate JWT
        const token = jwt.sign({ id: user._id, Username: user.Username }, process.env.JWT_SECRET, {
        expiresIn: '1h',
        });
        req.session.token = token
    
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
    }


module.exports.logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed' });
      }
      res.status(200).json({ message: 'Logout successful' });
    });
}