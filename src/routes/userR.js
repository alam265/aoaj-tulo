const express = require("express")
const router = express.Router([mergeParams = true])  






// Controller import 
const userC = require("../controllers/userC")

router.get("/createIssue", userC.renderCreateIssue)

router.post('/upload', userC.upload)

router.post("/createIssue", userC.createIssue)

router.get('/userIssues/:username', userC.renderAllIssue)

router.get("/dashboard", userC.dashboard)

module.exports = router