import { useForm } from "react-hook-form";
import { useState } from "react";

interface IResetPassword {
  email: string;
}

export default function AdminForgotPassword() {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<IResetPassword>();
  return (
    <>
      <form
        onSubmit={handleSubmit(() => {
          console.log("hi");
        })}
        className="mt-5 flex flex-col gap-5"
      >
        <input
          type="text"
          placeholder="Email:"
          className="bg-accent1-primary p-3 border-2"
        />
        <button className="bg-accent1-primary p-3">Submit</button>
      </form>
    </>
  );
}
