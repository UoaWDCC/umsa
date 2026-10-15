import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { loginSchema, type LoginValues } from "../../schemas/auth";
import { useLogin, useMe } from "../../hooks/useAuth";
import { apiErrorMessage } from "../../lib/api";
import logo from "../../assets/brand/umsa-logo.png";

const INPUT =
  "w-full rounded-lg border border-gray-150 bg-white px-3 py-2.5 text-sm outline-none " +
  "transition-colors focus:border-accent1-primary focus:ring-2 focus:ring-blue-100";

const LABEL = "mb-1.5 block text-xs font-semibold tracking-wide text-foreground-secondary uppercase";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { data: me } = useMe();
  const login = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  if (me) return <Navigate to="/admin" replace />;

  const onSubmit = handleSubmit((values) =>
    login.mutate(values, { onSuccess: () => navigate("/admin", { replace: true }) }),
  );

  return (
    <div className="paper grid min-h-screen place-items-center px-6">
      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm space-y-4 rounded-2xl border border-gray-150 bg-white p-8
          shadow-[0_18px_40px_rgba(39,39,220,0.08)]"
      >
        <div className="text-center">
          <img src={logo} alt="" className="mx-auto h-16 w-16 object-contain" />
          <h1 className="mt-3 font-heading text-xl text-accent1-primary">UMSA Admin</h1>
          <p className="mt-1 text-xs text-foreground-tertiary">
            Sign in to edit the site&apos;s content
          </p>
        </div>

        <label className="block">
          <span className={LABEL}>Email</span>
          <input {...register("email")} type="email" className={INPUT} />
          {errors.email && (
            <p className="mt-1 text-xs text-accent2-primary">{errors.email.message}</p>
          )}
        </label>

        <label className="block">
          <span className={LABEL}>Password</span>
          <input {...register("password")} type="password" className={INPUT} />
          {errors.password && (
            <p className="mt-1 text-xs text-accent2-primary">{errors.password.message}</p>
          )}
        </label>

        <button
          type="submit"
          disabled={login.isPending}
          className="w-full rounded-full bg-accent1-primary py-3 text-xs font-semibold
            tracking-wide text-white uppercase transition-colors hover:bg-blue-400
            disabled:opacity-50"
        >
          {login.isPending ? "Logging in…" : "Log in"}
        </button>

        {login.isError && (
          <p className="text-center text-sm text-accent2-primary">
            {apiErrorMessage(login.error)}
          </p>
        )}


      </motion.form>
    </div>
  );
}
