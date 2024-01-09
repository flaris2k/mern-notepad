const express = require('express');
require('dotenv').config();
const cors = require('cors');
const userRouter = require('./routers/userRouter');
const app = express();
const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL;
async function connectFunc(){
    try {
        await mongoose.connect(MONGO_URL);
        console.log('Connected to MongoDB!');
    } catch (error) {
        console.log('Error',error);
    }
}
connectFunc();
app.use(express.json());
app.use(cors());
app.use('/',(req,res,next)=>{
    const apiKey =req.headers['authorization'];

    if(apiKey && apiKey === process.env.API_KEY){
        console.log('Authorized!');
        next();
    }else{
        console.log('Unauthorized! Access Denied!');
        res.status(401).send('401 Unauthorized!');

    }
})

app.use('/api',userRouter);



const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT} port.`);
})