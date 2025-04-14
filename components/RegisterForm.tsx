'use client';

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function RegisterForm() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ email?: string[] }>({});

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        
        try {
            setLoading(true);

            const response = await fetch(`${process.env.API}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    name,email,password,
                })
            });
            const data = await response.json();
            //TODO: handle errors properly
            if (data.errors?.email) {
                setErrors(data.errors);
                toast.error(data.errors.email.join(" "));
            }
            else{
                toast.success('Registration successful!');
                setName("");
                setEmail("");
                setPassword("");
                router.push("/login");
            }



            
        } catch (error) {

            setLoading(false);
            console.log('ERROR: ',error);
            
        }
    };


    return (
        <main>
            <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
                <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                    <h2 className="mb-4 text-center text-2xl font-semibold">Sign up</h2>

                    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input type="name" value={name}
                                onChange={(e)=> setName(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
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