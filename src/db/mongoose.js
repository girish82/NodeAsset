const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://assetuser:adminadmin123!@cluster0.k7mky.mongodb.net/assets?retryWrites=true&w=majority',
{ useNewUrlParser: true,
useUnifiedTopology: true },
(err,res)=>{
    if(err){
        return console.log('No Connection')
    }
    console.log('Db Connected')
})

