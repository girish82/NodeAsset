const express = require('express');
const Asset = require('../models/asset');
const assetRouter = new express.Router();
const auth = require('../middleware/auth')

assetRouter.post('/assets',async(req,res)=> {

    const asset = new Asset({
        soloData : {
            soloDataLink : req.body.soloData.soloDataLink,
            tagNumber : req.body.soloData.tagNumber,
            description : req.body.soloData.description,
            material : req.body.soloData.material,
            insulation : req.body.soloData.insulation,
            valvemodal : req.body.soloData.valvemodal
        },
        commonData : {
            commonDataLink : req.body.commonData.commonDataLink,
            updateNumber : req.body.commonData.updateNumber,
            commodity : req.body.commonData.commodity,
            temperature : req.body.commonData.temperature

        }});
    try {
        if(!asset){
            return res.status(400).send({
                message : 'Asset details not correct'
            })
        }
        else{
            await asset.save();
            return res.status(201).send({
                message : 'Asset added Successfully',
                asset
            })
        }
    }
    catch(e){
        res.status(404).send({
            Error : e.message
        })
    }
    
})

assetRouter.get('/assets',async(req,res)=> {
    
    const assets = await Asset.find({});
    try {
        if(!!assets){
            return res.status(200).send({
                assets
            })
        }else{
            return res.status(400).send({
                message:'No Assets Found'
            })
        }
    } catch (error) {
        res.status(400).send({
            message:'No Assets Found'
        })
    }
})

assetRouter.delete('/assets/:id',auth,async(req,res)=> {
    const asset = await Asset.findOne({_id:req.params.id});
    console.log(asset)
    try {
        if(asset){
            await Asset.findByIdAndDelete({_id:req.params.id});
            return res.status(200).send({
                message : 'Deletion done successfully'
            })
        }else{
            return res.status(200).send({
                message : 'Asset Doesnot Exists'
            })
        }
    } catch (error) {
        res.status(200).send({
            message : 'Error in deletion'
        })
    }
})

assetRouter.get('/assets/:id',auth,async(req,res)=> {
    
    const asset = await Asset.findOne({_id:req.params.id})
    console.log(asset)
    try {
        if(asset){
                const assetExist = await Asset.findById({_id:req.params.id});
                return res.status(200).send({
                    message : 'Asset Found',
                    assetExist
                })
            }else{
                return res.status(400).send({
                    message : 'No Asset Found',
                })
            }
        }
    catch (error) {
        res.status(404).send({
            message : 'Error in Getting Asset',
        })
    }
})

assetRouter.put('/assets/:id',auth,async(req,res)=> {
    
    const asset = await Asset.findOne({_id:req.params.id})
    console.log(asset)
    try {
        if(asset){
            const updateAsset = {
                soloData : {
                    soloDataLink : req.body.soloData.soloDataLink,
                    tagNumber : req.body.soloData.tagNumber,
                    description : req.body.soloData.description,
                    material : req.body.soloData.material,
                    insulation : req.body.soloData.insulation,
                    valvemodal : req.body.soloData.valvemodal
                },
                commonData : {
                    commonDataLink : req.body.commonData.commonDataLink,
                    updateNumber : req.body.commonData.updateNumber,
                    commodity : req.body.commonData.commodity,
                    temperature : req.body.commonData.temperature
        
                }};
            await Asset.findByIdAndUpdate({_id:req.params.id},updateAsset);
            return res.status(200).send({
                message : 'Edit done successfully',
                updateAsset
            })
        }else{
            return res.status(400).send({
                message : 'No Asset Found',
            })
        }
    } catch (error) {
        res.status(200).send({
            message : 'Error in updating'
        })
    }
})

module.exports = assetRouter;