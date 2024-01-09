const userModel = require('../models/userModel');


module.exports.saveUser = async(req,res)=>{
    console.log('Save User Controller!');
    const newUser = new userModel({
        user:req.body.username,
        password:req.body.password,
    });
    try {
        await newUser.save();
        console.log('User saved!');
        const data = await userModel.find();
        res.status(201).json(data);
    } catch (error) {
        console.log('User not saved: ',error);
    }
}


module.exports.getAllUsers = async (req,res) =>{
    console.log('Get All Users!')
    try {
        await userModel.find().then(data=>{
            res.status(200).json(data);
        });
    } catch (error) {
        res.status(500).json({error:'500 Internal Server'});
        console.log('User Find Error: ',error);
    }

}
