"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import PasswordInput from "./PasswordInput";

const INITIAL_FIELDS = { email: "", password: "" };

function validate({ email, password }) {
  const errors = {};
  if (!email) {
    errors.email = "All fields are required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!password) {
    errors.password = "All fields are required.";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }
  return errors;
}

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message }
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
    if (status) setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setIsLoading(true);
    setStatus(null);

    try {
      await login(fields.email, fields.password);
      setStatus({ type: "success", message: "Login successful! Redirecting..." });
      setTimeout(() => router.push("/dashboard"), 1200);
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-(--color-border) p-8 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-(--color-text-primary) tracking-tight">
          Welcome back
        </h2>
        <p className="text-sm text-(--color-text-secondary)">
          Sign in to your account
        </p>
      </div>

      {/* Status banner */}
      {status && (
        <div
          role="alert"
          className={`flex items-center gap-2.5 rounded-lg px-4 py-3 text-sm font-medium
            ${
              status.type === "success"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
        >
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Email */}
        <div className="space-y-1.5">
          <label
            htmlFor="login-email"
            className="block text-sm font-medium text-(--color-text-primary)"
          >
            Email address
          </label>
          <div className="relative">
            <Mail
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-secondary) pointer-events-none"
            />
            <input
              id="login-email"
              name="email"
              type="email"
              value={fields.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              className={`w-full pl-9 pr-4 py-2.5 rounded-lg border text-sm
                text-(--color-text-primary) bg-white
                placeholder:text-(--color-text-secondary)
                outline-none transition-all duration-150
                focus:ring-2 focus:ring-(--color-primary)/30 focus:border-(--color-primary)
                ${
                  errors.email
                    ? "border-(--color-error) focus:ring-(--color-error)/30 focus:border-(--color-error)"
                    : "border-(--color-border)"
                }`}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "login-email-error" : undefined}
            />
          </div>
          {errors.email && (
            <p
              id="login-email-error"
              className="text-xs text-(--color-error)"
              role="alert"
            >
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <PasswordInput
          id="login-password"
          name="password"
          label="Password"
          value={fields.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Enter your password"
        />

        {/* Remember me + Forgot password */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded cursor-pointer accent-[#4682B4]"
            />
            <span className="text-sm text-(--color-text-secondary)">
              Remember me
            </span>
          </label>
          <a
            href="#"
            className="text-sm text-(--color-primary) hover:text-(--color-primary-dark) font-medium transition-colors"
          >
            Forgot password?
          </a>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 px-4 rounded-lg bg-(--color-primary) hover:bg-(--color-primary-dark)
            text-white font-semibold text-sm transition-colors duration-150
            disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer mt-2"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* Footer link */}
      <p className="text-center text-sm text-(--color-text-secondary)">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="text-(--color-primary) hover:text-(--color-primary-dark) font-semibold transition-colors"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
