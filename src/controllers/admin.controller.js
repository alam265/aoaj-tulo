const express = require("express")
const app = express()
const path = require("path")
const Admins = require("../models/admin.model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports.getAdmin = (req, res) =>{
    res.sendFile(path.join(__dirname + "/../views/index.html"))
};

module.exports.saveAdmin = async (req, res) => {
    try {
        // Extract data from the request body
        const { username, age, email, password, district, nid_number, date_of_birth } = req.body;

        // Basic validation (you can expand these validations further)
        if (!username || !email || !password || !age || !district || !nid_number || !date_of_birth) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required.'
            });
        }

        // Create a new Admin document
        const newAdmin = new Admin({
            username,
            age,
            email,
            password,
            district,
            nid_number,
            date_of_birth
        });

        // Save the new admin to the database
        await newAdmin.save();

        // Send success response with the new admin object
        return res.status(201).json({
            success: true,
            admin: newAdmin
        });

    } catch (err) {
        // Handle validation errors or any other errors
        if (err.name === 'ValidationError') {
            // If it's a validation error, return detailed errors
            const errorMessages = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: errorMessages
            });
        }

        // General error handling
        return res.status(500).json({
            success: false,
            message: 'Server error, something went wrong.',
            error: err.message
        });
    }
};