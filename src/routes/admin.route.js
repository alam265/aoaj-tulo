const express = require("express")
const router = express.Router()
const { renderSignup, renderLogin, renderReset, saveAdmin, loginAdmin, resetPassword } = require("../controllers/admin.controller")

// Route to render the signup page
router.get("/admin/signup", renderSignup)

// Route to handle signup form submission
router.post("/admin", saveAdmin)

// Route to render the login page
router.get("/admin/login", renderLogin)

// Route to handle login form submission
router.post("/admin/login", loginAdmin)

// Route to render the password reset page
router.get("/admin/reset", renderReset)

// Route to handle password reset form submission
router.post("/admin/reset-password", resetPassword)

module.exports = router