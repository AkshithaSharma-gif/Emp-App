import {Schema,model} from "mongoose"

const employeeSchema=new Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:[true,"Email already exists"]  
    },
    Mobile:{
        type:String,
        required:true
    },
    Designation:{
        type:String,
        required:true
    },
    Company:{
        type:String,
        required:true
    }
})

export const EmployeeModel=model("employees",employeeSchema)