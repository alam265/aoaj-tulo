const express = require('express');
const router = express.Router();
const checkLogin  = require("../middlewares/checkLogin")

router.get("/",  (req, res)=>{
    res.send("hi")
})


module.exports = router
