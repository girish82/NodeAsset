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
    try {
        if(users){
            console.log('Inside get')
            return res.status(200).send({
                users : users
            })
        }else{
            console.log('Inside get')
            return res.status(404).send({
                message:'No Users Found'
            })
        }
    }
    catch(e){
        res.status(404).send({
            message:'No Users Found'
        })
    }

})

userRouter.delete('/users/:id',async(req,res)=>{
    const user = await User.findById({_id:req.params.id})
    console.log(user)
    try {
        if(!user){
            return res.status(404).send({
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
    const user = await User.findOne({email:req.body.email});
    try {
        if(!user){
            return res.status(404).send({
                message:'Invalid User Credentials (email)'
            })
        }else{
            const validPassword = await bcrypt.compare(req.body.password,user.password);
            if(validPassword){
                const token = jwt.sign({_id:user._id},'secret')
                return res.status(200).send({
                    user : {
                        email : user.email,
                        token,
                        expiresIn:'360'
                    }
                })
            }else{
                return res.status(404).send({
                    message: 'invalid user credentials (password)'
                })
            }
        }
    } catch (error) {
        res.status(404).send({
            message: e.message
        })
    }
})

module.exports = userRouter