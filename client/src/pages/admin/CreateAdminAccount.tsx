import { useForm } from 'react-hook-form';

interface ICreateAdmin {
    email: string;
    password: string;
}

export default function CreateAdminAccount() {

    const {
        // register, 
        handleSubmit,
        // reset,
        // formState: { errors }
    } = useForm<ICreateAdmin>();

    const createAdmin =  (data: ICreateAdmin) => {
        console.log(data)
    }

    return (
        <>
     <div className="max-w-2xl mx-auto ">
        <h1 className="text-2xl font-bold mb-5">Terrence :D :O :P</h1>

        <form onSubmit={handleSubmit(createAdmin)} className="flex flex-col gap-3">
            <label htmlFor="email">Email</label>
            <div>
            <input
                type="text"
                id="email"
                name="Email:"
                placeholder="Email: "
                className="px-4 py-3 rounded-lg text-xl bg-gray-700"
            />
            </div>

            <label htmlFor="password">Password</label>
            <div>
            <input 
                type="text"
                placeholder="Password: "
                className="px-4 py-3 rounded-lg text-xl bg-gray-700"
                />
            </div>

            <button className="px-4 py-3 text-xl rounded-lg bg-gray-700">
                Submit
            </button>

        </form>
    </div>
        
        </>
    )
}