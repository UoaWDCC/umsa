import { useState } from "react";
import { useForm } from "react-hook-form";

interface ICreateAdmin {
  password: string;
}

export default function CreateAdminAccount() {
  // requires at least 1 special character, digit and letter
  // mininmum length of 10 characters
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{10,}$/;

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<ICreateAdmin>();

  const params = new URLSearchParams(window.location.search);
  const rawToken = params.get("token");

  // feedback shown under the form after submitting
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const createAdmin = async (data: ICreateAdmin) => {
    try {
      const response = await fetch("/api/invite/accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawToken, password: data.password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      setIsError(false);
      setMessage("Account created! You can now log in.");
    } catch (error) {
      setIsError(true);
      setMessage(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto ">
        <h1 className="text-2xl font-bold mb-5">Set a Password:</h1>
        <h2 className="text-xl mb-5">
          Requirements: At least 1 letter, digit and special character and at
          least 10 characters
        </h2>

        <form
          onSubmit={handleSubmit(createAdmin)}
          className="flex flex-col gap-3"
        >
          <div>
            <input
              type="password"
              placeholder="Password: "
              className="px-4 py-3 rounded-lg text-xl bg-gray-700"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: passwordRegex,
                  message: "Invalid password format",
                },
                // old server message is stale once the password changes
                onChange: () => setMessage(""),
              })}
              style={{ borderColor: errors.password ? "red" : "initial" }}
            />
          </div>

          {errors.password && (
            <p style={{ color: "red" }}>Please enter a valid Password.</p>
          )}

          <button className="px-4 py-3 text-xl rounded-lg bg-gray-700">
            Submit
          </button>

          {message && (
            <p style={{ color: isError ? "red" : "green" }}>{message}</p>
          )}
        </form>
      </div>
    </>
  );
}
