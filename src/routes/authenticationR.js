const express = require("express")
const router = express.Router([mergeParams = true]) 

// controller import
const authentcationC = require("../controllers/authincationC")




router.get("/register", authentcationC.renderReg)
router.get("/login", authentcationC.renderLogin)


router.post("/register",authentcationC.register)
router.post("/login", authentcationC.login)
router.get("/logout", authentcationC.logout)


module.exports = router