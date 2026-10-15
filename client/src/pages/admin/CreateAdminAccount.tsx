import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ICreateAdmin {
    email: string;
    password: string;
}

export default function CreateAdminAccount() {
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(true);

    const {
        // register, 
        handleSubmit,
        // reset,
        // formState: { errors }
    } = useForm<ICreateAdmin>();

    // change LATER
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);

            if (value === '' || passwordRegex.test(value)) {
                setIsValid(true);
            } 
            else {
                setIsValid(false);
            }
    }

    // requires at least 1 special character, digit and letter
    // mininmum length of 10 characters
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{10,}$/;


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
                type="text" value={password}
                placeholder="Password: "
                className="px-4 py-3 rounded-lg text-xl bg-gray-700"
                onChange={handlePasswordChange}
                style={{borderColor: isValid ? 'initial' : 'red'}}
                />
            </div>
            <p>Live preview: {password}</p>
            {!isValid && <p style={{ color: 'red' }}>Please enter a valid Password.</p>}

            <button className="px-4 py-3 text-xl rounded-lg bg-gray-700">
                Submit
            </button>

        </form>
    </div>
        
        </>
    )
}