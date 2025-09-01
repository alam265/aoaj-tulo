
const mongoose = require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/AoajTulo')
    .then(() => {
        console.log('MongoDB Connected')
    }).catch(() => {
        console.log('OPPS an Error Occured!')
    })