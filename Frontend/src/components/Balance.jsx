import axios from "axios";
import { useEffect, useState } from "react";

export const Balance = () => {
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/accounts/balance", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                setBalance(response.data.balance);
            } catch (error) {
                console.error("Error fetching balance:", error);
                // Handle error as needed (e.g., show error message)
            }
        };

        fetchBalance();
    }, []);

    return (
        <div className="font-bold flex gap-2 p-3">
            <p>Your Balance is</p>
            <p>
                Rs {balance !== null ? balance : "Loading..."}
            </p>
        </div>
    );
};
