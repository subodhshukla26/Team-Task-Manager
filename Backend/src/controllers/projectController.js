import { Project } from "../models/Project.js";

export async function getAllProjects(req, res) {
  const userId = req.user.id;
  const isAdmin = req.user.role === "ADMIN";

  const query = isAdmin ? {} : { members: userId };
  const projects = await Project.find(query).populate("createdBy", "name email");
  
  res.json(projects);
}

export async function createProject(req, res) {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Project name is required." });
  }

  const project = await Project.create({
    name,
    description,
    createdBy: req.user.id,
    members: [req.user.id], // Creator is always a member
  });

  res.status(201).json(project);
}

export async function getProjectMembers(req, res) {
  const { id } = req.params;
  
  const project = await Project.findById(id).populate("members", "id name email role");
  
  if (!project) {
    return res.status(404).json({ message: "Project not found." });
  }

  res.json(project.members);
}

export async function addProjectMember(req, res) {
  const { id } = req.params;
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  const project = await Project.findById(id);
  if (!project) {
    return res.status(404).json({ message: "Project not found." });
  }

  // Add member if not already in the list
  if (!project.members.includes(userId)) {
    project.members.push(userId);
    await project.save();
  }

  res.json({ message: "Member added successfully." });
}
