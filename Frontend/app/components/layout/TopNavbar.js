"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, BellDotIcon, CircleUserRound, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const PAGE_TITLES = {
  "/dashboard": "Dashboard",
  "/projects": "Projects",
  "/tasks": "Tasks",
  "/team": "Team",
};

function RoleBadge({ role }) {
  if (!role) return null;
  const isAdmin = role === "admin";
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide
        ${
          isAdmin
            ? "bg-(--color-primary-light) text-(--color-primary-dark)"
            : "bg-emerald-50 text-emerald-700"
        }`}
    >
      {role}
    </span>
  );
}

export default function TopNavbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const pageTitle =
    Object.entries(PAGE_TITLES).find(([path]) =>
      pathname === path || pathname.startsWith(path + "/")
    )?.[1] ?? "App";

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    router.push("/login");
  };

  const displayName = user?.name ?? "User";
  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="flex items-center justify-between h-16 px-5 bg-white border-b border-(--color-border) shrink-0">
      {/* Left: Hamburger (mobile) + Page title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-(--color-text-secondary)
            hover:bg-(--color-surface-muted) hover:text-(--color-text-primary)
            transition-colors cursor-pointer"
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-(--color-text-primary) tracking-tight">
          {pageTitle}
        </h1>
      </div>

      {/* Right: Notifications + Role badge + User menu */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button
          className="relative p-2 rounded-lg text-(--color-text-secondary)
            hover:bg-(--color-surface-muted) hover:text-(--color-text-primary)
            transition-colors cursor-pointer"
          aria-label="Notifications"
        >
          <BellDotIcon size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-(--color-primary)" />
        </button>

        {/* Role badge */}
        <RoleBadge role={user?.role} />

        {/* User avatar + dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((o) => !o)}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg
              hover:bg-(--color-surface-muted) transition-colors cursor-pointer"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            {/* Avatar circle */}
            <div
              className="w-8 h-8 rounded-full bg-(--color-primary) flex items-center justify-center
                text-white text-xs font-bold select-none shrink-0"
            >
              {initials || <CircleUserRound size={18} />}
            </div>
            <span className="hidden sm:block text-sm font-medium text-(--color-text-primary) max-w-28 truncate">
              {displayName}
            </span>
            <ChevronDown
              size={14}
              className={`text-(--color-text-secondary) transition-transform duration-150
                ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-20"
                onClick={() => setDropdownOpen(false)}
              />
              <div
                className="absolute right-0 top-11 z-30 w-52 bg-white rounded-xl
                  shadow-lg border border-(--color-border) py-1.5 overflow-hidden"
              >
                {/* User info */}
                <div className="px-4 py-3 border-b border-(--color-border)">
                  <p className="text-sm font-semibold text-(--color-text-primary) truncate">
                    {displayName}
                  </p>
                  <p className="text-xs text-(--color-text-secondary) truncate mt-0.5">
                    {user?.email ?? ""}
                  </p>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm
                    text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <LogOut size={15} />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
