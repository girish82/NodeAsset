const User = require('../models/user')
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userRouter = new express.Router();

userRouter.post('/users',async(req,res)=>{

    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password,10);
    console.log(password)
    const user = new User({
        email,
        password
    })
    console.log(user)
    await user.save();
    const token = jwt.sign({_id:user._id},'secret')
    res.status(201).send({
        user : {
            id : user.email,
            token
        }
    })
})

userRouter.get('/users', async(req,res) => {
    const users = await User.find({});
    const userEmail = users.map((user)=> user.email)
    try {
        if(users){
            return res.status(200).send({
                users : userEmail
            })
        }else{
            return res.status(400).send({
                message:'No Users Found'
            })
        }
    }
    catch(e){
        res.status(400).send({
            message:'No Users Found'
        })
    }

})

userRouter.delete('/users/:id',async(req,res)=>{
    const user = await User.findById({_id:req.params.id})
    console.log(user)
    try {
        if(!user){
            return res.status(400).send({
                message:'No User found'
            })
        }else{
            await User.findByIdAndDelete({_id:req.params.id})
            return res.status(200).send({
                message:'User deleted Successfully'
            })
        }
    } catch (error) {
        
    }
})

userRouter.post('/users/login',async(req,res)=>{
    console.log(req.body);
    const user = await User.findOne({email:req.body.email});
    try {
        if(!user){
            console.log('inside user')
            return res.status(400).send({
                message:'Invalid User Credentials (email / password)'
            })
        }else{
            const validPassword = await bcrypt.compare(req.body.password,user.password);
            if(validPassword){
                const token = jwt.sign({_id:user._id},'secret')
                return res.status(200).send({
                    user : {
                        email : user.email,
                        token
                    }
                })
            }else{
                return res.status(400).send({
                    message: 'invalid user credentials (email / password)'
                })
            }
        }
    } catch (error) {
        res.status(400).send({
            message: "Invalid User Credentials"
        })
    }
})

module.exports = userRouter