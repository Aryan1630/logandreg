const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fname: {
        required: True,
        type: string
    },
    lname:{
        required: True,
        type: string
    },
    email:{
        required: True,
        type: email
    },
    business:{
        type: string
    },
    password:{
        required: True,
        type: password
    }

})