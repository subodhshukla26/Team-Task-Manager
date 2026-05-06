"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import PasswordInput from "./PasswordInput";
import RoleSelector from "./RoleSelector";

const INITIAL_FIELDS = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "member",
};

function validate({ name, email, password, confirmPassword }) {
  const errors = {};
  if (!name.trim()) errors.name = "All fields are required.";
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
  if (!confirmPassword) {
    errors.confirmPassword = "All fields are required.";
  } else if (confirmPassword !== password) {
    errors.confirmPassword = "Passwords do not match.";
  }
  return errors;
}

export default function SignupForm() {
  const router = useRouter();
  const { signup } = useAuth();
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message }
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
    if (status) setStatus(null);
  };

  const handleRoleChange = (role) => {
    setFields((prev) => ({ ...prev, role }));
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
      await signup(fields.name, fields.email, fields.password, fields.role);
      setStatus({
        type: "success",
        message: "Account created! Please sign in.",
      });
      setTimeout(() => router.push("/login"), 1500);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-(--color-border) p-8 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-(--color-text-primary) tracking-tight">
          Create your account
        </h2>
        <p className="text-sm text-(--color-text-secondary)">
          Join your team today
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
        {/* Full Name */}
        <div className="space-y-1.5">
          <label
            htmlFor="signup-name"
            className="block text-sm font-medium text-(--color-text-primary)"
          >
            Full Name
          </label>
          <div className="relative">
            <User
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-secondary) pointer-events-none"
            />
            <input
              id="signup-name"
              name="name"
              type="text"
              value={fields.name}
              onChange={handleChange}
              placeholder="Jane Smith"
              autoComplete="name"
              className={`w-full pl-9 pr-4 py-2.5 rounded-lg border text-sm
                text-(--color-text-primary) bg-white
                placeholder:text-(--color-text-secondary)
                outline-none transition-all duration-150
                focus:ring-2 focus:ring-(--color-primary)/30 focus:border-(--color-primary)
                ${
                  errors.name
                    ? "border-(--color-error) focus:ring-(--color-error)/30 focus:border-(--color-error)"
                    : "border-(--color-border)"
                }`}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "signup-name-error" : undefined}
            />
          </div>
          {errors.name && (
            <p
              id="signup-name-error"
              className="text-xs text-(--color-error)"
              role="alert"
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label
            htmlFor="signup-email"
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
              id="signup-email"
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
              aria-describedby={errors.email ? "signup-email-error" : undefined}
            />
          </div>
          {errors.email && (
            <p
              id="signup-email-error"
              className="text-xs text-(--color-error)"
              role="alert"
            >
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <PasswordInput
          id="signup-password"
          name="password"
          label="Password"
          value={fields.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Min. 8 characters"
        />

        {/* Confirm Password */}
        <PasswordInput
          id="signup-confirm-password"
          name="confirmPassword"
          label="Confirm Password"
          value={fields.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          placeholder="Re-enter your password"
        />

        {/* Role Selector */}
        <RoleSelector value={fields.role} onChange={handleRoleChange} />

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 px-4 rounded-lg bg-(--color-primary) hover:bg-(--color-primary-dark)
            text-white font-semibold text-sm transition-colors duration-150
            disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer mt-2"
        >
          {isLoading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      {/* Footer link */}
      <p className="text-center text-sm text-(--color-text-secondary)">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-(--color-primary) hover:text-(--color-primary-dark) font-semibold transition-colors"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
