"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

/**
 * Reusable password input with show/hide toggle.
 * Props: id, name, label, value, onChange, error, placeholder
 */
export default function PasswordInput({
  id,
  name,
  label,
  value,
  onChange,
  error,
  placeholder = "Enter password",
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-(--color-text-primary)"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={name === "password" ? "current-password" : "new-password"}
          className={`w-full px-4 py-2.5 pr-11 rounded-lg border text-sm
            text-(--color-text-primary) bg-white
            placeholder:text-(--color-text-secondary)
            outline-none transition-all duration-150
            focus:ring-2 focus:ring-(--color-primary)/30 focus:border-(--color-primary)
            ${
              error
                ? "border-(--color-error) focus:ring-(--color-error)/30 focus:border-(--color-error)"
                : "border-(--color-border)"
            }`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-(--color-text-secondary)
            hover:text-(--color-text-primary) transition-colors cursor-pointer"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>
      {error && (
        <p
          id={`${id}-error`}
          className="text-xs text-(--color-error)"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
