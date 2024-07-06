import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
export function Signup(){
    const [username,setUsername]=useState();
    const [password,setPassword]=useState();
    const [firstname,setFirstname]=useState();
    const [lastname,setLastname]=useState();
    const navigate=useNavigate();
    return <div className=" h-screen bg-gray-300 flex items-center">
            <div className="bg-white h-[75%] w-[25%]  m-auto rounded pt-2">
                <div className="flex flex-col justify-center px-4 text-center pt-5">
                <p className="font-bold text-2xl pb-2">Sign Up</p>
                <p className="text-gray-300">Enter your information to create an account</p>   
                </div>
                <div className="pt-2 pl-5 font-semibold">
                    <p className="">First Name</p> 
                    <input type="text" placeholder=" John" onChange={(e)=>{
                        setFirstname(e.target.value);
                    }} className="border rounded border-slate-500 pb-1 pt-1 w-[90%] " /> 
                    <p className="pt-2">Last Name</p> 
                    <input type="text" placeholder=" Doe" onChange={(e)=>{
                        setLastname(e.target.value);
                    }} className="border rounded border-slate-500 pb-1 pt-1 w-[90%]" /> 
                    <p className="">Email</p> 
                    <input type="email" placeholder=" sks@gmail.com" onChange={(e)=>{
                        setUsername(e.target.value);
                    }} className="border rounded border-slate-500 pb-1 pt-1 w-[90%] " /> 
                    <p className="pt-2">Password</p> 
                    <input type="password" placeholder=" Password" onChange={(e)=>{
                        setPassword(e.target.value);
                    }} className="border rounded border-slate-500 pb-1 pt-1 w-[90%]" /> 
                    
                </div> 
                <div className="p-5">
                <button onClick={async()=>{
                    const response=await axios.post("http://localhost:3000/api/v1/user/signup",{
                        username,
                        password,
                        firstname,
                        lastname
                    });
                    localStorage.setItem("username",username)
                    localStorage.setItem("firstname",firstname)
                    localStorage.setItem("lastname",lastname)
                    localStorage.setItem("token",response.data.token)
                    navigate('/dashboard')
                }} type="button" class="text-white bg-gray-700 w-[95%] hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Sign up</button>
                <div className="flex ">
                    <p className="pl-10">Already have an account?  </p> 
                    <Link className="pointer underline pl-1 cursor-pointer" to={'/signin'}>
                            Signin
                    </Link>
                </div>
                    
                </div>
            
            </div>
    </div>
}
