const express = require('express');
const Asset = require('../models/asset');
const userRouter = new express.Router();
// const auth = require('../middleware/auth')

userRouter.post('/assets',async(req,res)=> {

    const asset = new Asset({
        soloData : {
            soloDataLink : req.body.soloData.soloDataLink,
        author : req.body.author,
        description : req.body.description,
        owner : req.userId
    })
    try {
        if(!book){
            return res.status(404).send({
                message : 'Book details not correct'
            })
        }
        else{
            await book.save();
            return res.status(201).send({
                message : 'Book added Successfully',
                book
            })
        }
    }
    catch(e){
        res.status(404).send({
            Error : e.message
        })
    }
    
})

userRouter.get('/books',async(req,res)=> {
    
    const books = await Book.find({});
    try {
        if(!books){
            return res.status(404).send({
                message:'No Books Found'
            })
        }else{
            return res.status(200).send({
                books
            })
        }
    } catch (error) {
        res.status(404).send({
            message:'No Books Found'
        })
    }
})

userRouter.get('/books/me',auth,async(req,res)=> {
    
    const userId = req.userId;
    console.log(userId)
    const books = await Book.find({'owner': userId});
    console.log(books)
    try {
        if(!books){
            return res.status(404).send({
                message:'No Books Found for current user'
            })
        }else{
            return res.status(200).send({
                books
            })
        }
    } catch (error) {
        res.status(404).send({
            message:'No Books Found'
        })
    }
})

userRouter.delete('/books/:id',auth,async(req,res)=> {
    console.log(req.userId)
    console.log(req.params.id)
    const book = await Book.findOne({_id:req.params.id,'owner':req.userId})
    console.log(book)
    try {
        if(!book){
            const bookExist = await Book.findById({_id:req.params.id})
            if(bookExist){
                return res.status(404).send({
                    message : 'Not Authorized to delete the Book'
                })
            }else{
                return res.status(404).send({
                    message : 'No Book Found.Delete cannot be done'
                })
            }
        }else{
            await Book.findByIdAndDelete({_id:req.params.id});
            return res.status(200).send({
                message : 'Deletion done successfully'
            })
        }
    } catch (error) {
        res.status(200).send({
            message : 'Error in deletion'
        })
    }
})

userRouter.get('/books/:id',auth,async(req,res)=> {
    
    const book = await Book.findOne({_id:req.params.id,'owner':req.userId})
    console.log(book)
    try {
        if(!book){
            const bookExist = await Book.findById({_id:req.params.id})
            if(bookExist){
                return res.status(404).send({
                    message : 'Not Authorized to edit the Book',
                    book : null
                })
            }else{
                return res.status(404).send({
                    message : 'No Book Found.Edit cannot be done',
                    book : null
                })
            }
        }else{
            await Book.findById({_id:req.params.id});
            return res.status(200).send({
                message : 'Edit can be done',
                book
            })
        }
    } catch (error) {
        res.status(200).send({
            message : 'Error in Getting Book',
            book: null
        })
    }
})

userRouter.put('/books/:id',auth,async(req,res)=> {
    
    const book = await Book.findOne({_id:req.params.id,'owner':req.userId})
    console.log(book)
    try {
        if(!book){
            const bookExist = await Book.findById({_id:req.params.id})
            if(bookExist){
                return res.status(404).send({
                    message : 'Not Authorized to edit the Book',
                    book : null
                })
            }else{
                return res.status(404).send({
                    message : 'No Book Found.Edit cannot be done',
                    book : null
                })
            }
        }else{
            const updateBook = {
                title : req.body.title,
                author : req.body.author,
                description : req.body.description
            }
            await Book.findByIdAndUpdate({_id:req.params.id},updateBook);
            return res.status(200).send({
                message : 'Edit done successfully',
                book : {...book,_id:req.params.id,owner:req.userId}
            })
        }
    } catch (error) {
        res.status(200).send({
            message : 'Error in updating'
        })
    }
})

module.exports = userRouter;