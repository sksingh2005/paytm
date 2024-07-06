import { Balance } from "./Balance";
import { User } from "./Usercomp";


export function Dashboard(){
    return <div>
        <div className="w-full shadow-xl rounded flex justify-between p-3 ">
            <p className="font-semibold">Paytm</p>
            <div className="flex gap-3">
                 <p>Hello </p>
            <div className="bg-slate-300 h-[1.5rem] w-[1.5rem] rounded-full text-center">
                U
            </div>
            </div>
           
           
        </div>
         <Balance/>
         <p className="font-semibold p-3">Users</p>
         <div>
            <User/>
         </div>
    </div>
}