const mongoose = require('mongoose');




const userSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    password:{
        type:String,
        require:true
    },
    userCreated:{
        type:Date,
        default:Date.now
    }
})

const user = mongoose.model('user',userSchema);
module.exports = user;