import { useNavigate } from "react-router-dom"

export function Confirm(){
    const navigate=useNavigate();
    return <div className="flex h-screen">
    <div className="shadow-xl m-auto h-[40%] w-[30%]  ">
        
        <div className="flex gap-3 flex-col justify-center p-10">
            <div className="bg-green-500 h-[2rem] w-[2rem] rounded-full text-xl text-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>

            </div>
            <p className="text-xl font-semibold"></p>
        </div>
            <div className="pl-10 pb-2">
                <p>Amount processed</p>
                
                
            </div>
            <div className="pl-10">
            <button type="button" onClick={()=>{
                navigate('/dashboard')
            }} className="text-white w-[90%] bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded  text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 pl- pr-2">Back to Dashboard</button>
            </div>


    </div>
</div>
}