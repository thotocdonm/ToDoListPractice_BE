const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User');
const response = require('../helper/response')

router.post('/register', async (req,res,next) =>{
    const {username,email,password} = req.body;

    try {
        const existingUser = await User.findOne({where:{email}});
        if(existingUser){
            return response(res, next, 409, 'Email already in use', 'ERROR');
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = await User.create({
            name:username,
            email,
            password:hashedPassword
        })

        return response(res, next, 201, 'Register successful', 'SUCCESS', {
            id: newUser.id,
            email: newUser.email,
        });
    } catch (e){
        console.log(e);

        return response(res, next, 500, 'Server error', 'ERROR');
    }
})

router.post('/login',async (req,res,next)=>{
    const {email,password} = req.body;

    try {
        const user = await User.findOne({where:{email}});
        if(!user){
            return response(res, next, 400, 'Invalid credentials', 'ERROR');
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return response(res, next, 400, 'Invalid credentials', 'ERROR');
        }

        const token = jwt.sign(
            {id:user.id,email:user.email},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        )

        return response(res, next, 200, 'Login successful', 'SUCCESS', { id:user.id,email:user.email,accessToken:token });
    } catch (e){
        console.log(e)
        return response(res, next, 500, 'Server error', 'ERROR');
    }
})

module.exports = router