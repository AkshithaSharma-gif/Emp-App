import {useForm} from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios'


function EditEmployee() {

      const navigate=useNavigate()
  
      const {register,handleSubmit,formState:{errors},setValue}=useForm()
      //get emp object
      let {state}=useLocation();
      console.log(state)

  useEffect(()=>{
    setValue("Name",state.Name)
    setValue("Email",state.Email)
    setValue("Mobile",state.Mobile)
    setValue("Designation",state.Designation)
    setValue("Company",state.Company)
  },[])


const saveModifiedEmp=async(modifiedEmp)=>{
  const res=await axios.put(`http://localhost:4000/employee-api/employees/${state.Email}`,modifiedEmp)
  if(res.status==200){
    //navigate to list employeees
    navigate("/list")
  }

}




  return (
    
        <div>
        <h1 className='text-5xl text-center text-yellow-600 mb-3'>Edit Employee</h1>
        {/* form */}
        <form className='max-w-md mx-auto mt-20' onSubmit={handleSubmit(saveModifiedEmp)}>
                <div>
                    <input className='border w-full p-4 m-2 rounded-2xl' 
                            type="text" 
                            placeholder='Enter Name'
                            id='Name' 
                            {...register("Name",
                                {
                                    required:"Name Required",
                                    validate:(v)=>v.trim().length!=0||"White space is not valid"
                                }
                            )}/>
                    {/* username validation*/ }
                    {errors.Name?.type=="required" && <p className='text-red-600'>{errors.Name.message}</p>}
                    {errors.Name?.type=="validate" && <p className='text-red-600'>{errors.Name.message}</p>}
                </div>
                <div>
                    <input className='border w-full p-4 m-2 rounded-2xl' 
                            type="text"
                            placeholder='Enter Email' 
                            id='Email' 
                            {...register("Email",
                                {
                                    required:"Email Required"
                                }
                            )}/>
                    {errors.Email?.type=="required" && <p className='text-red-600'>{errors.Email.message}</p>}
                    {errors.Email?.type=="validate" && <p className='text-red-600'>{errors.Email.message}</p>}
                </div>
                <div>
                    <input className='border w-full p-4 m-2 rounded-2xl' 
                            type="text"
                            placeholder='Enter Mobile' 
                            id='Mobile' 
                            {...register("Mobile",
                                {
                                    required:"Mobile Number Required"
                                }
                            )}/>
                    {errors.Mobile?.type=="required" && <p className='text-red-600'>{errors.Mobile.message}</p>}
                </div>
                <div>
                    <input className='border w-full p-4 m-2 rounded-2xl' 
                            type="text"
                            placeholder='Enter Designation' 
                            id='Designation' 
                            {...register("Designation",
                                {
                                    required:"Designation Required"
                                }
                            )}/>
                    {errors.Designation?.type=="required" && <p className='text-red-600'>{errors.Designation.message}</p>}
                </div>
                <div>
                    <input className='border w-full p-4 m-2 rounded-2xl' 
                            type="text"
                            placeholder='Enter Comapany Name' 
                            id='Company' 
                            {...register("Company",
                                {
                                    required:"Company Required"
                                }
                            )}/>
                    {errors.Company?.type=="required" && <p className='text-red-600'>{errors.Company.message}</p>}
                </div>

                <div>
                    <label htmlFor="submit"></label>
                    <button type="submit" className='border block mx-auto p-3 bg-green-500 rounded-2xl' >Save Changes</button>

                </div>
            </form>
        
        </div>
    )
  
}

export default EditEmployee