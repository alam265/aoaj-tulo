const express = require("express")
const router = express.Router([mergeParams = true])  






// Controller import 
const userC = require("../controllers/userC")

router.get("/issue/createIssue", userC.renderCreateIssue)

// router.post('/upload', userC.upload)

router.post("/issue/createIssue", userC.createIssue)

router.get('/userIssues/:username', userC.renderAllIssue)

router.get("/dashboard", userC.dashboard)

//delete issue
router.post("/:issueId/delete", userC.deleteIssue)

//edit issue 


router.get("/:issueId/edit", userC.renderEdit)
router.post("/issue/:issueId/edit" , userC.editIssue)


// router.get("/issue/:issueId", userC.fetchIssue)

module.exports = router