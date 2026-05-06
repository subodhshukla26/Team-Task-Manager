"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "../../lib/api";
import { ListTodo, Plus, Calendar, User } from "lucide-react";

const STATUS_COLORS = {
  TODO: "bg-slate-100 text-slate-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  DONE: "bg-emerald-100 text-emerald-700",
};

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const data = await apiRequest("/tasks");
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTasks();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-(--color-text-primary)">Tasks</h2>
          <p className="text-sm text-(--color-text-secondary) mt-1">
            Track and manage your team assignments.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-(--color-primary) text-white rounded-lg text-sm font-semibold hover:bg-(--color-primary-dark) transition-colors">
          <Plus size={18} />
          New Task
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-(--color-text-secondary)">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-(--color-border) p-12 text-center space-y-3">
          <div className="w-12 h-12 bg-(--color-surface-muted) rounded-full flex items-center justify-center mx-auto text-(--color-text-secondary)">
            <ListTodo size={24} />
          </div>
          <p className="text-(--color-text-primary) font-medium">No tasks found</p>
          <p className="text-sm text-(--color-text-secondary) max-w-xs mx-auto">
            Get started by creating a task and assigning it to a project.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-(--color-border) overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-(--color-border)">
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-(--color-text-secondary)">Task</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-(--color-text-secondary)">Status</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-(--color-text-secondary)">Project</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-(--color-text-secondary)">Due Date</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-(--color-text-secondary)">Assignee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--color-border)">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium text-(--color-text-primary)">{task.title}</p>
                      <p className="text-xs text-(--color-text-secondary) line-clamp-1">{task.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${STATUS_COLORS[task.status]}`}>
                      {task.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-(--color-text-secondary)">
                    {task.project?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-(--color-text-secondary)">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No date"}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-(--color-text-secondary)">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-(--color-surface-muted) flex items-center justify-center text-[10px] font-bold">
                        {task.assignee?.name?.[0] || <User size={12} />}
                      </div>
                      {task.assignee?.name || "Unassigned"}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
