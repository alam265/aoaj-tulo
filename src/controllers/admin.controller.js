const path = require("path");
const Admin = require("../models/admin.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.renderSignup = (req, res) => {
    res.render('admin/signup');
};

module.exports.renderLogin = (req, res) => {
    res.render('admin/login');
};

module.exports.renderReset = (req, res) => {
    res.render('admin/reset');
};

module.exports.saveAdmin = async (req, res) => {
    try {
        const { username, name, number, age, email, password, district, nid_number } = req.body;

        if (!username || !name || !number || !email || !password || !age || !district || !nid_number) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required.'
            });
        }

        // it checks if the admin already there
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(409).json({
                success: false,
                message: 'Email already exists.'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({
            username,
            name,
            number,
            age,
            email,
            password: hashedPassword,
            district,
            nid_number
        });

        await newAdmin.save();

        return res.status(201).json({
            success: true,
            admin: newAdmin
        });

    } catch (err) {
        console.error('Error saving admin:', err);
        if (err.name === 'ValidationError') {
            const errorMessages = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: errorMessages
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Server error, something went wrong.',
            error: err.message
        });
    }
};

module.exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required.'
            });
        }

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password.'
            });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password.'
            });
        }

        // Create token with admin info
        const token = jwt.sign(
            { 
                id: admin._id,
                email: admin.email,
                username: admin.username
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        // Store token in session
        req.session.token = token;

        return res.status(200).json({
            success: true,
            token
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Server error, something went wrong.',
            error: err.message
        });
    }
};

module.exports.resetPassword = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;

        if (!email || !answer || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Email, answer, and new password are required.'
            });
        }

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found.'
            });
        }

        // Check if the answer matches any of the admin's data
        const isAnswerCorrect = [admin.age, admin.nid_number, admin.district, admin.number].includes(answer);
        if (!isAnswerCorrect) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect answer.'
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        admin.password = hashedPassword;
        await admin.save();

        return res.status(200).json({
            success: true,
            message: 'Password reset successfully.'
        });

    } catch (err) {
        console.error('Error resetting password:', err);
        return res.status(500).json({
            success: false,
            message: 'Server error, something went wrong.',
            error: err.message
        });
    }
};

module.exports.logout = (req, res) => {
    // Clear the session
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        // Clear any auth cookies if they exist
        res.clearCookie('connect.sid');
        // Use 302 status for proper redirect
        res.status(302).redirect('/admin/login');
    });
};