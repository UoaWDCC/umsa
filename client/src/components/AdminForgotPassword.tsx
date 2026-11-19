import { useForm } from "react-hook-form";
import { useForgotPassword } from "../hooks/useAuth";
import { apiErrorMessage } from "../lib/api";

interface IResetPassword {
  email: string;
}

export default function AdminForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPassword>();
  const password = useForgotPassword();
  return (
    <>
      <form
        className="mt-10 flex flex-col gap-5"
        onSubmit={handleSubmit((values) =>
          password.mutate({ to: values.email }),
        )}
      >
        <p>Enter your email to reset your password</p>
        <input
          type="text"
          placeholder="Email:"
          className="bg-accent1-primary p-3 border-2"
          {...register("email", {
            required:
              "To reset your password, please enter the email associated with the account.",
          })}
        />
        <button className="bg-accent1-primary p-3">Submit</button>
        {password.isPending && <p>Sending...</p>}
        {password.isSuccess && <p>{password.data.message}</p>}
        {password.isError && <p>{apiErrorMessage(password.error)}</p>}
        {errors.email && <p>{errors.email.message}</p>}
      </form>
    </>
  );
}
