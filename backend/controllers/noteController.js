const noteModel = require("../models/noteModel")


module.exports.saveNote = async(req,res) =>{
    console.log('body',req.body);
    const newNote = new noteModel({
        user:req.body.userID,
        noteTitle:req.body.noteT,
        noteContent:req.body.noteC
    })
    await newNote.save().then(()=>{
        console.log('Note saved!');
    });
    const data = await noteModel.find({user:req.body.userID});
    res.status(200).json(data);

    
}

module.exports.getNote = async(req,res) =>{
    console.log(req.query)
    try{
        const notes = await noteModel.find({user:req.query.userID});
        console.log(notes)
        res.status(200).json(notes)
        console.log('Notes sended!');


    }catch(err){
        console.log('NOTES ERROR : ',err);
    }

    
}

module.exports.getSpesificNote = async(req,res) =>{
    console.log(req.query)
    try{
        console.log(req.query);
        const notes = await noteModel.find({user:req.query.userID,noteTitle:req.query.noteTitle});
        res.status(200).json(notes)
        console.log(req.body.noteTitle+' Note sended!');


    }catch(err){
        console.log('NOTES ERROR : ',err);
    }

    
}

module.exports.updateNote = async(req,res)=>{
    try {
        await noteModel.updateOne({noteTitle:req.body.oldTitle},{$set : {noteTitle:req.body.newTitle,noteContent:req.body.newContent}});
        console.log('UPDATED!');
        const data = await noteModel.find({user:req.query.userID});
        res.status(200).json(data);
    } catch (error) {
        console.log('UPDATE ERROR : ',error);
    }
}


module.exports.delNote = async(req,res) => {

    try {
        
        await noteModel.deleteOne({noteTitle:req.body.noteT,user:req.body.userID})
        console.log('object deleted.')
        const data = await noteModel.find({user:req.body.userID});
        res.status(200).json(data);
    } catch (error) {
        console.log('DELETE ERROR: ',error);
    }
}