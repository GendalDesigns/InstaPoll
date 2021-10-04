const InstaPoll = require("../models/InstaPoll.model")

module.exports.createInstaPoll = (req,res)=>{
    console.log("hey, its createInstaPoll in the controller!")
    InstaPoll.create(req.body)
    .then(newInstaPoll => res.json({results: newInstaPoll}))
    .catch(err=>res.json({message:"that didnt work",err}))
}

module.exports.findAllInstaPolls = (req,res)=>{
    console.log("hey, its findAllInstaPolls in the controller!")
    InstaPoll.find({})
        .then(allInstaPolls=> res.json({results: allInstaPolls}))
        .catch(err=>res.json({message:"that didnt work",err}))
}

module.exports.findSingleInstaPoll = (req,res)=>{
    console.log("hey, its findOneInstaPoll in the controller!")
    InstaPoll.findOne({_id: req.params._id})
    .then(singleInstaPoll=> res.json({results: singleInstaPoll}))
    .catch(err=>res.json({message:"that didnt work",err}))
}

module.exports.updateInstaPoll = (req,res)=>{
    console.log("hey, its updateInstaPoll in the controller!")
    InstaPoll.findOneAndUpdate({_id: req.params._id},
        req.body,
        {new:true, runValidators: true})
    .then(updated => res.json({results: updated}))
    .catch(err=>res.json({message:"that didnt work",err}))
}

module.exports.deleteInstaPoll = (req,res)=>{
    console.log("hey, its deleteInstaPoll in the controller!")
    InstaPoll.deleteOne({_id: req.params._id})
    .then(results => res.json({results:results}) )
    .catch(err=>res.json({message:"that didnt work",err}))
}