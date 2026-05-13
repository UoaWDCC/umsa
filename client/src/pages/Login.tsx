export default function Login(){
    return(
        <>
        <h1 className="text-3xl font-bold mb-8">Login</h1>
        <div className="flex flex-col gap-4 w-1/2 mx-auto">
        <p>Username</p>
        <input className="border border-gray-300 rounded py-2 px-4"
            placeholder="Enter username"
            type="text"
        />
        <p>Password</p>
        <input className="border border-gray-300 rounded py-2 px-4"
            placeholder="Enter password"
            type="password"
        />
        <button className="bg-blue-500 text-white rounded py-2 px-4 mt-4 cursor-pointer">
            Login
        </button>
        </div>
        </>
    )
}