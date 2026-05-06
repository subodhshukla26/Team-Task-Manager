"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboardIcon,
  FolderIcon,
  ListTodo,
  UsersIcon,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Users,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
  { href: "/projects", label: "Projects", icon: FolderIcon },
  { href: "/tasks", label: "Tasks", icon: ListTodo },
  { href: "/team", label: "Team", icon: UsersIcon },
];

export default function Sidebar({ collapsed, onToggle, onClose }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <aside
      className={`flex flex-col h-full bg-(--color-brand-bg) transition-all duration-300 ease-in-out
        ${collapsed ? "w-16" : "w-60"}`}
    >
      {/* Logo */}
      <div
        className={`flex items-center h-16 shrink-0 border-b border-white/10
          ${collapsed ? "justify-center px-0" : "gap-3 px-5"}`}
      >
        <div className="w-8 h-8 rounded-lg bg-(--color-primary) flex items-center justify-center shrink-0">
          <Users size={17} className="text-white" />
        </div>
        {!collapsed && (
          <span className="text-white font-bold text-sm leading-tight whitespace-nowrap overflow-hidden">
            Task Manager
          </span>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive =
            pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium
                transition-all duration-150 group relative
                ${
                  isActive
                    ? "bg-(--color-primary) text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }
                ${collapsed ? "justify-center" : ""}`}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span className="truncate">{label}</span>}
              {/* Tooltip when collapsed */}
              {collapsed && (
                <span
                  className="absolute left-14 z-50 bg-(--color-brand-bg-dark) text-white text-xs
                    px-2.5 py-1.5 rounded-md whitespace-nowrap opacity-0 pointer-events-none
                    group-hover:opacity-100 transition-opacity duration-150 shadow-lg border border-white/10"
                >
                  {label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: Logout + Collapse toggle */}
      <div className="px-2 py-3 border-t border-white/10 space-y-0.5">
        {/* Logout */}
        <button
          onClick={handleLogout}
          title={collapsed ? "Logout" : undefined}
          className={`flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium
            text-white/70 hover:bg-red-500/20 hover:text-red-400 transition-all duration-150
            group relative cursor-pointer
            ${collapsed ? "justify-center" : ""}`}
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span>Logout</span>}
          {collapsed && (
            <span
              className="absolute left-14 z-50 bg-(--color-brand-bg-dark) text-white text-xs
                px-2.5 py-1.5 rounded-md whitespace-nowrap opacity-0 pointer-events-none
                group-hover:opacity-100 transition-opacity duration-150 shadow-lg border border-white/10"
            >
              Logout
            </span>
          )}
        </button>

        {/* Collapse toggle (desktop) */}
        <button
          onClick={onToggle}
          className={`hidden lg:flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm
            font-medium text-white/50 hover:bg-white/10 hover:text-white
            transition-all duration-150 cursor-pointer
            ${collapsed ? "justify-center" : ""}`}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight size={17} className="shrink-0" />
          ) : (
            <>
              <ChevronLeft size={17} className="shrink-0" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
