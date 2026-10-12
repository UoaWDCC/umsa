import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate, useNavigate } from "react-router-dom";
import { loginSchema, type LoginValues } from "../../schemas/auth";
import { useLogin, useMe } from "../../hooks/useAuth";
import { apiErrorMessage } from "../../lib/api";

export default function Login() {
  const { data: me, isPending } = useMe();
  const login = useLogin();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-950 grid place-items-center text-gray-400">
        Checking login…
      </div>
    );
  }

  if (me) {
    return <Navigate to="/admin" replace />;
  }

  const onSubmit = handleSubmit((values) =>
    login.mutate(values, { onSuccess: () => navigate("/admin") }),
  );

  return (
    <div className="min-h-screen bg-gray-950 grid place-items-center px-4">
      <form onSubmit={onSubmit} className="w-full max-w-md flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-white text-center mb-4">UMSA Admin</h1>

        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          autoComplete="email"
          className="bg-transparent border-2 rounded-2xl px-6 py-4 text-white placeholder-gray-400 outline-none focus:border-blue-300 transition"
        />
        {errors.email && <p className="text-red-400 text-sm px-2">{errors.email.message}</p>}

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          className="bg-transparent border-2 rounded-2xl px-6 py-4 text-white placeholder-gray-400 outline-none focus:border-blue-300 transition"
        />
        {errors.password && (
          <p className="text-red-400 text-sm px-2">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={login.isPending}
          className="bg-blue-300 text-black font-bold py-3 px-6 rounded-full hover:bg-blue-400 transition disabled:opacity-50"
        >
          {login.isPending ? "Logging in…" : "Log in"}
        </button>

        {login.isError && (
          <p className="text-red-400 text-center">{apiErrorMessage(login.error)}</p>
        )}
      </form>
    </div>
  );
}
