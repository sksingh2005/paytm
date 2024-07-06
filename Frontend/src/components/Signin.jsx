import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username,
                password
            });
            localStorage.setItem("username",username);
            localStorage.setItem("token", response.data.token);

            // Navigate to dashboard upon successful sign-in
            navigate('/dashboard');
        } catch (error) {
            console.error("Error signing in:", error);
            // Optionally handle specific errors (e.g., display error message to the user)
        }
    };

    return (
        <div className="h-screen bg-gray-300 flex items-center">
            <div className="bg-white h-[75%] w-[25%] m-auto rounded pt-2">
                <div className="flex flex-col justify-center px-4 text-center pt-5">
                    <p className="font-bold text-2xl pb-2">Sign In</p>
                    <p className="text-gray-300">Enter your account details</p>
                </div>
                <div className="pt-2 pl-5 font-semibold">
                    <p>Email</p>
                    <input
                        type="email"
                        placeholder="example@gmail.com"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border rounded border-slate-500 pb-1 pt-1 w-[90%]"
                    />
                    <p className="pt-2">Password</p>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded border-slate-500 pb-1 pt-1 w-[90%]"
                    />
                </div>
                <div className="p-5">
                    <button
                        onClick={handleSignIn}
                        type="button"
                        className="text-white bg-gray-700 w-[95%] hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                    >
                        Sign In
                    </button>
                    <div className="flex">
                        <p className="pl-10">Don't have an account?</p>
                        <Link className="pointer underline pl-1 cursor-pointer" to="/signup">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
