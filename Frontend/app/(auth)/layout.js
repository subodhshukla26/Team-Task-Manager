import BrandPanel from "../components/auth/BrandPanel";
import { Users } from "lucide-react";

export const metadata = {
  title: "Team Task Manager — Auth",
};

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-(--color-surface-muted)">
      {/* Left branded panel (desktop only) */}
      <BrandPanel />

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* Mobile brand header */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-(--color-brand-bg) flex items-center justify-center">
              <Users size={20} className="text-white" />
            </div>
            <span className="font-bold text-lg text-(--color-text-primary)">
              Team Task Manager
            </span>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
