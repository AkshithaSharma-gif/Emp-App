import exp from 'express'
import { EmployeeModel } from '../models/EmployeeModel.js'

export const employeeApp=exp.Router()

//cretae new employee
employeeApp.post("/employees",async (req,res)=>{                                    
    //get new emp obj from req
    const newEmp=req.body
    const newEmpDocument=new EmployeeModel(newEmp)
    //save
    const result=await newEmpDocument.save()
    console.log("result :",result)
    //send response
    res.status(200).json({message:"Employee added"})                                
})




employeeApp.get("/employees",async(req,res)=>{
    let employees=await EmployeeModel.find();
    res.status(200).json({message:"Employees list :",payload:employees})
})





employeeApp.put('/employees/:email',async(req,res)=>{
    
    let modifiedEmp=req.body
    const empEmail=req.params.email
    const emp=await EmployeeModel.findOne({Email:empEmail})

    if(!emp){
        return res.status(404).json({message:"Employee not found"})
    }
    let result=await EmployeeModel.findOneAndUpdate({Email:empEmail},{$set:{...modifiedEmp}},{new:true})
        console.log(result)
    res.status(200).json({message:"Employee Updated :",payload:emp})
})





employeeApp.delete('/employees/:email',async(req,res)=>{
        //get user id
        const email=req.params.email;
        //find and delete 
        let deletedEmp=await EmployeeModel.findOneAndDelete({Email:email})              //findByIdAndDelete(uid,{_id:uid})
        if(!deletedEmp){
            return res.status(404).json({message:"employee not found"})
        }
        res.status(200).json({message:"Employee Deleted",payload:deletedEmp})
})