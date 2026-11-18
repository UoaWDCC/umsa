import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useResetPassword } from "../../hooks/useAuth";
import { apiErrorMessage } from "../../lib/api";

interface INewPassword {
  newPassword: string;
}

// same rules as change password and create admin account:
// at least 1 letter, digit and special character, minimum 10 characters
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{10,}$/;

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewPassword>();

  const resetPassword = useResetPassword();
  const navigate = useNavigate();

  // the token comes from the reset email link (?token=...)
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token") ?? "";

  return (
    <form
      onSubmit={handleSubmit((values) =>
        resetPassword.mutate(
          { token, newPassword: values.newPassword },
          // password changed, send them to log in with it
          { onSuccess: () => navigate("/admin/login") },
        ),
      )}
    >
      <p>
        Requirements: At least 1 letter, digit and special character and at
        least 10 characters
      </p>
      <input
        type="password"
        placeholder="New Password:"
        className="bg-accent1-primary px-4 py-3"
        {...register("newPassword", {
          required: "A new password is required",
          pattern: {
            value: passwordRegex,
            message: "Invalid password format",
          },
        })}
      />
      <button
        disabled={resetPassword.isPending}
        className="bg-accent1-primary p-4 py-3 mx-5"
      >
        {resetPassword.isPending ? "Saving..." : "Submit"}
      </button>

      {errors.newPassword && <p>{errors.newPassword.message}</p>}
      {resetPassword.isError && <p>{apiErrorMessage(resetPassword.error)}</p>}
      {resetPassword.isSuccess && <p>{resetPassword.data.message}</p>}
    </form>
  );
}
