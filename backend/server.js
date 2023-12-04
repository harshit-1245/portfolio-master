const express=require('express');

const colors=require('colors');
const cors=require('cors')
const connectDB = require( './config/db' );
const userRouter=require('./routes/userRoutes')
require('dotenv').config();
const path=require('path')

const app=express();

connectDB();

app.use(express.json())
app.use(cors());
const port=process.env.PORT;


app.use('/contact',userRouter);

//static files
app.use(express.static(path.join(__dirname,"./client/build")))

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,"./client/build/index.html"))
})

app.listen(port,()=>{
    console.log(`Server live at ${port}`.yellow);
});

