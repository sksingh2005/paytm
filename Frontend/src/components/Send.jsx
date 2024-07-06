import axios from "axios"
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
export function Send(){
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = localStorage.getItem("username")
    const [amount, setAmount] = useState(0);
    const navigate=useNavigate();
    const handle=async ()=>{
        const confirm=await axios.post("http://localhost:3000/api/v1/accounts/transfer",{
            account:id,
            amount
        },{
            headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            }
        })
        if(confirm){
            navigate('/confirm');
        }
    }
    return <div className="flex h-screen">
        <div className="shadow-xl m-auto h-[40%] w-[30%]  ">
            <p className="font-bold text-center text-2xl">Send Money</p>
            <div className="flex gap-3 p-10">
                <div className="bg-green-500 h-[2rem] w-[2rem] rounded-full text-xl text-center text-white">
                     {name[0].toUpperCase()}
                </div>
                <p className="text-xl font-semibold">{name}</p>
            </div>
                <div className="pl-10 pb-2">
                    <p>Amount in Rupees</p>
                    <input type="text" placeholder="Enter amount" onChange={(e)=>{
                        setAmount(e.target.value)
                    }} className="w-[90%] border border-slate-300 pb-2"/>
                    
                </div>
                <div className="pl-10">
                <button type="button" onClick={handle} className="text-white w-[90%] bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded  text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 pl- pr-2">Initiate Transfer</button>
                </div>


        </div>
    </div>
}