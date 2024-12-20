const express = require("express")
const app = express()
const path = require("path")
const admins = require("../models/admin.model")


module.exports.getAdmin = (req, res) =>{
    res.sendFile(path.join(__dirname + "/../views/index.html"))
};

module.exports.saveAdmin = (req, res) => {
    const username = req.body.name;
    const age = req.body.age;
    const email = req.body.email;
    const password = req.body.password;
    const admin = {
        username,
        email, 
        password, 
        age
    };
    admins.push(admin)
    res.status(201).json({
        success:true,admin
    })
}