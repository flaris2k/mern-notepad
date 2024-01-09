const mongoose = require('mongoose');



const noteSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    noteTitle:{
        type:String,
        required:true
    },
    noteContent:{
        type:String,
        required:true
    }
})

const noteModel = mongoose.model('notes',noteSchema);
module.exports = noteModel;

