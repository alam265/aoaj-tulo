const express = require("express")
const path = require("path")
const app = express()
const session = require("express-session")
require("dotenv").config()
const connectDB = require('./config/database');

// Middleware to parse JSON and URL-encoded data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Set EJS as the view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
    }
}))

// Importing Routes
const adminRoute = require("./routes/admin.route")

// Use the admin routes
app.use("/", adminRoute)

// 404 page
app.use((req, res, next) => {
    res.status(404).json({
        message: "Page not found"
    })
})

// Start the server
const PORT = process.env.PORT || 1359
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

connectDB();








