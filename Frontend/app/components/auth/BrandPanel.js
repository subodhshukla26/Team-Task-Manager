"use client";

import { Users, CheckCircle2 } from "lucide-react";

const features = [
  "Role-based access for Admins & Members",
  "Real-time task tracking & updates",
  "Collaborate across projects effortlessly",
];

export default function BrandPanel() {
  return (
    <div className="hidden lg:flex lg:w-2/5 flex-col items-center justify-center bg-(--color-brand-bg) relative overflow-hidden min-h-screen">
      {/* Decorative circles */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white/5" />
      <div className="absolute -bottom-28 -right-28 w-96 h-96 rounded-full bg-white/5" />
      <div className="absolute top-1/2 -right-16 w-52 h-52 rounded-full bg-(--color-primary)/20" />
      <div className="absolute top-16 right-12 w-20 h-20 rounded-full bg-(--color-primary)/10" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-12 space-y-8 max-w-xs">
        {/* Logo mark */}
        <div className="w-20 h-20 rounded-2xl bg-(--color-primary) flex items-center justify-center shadow-xl">
          <Users size={38} className="text-white" />
        </div>

        {/* Brand name & tagline */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Team Task Manager
          </h1>
          <p className="text-(--color-primary-light) text-base font-medium">
            Organize. Collaborate. Deliver.
          </p>
        </div>

        <p className="text-white/60 text-sm leading-relaxed">
          Your team&apos;s productivity hub — manage projects, assign tasks,
          and track progress in real time.
        </p>

        {/* Feature bullets */}
        <div className="space-y-3 w-full text-left">
          {features.map((f) => (
            <div
              key={f}
              className="flex items-start gap-3 bg-white/10 rounded-xl px-4 py-3"
            >
              <CheckCircle2
                size={16}
                className="text-(--color-primary-light) shrink-0 mt-0.5"
              />
              <span className="text-white/80 text-sm leading-snug">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
