"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "../../lib/api";
import { FolderIcon, Plus } from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await apiRequest("/projects");
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-(--color-text-primary)">Projects</h2>
          <p className="text-sm text-(--color-text-secondary) mt-1">
            Manage your team projects and members.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-(--color-primary) text-white rounded-lg text-sm font-semibold hover:bg-(--color-primary-dark) transition-colors">
          <Plus size={18} />
          New Project
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-(--color-text-secondary)">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-(--color-border) p-12 text-center space-y-3">
          <div className="w-12 h-12 bg-(--color-surface-muted) rounded-full flex items-center justify-center mx-auto text-(--color-text-secondary)">
            <FolderIcon size={24} />
          </div>
          <p className="text-(--color-text-primary) font-medium">No projects yet</p>
          <p className="text-sm text-(--color-text-secondary) max-w-xs mx-auto">
            Create your first project to start organizing your team tasks.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl border border-(--color-border) p-5 space-y-4 shadow-xs hover:border-(--color-primary) transition-colors"
            >
              <div className="space-y-1">
                <h3 className="font-bold text-(--color-text-primary)">{project.name}</h3>
                <p className="text-sm text-(--color-text-secondary) line-clamp-2">
                  {project.description || "No description provided."}
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-(--color-border)">
                <span className="text-xs text-(--color-text-secondary)">
                  {project.members?.length || 0} Members
                </span>
                <span className="text-xs font-medium text-(--color-primary)">View Details →</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
