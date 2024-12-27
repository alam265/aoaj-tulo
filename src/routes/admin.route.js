const express = require("express")
const router = express.Router()
const { renderSignup, renderLogin, renderReset, saveAdmin, loginAdmin, resetPassword, logout } = require("../controllers/admin.controller")
const { getAllIssues, updateIssueStatus, getIssueStats } = require('../controllers/admin.issue.controller')
const { renderDashboard } = require('../controllers/admin.dashboard.controller')

//signup
router.get("/admin/signup", renderSignup)
router.post("/admin", saveAdmin)
//sign in
router.get("/admin/login", renderLogin)
router.post("/admin/login", loginAdmin)
//logout
router.get('/admin/logout', logout)
//reset
router.get("/admin/reset", renderReset)
router.post("/admin/reset-password", resetPassword)
//dashboard
router.get('/admin/dashboard', renderDashboard)
// Issue
router.post('/admin/issues/update-status', updateIssueStatus)
router.get('/admin/issues/stats', getIssueStats)


module.exports = router