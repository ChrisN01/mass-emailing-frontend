'use client';
import { useState } from 'react';
import toast from "react-hot-toast";
import Textarea from '@/components/Textarea';
import { useRouter} from "next/navigation";



export default function Dashboard() {
    const [message, setMessage] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
     const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        if (!file) {
            alert("Please upload a file.");
            setLoading(false);
            return;
        }
        const formData = new FormData();
        formData.append("file", file);
        formData.append("message", message);

        const accessToken = sessionStorage.getItem("access_token");


        const response = await fetch(`${process.env.API}/upload-csv`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: formData,

        });

        if (!response.ok) {
            const errorData = await response.json();
            if (errorData.errors) {
                if (errorData.errors.message) {
                    toast.error(errorData.errors.message.join(" "));
                }
                if (errorData.errors.file) {
                    toast.error(errorData.errors.file.join(" "));
                }
            } else {
                toast.error(errorData.message || "An error occurred. Please try again.");
            }
            setLoading(false);
            return;
        }

        toast.success('File uploaded successfully');
        router.push("/dashboard/user");
        setMessage("");
        setFile(null);
        

        //TODO: If the text change, we need to update the state

        //TODO: ADD button to cancel the upload
    };

    
    return (
        <main>
        <div className="flex min-h-screen justify-center bg-gray-100 p-4">
            <div className="w-full max-w-2xl h-full max-h-9/10 my-8 rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-center text-2xl font-semibold">Upload file</h2>

                <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>
                   <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here..." />

                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700">File</label>
                        <input type="file"
                        className="w-full text-slate-500 font-medium text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
                        accept=".csv"
                        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                        required
                        />
                                                
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">CSV (MAX. 2MB).</p>


                    </div>

                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={loading || !message || !file}>
                    {loading ? 'Please wait...' : 'Submit'}
                    </button>
                </form>

            </div>

        </div>
        </main>
    );
}