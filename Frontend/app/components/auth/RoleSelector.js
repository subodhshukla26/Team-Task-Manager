"use client";

import { ShieldCheck, Users } from "lucide-react";

const ROLES = [
  {
    value: "admin",
    label: "Admin",
    description: "Manage and oversee team projects",
    Icon: ShieldCheck,
  },
  {
    value: "member",
    label: "Member",
    description: "Collaborate on team tasks",
    Icon: Users,
  },
];

/**
 * Role card selector — Admin | Member.
 * Props: value (string), onChange (fn)
 */
export default function RoleSelector({ value, onChange }) {
  return (
    <div className="space-y-1.5">
      <span className="block text-sm font-medium text-(--color-text-primary)">
        Select your role
      </span>
      <div className="grid grid-cols-2 gap-3">
        {ROLES.map(({ value: roleVal, label, description, Icon }) => {
          const selected = value === roleVal;
          return (
            <button
              key={roleVal}
              type="button"
              onClick={() => onChange(roleVal)}
              aria-pressed={selected}
              className={`flex flex-col items-start gap-2 p-4 rounded-xl border-2 text-left
                transition-all duration-150 cursor-pointer
                ${
                  selected
                    ? "border-(--color-primary) bg-(--color-primary-light)"
                    : "border-(--color-border) bg-white hover:border-(--color-primary)/40 hover:bg-(--color-primary-light)/30"
                }`}
            >
              <Icon
                size={20}
                className={
                  selected
                    ? "text-(--color-primary)"
                    : "text-(--color-text-secondary)"
                }
              />
              <div>
                <p
                  className={`font-semibold text-sm ${
                    selected
                      ? "text-(--color-primary-dark)"
                      : "text-(--color-text-primary)"
                  }`}
                >
                  {label}
                </p>
                <p className="text-xs text-(--color-text-secondary) leading-snug mt-0.5">
                  {description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
