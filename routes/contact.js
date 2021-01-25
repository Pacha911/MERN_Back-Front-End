const express = require("express")
const router = express.Router()
const Contact = require("../models/Contact")

// test
// localhost:5000/contacts/test
// @path
// test route
// type(private or public)
router.get('/test',(req,res) => {
res.send("Tested")
})

// add contact (to be shown on mongo compass)
// router.post("/addContact",(req,res)=>{
//     const {name,email,phone}=req.body
//     const newContact=new Contact({
//         name,phone,email
//     })
//     newContact.save()
//     .then(contacts=>res.json({msg:"Contact added",contacts}))
//     .catch(err=>console.log(err))
// })
router.post("/addContact",async(req,res)=>{
    const {name,email,phone}=req.body
    try{
        const newContact=new Contact({
            name,phone,email
        })
        let contact=await newContact.save()
        res.json({msg:"Contact added",contact})
    }catch (err){
        res.json(err)
    }
})

// get all contact
router.get("/all",async(req,res)=>{
    try{
        let contacts=await Contact.find()
        res.status(200).json({msg:"List of all contact",contacts})
    }catch (err){
        res.json(err)
    }
})

// delete contact
router.delete("/deleteContact/:_id",async(req,res)=>{
    const {_id}=req.params
    try{
        let contact=await Contact.findOneAndDelete({_id})
    res.json({msg:"Contact deleted",contact})
    }catch (err){
        res.json(err)
    }
})

// get contact by id
router.get("/:_id",async(req,res)=>{
    const {_id}=req.params
    try{
        let contact=await Contact.findOne({_id})
        res.json({msg:"Contact by id",contact})
    }catch (err){
        res.json(err)
    }    
})

// edit contact
router.put("/editContact/:_id",async(req,res)=>{
    const {_id}=req.params
    try{
        let contact=await Contact.findOneAndUpdate(
            {_id},{$set:req.body}
        )
        res.json({msg:"Contact updated",contact})
    }catch (err){
        res.json(err)
    }    
})

module.exports=router