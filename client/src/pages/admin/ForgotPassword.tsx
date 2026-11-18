import { useForm } from "react-hook-form";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form>
      <input
        type="password"
        placeholder="New Password:"
        className="bg-accent1-primary px-4 py-3"
      />
      <button className="bg-accent1-primary p-4 py-3 mx-5">Submit</button>
    </form>
  );
}
