const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
    soloData : {
        soloDataLink : {
        type : String,
        required:true
        },
        tagNumber : {
        type : String,
        required:true
        },
        description : {
        type:String,
        required : true
        },
        material : {
        type:String,
        required : true
        },
        insulation : {
        type:String,
        required : true
        },
        valvemodal : {
        type:String,
        required : true
        }
        },
        commonData : {
            commonDataLink : {
                type:String,
                required : true
                },
                updateNumber : {
                type:String,
                required : true
                },
                commodity : {
                type:String,
                required : true
                },
                temperature : {
                type:String,
                required : true
                },
        }
    })

    const Asset = mongoose.model('Asset',bookSchema);

    module.exports = Asset;