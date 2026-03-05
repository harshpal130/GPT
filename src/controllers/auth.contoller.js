const userModel = require('../models/user.model')
const bcrypt = require("bcryptjs");
const { json } = require('express');
const jwt = require('jsonwebtoken');

async function registerUser(req, res){
    const { firstName,lastName,email, password} = req.body;

    //console.log("BODY 👉", req.body);

    const userr = await userModel.findOne({
        email
    })

    if(userr){
        return res.status(400).json({
            message:"user already exsit"
        })
    }

    const hashPassword = await bcrypt.hash(password,10);

    const user = await userModel.create({
        fullName:{
            firstName, lastName
        },
        email,

        password : hashPassword
    })
    const token = jwt.sign({id: user._id},process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(201).json(
        {message:"user created successfully",
        user: {
            email : user.email,
            _id:user._id,
            fullName:user.fullName
            
        }
    }
    )
}

async function login(req, res){
    const {email,password}= req.body
    console.log("body" , req.body)

    const userr = await userModel.findOne({email})

    if(!userr){
        return res.status(401).json({
            message:"user dont exist register"
        })
    }

    const isValidPassword = await bcrypt.compare(password, userr.password)

    if(!isValidPassword){
        return res.status(401).json({
            message:"invalid password"
        })
    }
    const token = jwt.sign({id:userr._id}, process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(200).json({
        message:"user logged in successfully",
        user:{
            email:userr.email,
            _id:userr._id,
            fullName:userr.fullName
        }
    })
}

module.exports = {
    registerUser,
    login

}