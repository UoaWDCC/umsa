import { useState } from "react";
import { useForm } from "react-hook-form";

interface IPassword {
  currentPassword: string;
  newPassword: string;
}

export default function AdminPasswordForm() {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPassword>();

  // requires at least 1 special character, digit and letter
  // mininmum length of 10 characters
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{10,}$/;

  const changePassword = async (data: IPassword) => {
    // note to self: set up api route like this so in future
    // other things can be changed using same router e.g. email
    const response = await fetch("/api/admin/auth/password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      }),
    });

    const body = await response.json();

    if (!response.ok) {
      setIsError(true);
      setMessage(body.error.message);
    } else {
      setIsError(false);
      setMessage(body.message);
    }
  };

  return (
    <>
      <form
        className="flex flex-col gap-5 mt-10 "
        onSubmit={handleSubmit(changePassword)}
      >
        <p>
          Enter your current password and the password you want to change it to
        </p>
        <p>
          Requirements: At least 1 letter, digit and special character and at
          least 10 characters
        </p>
        <input
          type="password"
          placeholder="Enter Current Password:"
          className="bg-accent1-primary p-3 border-2"
          {...register("currentPassword", {
            required: "The current password is required",
            pattern: {
              value: passwordRegex,
              message: "Invalid password format",
            },
            // old server message is stale once the password changes
            onChange: () => setMessage(""),
          })}
          style={{
            borderColor: errors.currentPassword ? "red" : "initial",
          }}
        />
        <input
          type="password"
          placeholder="Enter New Password:"
          className="bg-accent1-primary p-3 border-2"
          {...register("newPassword", {
            required: "A new password is required",
            pattern: {
              value: passwordRegex,
              message: "Invalid password format",
            },
            // old server message is stale once the password changes
            onChange: () => setMessage(""),
          })}
          style={{
            borderColor: errors.newPassword ? "red" : "initial",
          }}
        />
        <button className="bg-accent1-primary p-4 hover:cursor-pointer">
          Submit
        </button>
      </form>

      {message && <p style={{ color: isError ? "red" : "green" }}>{message}</p>}
    </>
  );
}
