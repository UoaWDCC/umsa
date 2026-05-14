import { useEffect, useState } from "react";


export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
    console.log("Username:", username);
    console.log("Password:", password);
    }
    
    useEffect(() => {
            document.title = "Login | UMSA";
            }, []);

    return(
        <>
        <h1 className="text-3xl font-bold mb-8">Login</h1>
        <div className="flex flex-col gap-4 w-1/2 mx-auto">
        <p>Username</p>
        <input className="border border-gray-300 rounded py-2 px-4"
            placeholder="Enter username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <p>Password</p>
        <input className="border border-gray-300 rounded py-2 px-4"
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white rounded py-2 px-4 mt-4 cursor-pointer" onClick={handleLogin}>
            Login
        </button>
        </div>
        {/* DELETE INPUT TEST LATER */}
        <p className="text-yellow-300">INPUT TEST : {username} - {password}</p>
        </>
    )
}