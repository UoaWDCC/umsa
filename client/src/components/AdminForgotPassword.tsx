import { useForm } from "react-hook-form";
import { useState } from "react";

interface IResetPassword {
  email: string;
}

export default function AdminForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPassword>();
  const [message, setMessage] = useState("");
  //   const sendEmail = async () => {
  //     const response = fetch("/a");
  //   };
  return (
    <>
      <form
        className="mt-10 flex flex-col gap-5"
        onSubmit={handleSubmit(() => setMessage("Sent!"))}
      >
        <p>Enter your email to reset your password</p>
        <input
          type="text"
          placeholder="Email:"
          className="bg-accent1-primary p-3 border-2"
          {...register("email", {
            required:
              "To reset your password, please enter the email associated with the account.",
            // old server message is stale once the email changes
            onChange: () => setMessage(""),
          })}
        />
        <button className="bg-accent1-primary p-3">Submit</button>
        {message && <p>{message}</p>}
        {errors && <p>{errors.email?.message}</p>}
      </form>
    </>
  );
}
