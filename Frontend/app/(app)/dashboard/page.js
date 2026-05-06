"use client";

import { useEffect, useState } from "react";
import {
  Folders,
  ListTodo,
  CircleCheck,
  Clock,
  AlertTriangle,
  Activity,
  CalendarClock,
  Calendar,
} from "lucide-react";
import { apiRequest } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import StatCard from "../../components/dashboard/StatCard";

const STATUS_STYLES = {
  TODO: { bg: "bg-slate-100", text: "text-slate-700", label: "To Do" },
  IN_PROGRESS: { bg: "bg-blue-100", text: "text-blue-700", label: "In Progress" },
  DONE: { bg: "bg-emerald-100", text: "text-emerald-700", label: "Done" },
};

function formatDate(dateStr) {
  if (!dateStr) return "No date";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function daysUntil(dateStr) {
  if (!dateStr) return "No due date";
  const due = new Date(dateStr);
  if (Number.isNaN(due.getTime())) return "No due date";
  const diff = due - new Date();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Due today";
  if (days === 1) return "Due tomorrow";
  return `Due in ${days} days`;
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="w-8 h-8 rounded-lg bg-[var(--color-border)] animate-pulse shrink-0" />
      <div className="flex-1 space-y-1.5">
        <div className="h-3 w-3/4 bg-[var(--color-border)] rounded animate-pulse" />
        <div className="h-2.5 w-1/2 bg-[var(--color-border)] rounded animate-pulse" />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await apiRequest("/dashboard");
        setData(res);
      } catch (err) {
        setError(err?.message || String(err));
      } finally {
        setIsLoading(false);
      }
    }
    fetchStats();
  }, []);

  const completionRate =
    data?.totalTasks > 0
      ? Math.round((data.completedTasks / data.totalTasks) * 100)
      : 0;

  const statCards = [
    {
      label: "Total Projects",
      value: data?.totalProjects,
      icon: <Folders size={20} />,
      accentBg: "bg-[var(--color-primary-light)]",
      accentText: "text-[var(--color-primary)]",
    },
    {
      label: "Total Tasks",
      value: data?.totalTasks,
      icon: <ListTodo size={20} />,
      accentBg: "bg-slate-100",
      accentText: "text-slate-600",
    },
    {
      label: "Completed",
      value: data?.completedTasks,
      icon: <CircleCheck size={20} />,
      accentBg: "bg-emerald-50",
      accentText: "text-emerald-600",
    },
    {
      label: "Pending",
      value: data?.pendingTasks,
      icon: <Clock size={20} />,
      accentBg: "bg-amber-50",
      accentText: "text-amber-600",
    },
    {
      label: "Overdue",
      value: data?.overdueTasks,
      icon: <AlertTriangle size={20} />,
      accentBg: "bg-red-50",
      accentText: "text-red-500",
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
          Welcome back, {user?.name?.split(" ")[0] || "there"} 👋
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Here&apos;s what&apos;s happening with your team today.
        </p>
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700" aria-live="polite">
          Failed to load dashboard data: {error}
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} isLoading={isLoading} />
        ))}
      </div>

      {/* Completion progress bar */}
      <div className="bg-white rounded-xl border border-[var(--color-border)] p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-[var(--color-text-primary)]">
            Overall Task Completion
          </p>
          <span className="text-sm font-bold text-[var(--color-primary)]">
            {isLoading ? "—" : `${completionRate}%`}
          </span>
        </div>
        <div className="h-2.5 w-full bg-[var(--color-surface-muted)] rounded-full overflow-hidden">
          {!isLoading && (
            <div
              className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-700"
              style={{ width: `${completionRate}%` }}
            />
          )}
          {isLoading && (
            <div className="h-full w-1/3 bg-[var(--color-border)] rounded-full animate-pulse" />
          )}
        </div>
        {!isLoading && data && (
          <div className="flex gap-4 text-xs text-[var(--color-text-secondary)]">
            <span>
              <span className="font-semibold text-emerald-600">{data.completedTasks}</span> completed
            </span>
            <span>
              <span className="font-semibold text-amber-600">{data.pendingTasks}</span> pending
            </span>
            {data.overdueTasks > 0 && (
              <span>
                <span className="font-semibold text-red-500">{data.overdueTasks}</span> overdue
              </span>
            )}
          </div>
        )}
      </div>

      {/* Bottom two-column section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Recent Activity — 3/5 width */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-[var(--color-border)] shadow-xs">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[var(--color-border)]">
            <Activity size={16} className="text-[var(--color-primary)]" />
            <h3 className="text-sm font-bold text-[var(--color-text-primary)]">Recent Activity</h3>
          </div>
          <div className="px-5 py-2 divide-y divide-[var(--color-border)]">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)
            ) : !data?.recentTasks?.length ? (
              <p className="text-sm text-[var(--color-text-secondary)] py-8 text-center">
                No recent tasks found.
              </p>
            ) : (
              data.recentTasks.map((task) => {
                const s = STATUS_STYLES[task.status] ?? STATUS_STYLES.TODO;
                return (
                  <div key={task.id} className="flex items-center gap-3 py-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${s.bg}`}
                    >
                      <ListTodo size={15} className={s.text} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                        {task.title}
                      </p>
                      <p className="text-xs text-[var(--color-text-secondary)] truncate">
                        {task.project?.name ?? "No Project"}
                        {task.assignee?.name ? ` · ${task.assignee.name}` : ""}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${s.bg} ${s.text}`}
                    >
                      {s.label}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Upcoming Deadlines — 2/5 width */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[var(--color-border)] shadow-xs">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[var(--color-border)]">
            <CalendarClock size={16} className="text-[var(--color-primary)]" />
            <h3 className="text-sm font-bold text-[var(--color-text-primary)]">Upcoming Deadlines</h3>
          </div>
          <div className="px-5 py-2 divide-y divide-[var(--color-border)]">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} />)
            ) : !data?.upcomingDeadlines?.length ? (
              <p className="text-sm text-[var(--color-text-secondary)] py-8 text-center">
                No deadlines in the next 7 days.
              </p>
            ) : (
              data.upcomingDeadlines.map((task) => {
                const isToday =
                  new Date(task.dueDate).toDateString() === new Date().toDateString();
                return (
                  <div key={task.id} className="flex items-start gap-3 py-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                        ${isToday ? "bg-red-50" : "bg-amber-50"}`}
                    >
                      <Calendar
                        size={15}
                        className={isToday ? "text-red-500" : "text-amber-600"}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                        {task.title}
                      </p>
                      <p className="text-xs text-[var(--color-text-secondary)] truncate mt-0.5">
                        {task.project?.name ?? "No Project"}
                      </p>
                      <p
                        className={`text-xs font-semibold mt-0.5 ${
                          isToday ? "text-red-500" : "text-amber-600"
                        }`}
                      >
                        {daysUntil(task.dueDate)} · {formatDate(task.dueDate)}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
