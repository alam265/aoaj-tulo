const express = require("express")
const router = express.Router([mergeParams = true]) 

// controller import
const authentcationC = require("../controllers/authincationC")



router.post("/register",authentcationC.register)
router.post("/login", authentcationC.login )
router.post("/logout", authentcationC.logout)


module.exports = router