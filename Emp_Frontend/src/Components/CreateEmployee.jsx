import {useForm} from 'react-hook-form';
import { useState,useContext } from 'react';
import { useNavigate } from 'react-router';
import { counterContextObj } from '../contexts/ContextProvider';

function CreateEmp() {
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(false);
    const navigate=useNavigate()

    const {register,handleSubmit,formState:{errors}}=useForm()


    
     const onFormSubmit=async (newEmpObj)=>{
        console.log(newEmpObj)
        //make http post req
        try {
            setLoading(true);
            //make HTTP POST req
            let res = await fetch("http://localhost:4000/employee-api/employees", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newEmpObj),
            });

            if (res.status === 201) {
                //navigate to employees component programatically
                navigate("/list");
            } else {
                let errorRes = await res.json();
                console.log("error responce is ", errorRes);
                throw new Error(errorRes.reason);
            }
            } catch (err) {
            console.log("err in catch", err);
            //deal with err
            setError(err.message);
            } finally {
            setLoading(false);
            }
        };

        console.log(error);

        if (loading) {
            return <p className="text-center text-4xl">Loading....</p>;
        }
        if (error) {
            return <p className="text-red-500 text-center text-3xl">{error.message}</p>;
        }
        
  
    

    return (
        <div>
            <div>
    </div>
        <h1 className='text-5xl text-center text-blue-600 mb-3'>Create New Employee</h1>
        {/* form */}
        <form className='max-w-md mx-auto mt-20 ' onSubmit={handleSubmit(onFormSubmit)}>
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
                    <input className='border block mx-auto p-3 bg-blue-500 rounded-2xl' type="submit" id='submit'/>
                </div>
            </form>
        
        </div>
    )
}

export default CreateEmp