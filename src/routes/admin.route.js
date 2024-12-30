const express = require("express")
const router = express.Router()
const { checkLogin } = require("../middlewares/checkLogin")
const { renderSignup, renderLogin, renderReset, saveAdmin, loginAdmin, resetPassword, logout } = require("../controllers/admin.controller")
const { getAllIssues, updateIssueStatus, getIssueStats } = require('../controllers/admin.issue.controller')
const { renderDashboard } = require('../controllers/admin.dashboard.controller')

// Public routes
router.get("/admin/signup", renderSignup)
router.post("/admin", saveAdmin)
router.get("/admin/login", renderLogin)
router.post("/admin/login", loginAdmin)
router.get("/admin/reset", renderReset)
router.post("/admin/reset-password", resetPassword)

// Protected routes
router.use('/admin/dashboard', checkLogin)
router.use('/admin/issues', checkLogin)

router.get('/admin/dashboard', renderDashboard)
router.post('/admin/issues/update-status', updateIssueStatus)
router.get('/admin/issues/stats', getIssueStats)
router.get('/admin/logout', logout)

module.exports = router