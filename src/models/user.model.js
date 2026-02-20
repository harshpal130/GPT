const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email :{
        required:true,
        type:String,
        unique:true

    },
    fullName:{
        firstName:{
            required:true,
            type:String
        },
        lastName:{
            required:true,
            type:String
        }
    },
    password:{
        type:String
    }
},
{
    timestamps :true  // keep the record for the last time user update
})

const  userModel = mongoose.model("user", userSchema);

module.exports = userModel;