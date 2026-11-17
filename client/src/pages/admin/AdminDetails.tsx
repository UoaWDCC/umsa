import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

interface IPassword {
  currentPassword: string;
  newPassword: string;
}

export default function AdminDetails() {
  const params = useParams();
  const admin = params.adminEmail;
  const [passwordForm, setPasswordForm] = useState(false);
  const [message, setMessage] = useState("");
  // const [isError, setIsError] = useState(false)
  const showForm = () => {
    setPasswordForm(true);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPassword>();

  // requires at least 1 special character, digit and letter
  // mininmum length of 10 characters
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{10,}$/;

  const changePassword = async () => {
    return;
  };

  return (
    <>
      <div className="p-5 gap-5">
        <div>
          <h1 className="text-2xl">{admin} Details</h1>
        </div>

        <div>
          {!passwordForm && (
            <button onClick={showForm} className="hover:cursor-pointer">
              Change Password
            </button>
          )}

          {passwordForm && (
            <form
              className="flex flex-col gap-5 mt-10 "
              onSubmit={handleSubmit(changePassword)}
            >
              <input
                type="password"
                placeholder="Enter Current Password:"
                className="bg-accent1-primary p-3"
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
                className="bg-accent1-primary p-3"
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
          )}

          {message && (
            <p style={{ color: isError ? "red" : "green" }}>{message}</p>
          )}
        </div>
      </div>
    </>
  );
}
