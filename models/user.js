const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    fname: {
        required: true,
        type: String
    },
    lname:{
        required: true,
        type: String
    },
    email:{
        required: true,
        type: String
    },
    business:{
        type: String
    },
    password:{
        required: true,
        type: String
    }

})


// hashing password
userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
}) 

const User = new mongoose.model('User', userSchema)
module.exports = User