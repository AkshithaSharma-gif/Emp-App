//create http server

import exp from 'express'; 
import {connect} from 'mongoose'
import cookieParser from "cookie-parser"
import {config} from 'dotenv'
import {employeeApp} from './APIs/EmployeeAPI.js'
import cors from 'cors'


config();           //process.env.PORT , process.env.PORT

const app=exp();      

app.use(cookieParser())
//add cookie parser


app.use(cors({
    origin:["http://localhost:5173"]
}))

app.use(cors({
    origin:["http://localhost:4000"]
}))

//body parser middleware
app.use(exp.json())    

app.use("/employee-api",employeeApp)

//port number
const port=process.env.PORT || 4000

async function connectDB(){
    try{
        await connect(process.env.DB_URL);
        console.log("DB connection succesfull");
        //start server
        app.listen(port,()=>console.log("server on port 4000.."))
    }
    catch(err){
        console.log("Error in db connection :",err);
    }
}

connectDB();

//error handling middleware(must be present at the end of the file only) - only exectes when error is occured
app.use((err,req,res,next)=>{
    console.log(err.name)
    //validation error
    if(err.name==='ValidationError'){
        return res.status(400).json({message:"Error",error:err.message})
    }
    //cast error
    if(err.name==='CastError'){
        return res.status(400).json({message:"Error",error:err.message})
    }

    //send server side errors
    res.status(500).json({message:"Error from server side",error:err.message})
})