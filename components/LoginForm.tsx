'use client';

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter} from "next/navigation";


export default function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        
        try {
            setLoading(true);

            const response = await fetch(`${process.env.API}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    email,password,
                })
            });
            const data = await response.json();
         
            if (!response.ok) {
                if (data.errors) {
                    if (data.errors.email) {
                        toast.error(data.errors.email.join(" "));
                    }
                    if (data.errors.password) {
                        toast.error(data.errors.password.join(" "));
                    }
                } else {
                    toast.error(data.message || "An error occurred. Please try again.");
                }
                setLoading(false);
                return;
            }
            
            sessionStorage.setItem("access_token", data.access_token);
            toast.success('Logged in successfully');
            router.push("/dashboard/user");
            setEmail("");
            setPassword("");

            
        } catch (error) {

            setLoading(false);
            console.log(error);
            toast.error("An unexpected error occurred. Please try again.");           
            
        }
    };


    return (
        <main>
            <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
                <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                    <h2 className="mb-4 text-center text-2xl font-semibold">Sign in</h2>

                    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" value={email}
                                onChange={(e)=> setEmail(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" value={password}
                                onChange={(e)=> setPassword(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter your password"
                                required
                            />
                        
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={loading || !email || !password}>
                        {loading ? 'Please wait...' : 'Submit'}
                        </button>
                    </form>

                </div>

            </div>
        </main>
    );
    

}