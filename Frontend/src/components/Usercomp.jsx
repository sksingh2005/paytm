import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export const  User= ()=>{
    const [user,setUser]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
    const fetchusers=async ()=>{
        const output=await fetch("http://localhost:3000/api/v1/user/bulk")
        const user1=await output.json();
        setUser(user1.users); 
        }
    fetchusers();

    },[])
    
    return <div>
        <input type="text" placeholder="Search .." className="w-full border border-slate-300" /> 
        {user.map((user)=>(
            <div className="flex justify-between  w-full shadow-xl pt-2 pb-2">
                <div className="flex gap-2 pt-2  pb-2 font-semibold">
                 <div className="bg-slate-300 h-[1.5rem] w-[1.5rem] rounded-full text-center ">{user.firstname[0].toUpperCase()}</div>
                <p>{user.firstname}{user.lastname}</p>   
                </div>
                
                <button onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }} type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Send money</button>
            </div>
            
        ))}
    </div>
}