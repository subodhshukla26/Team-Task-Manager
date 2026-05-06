import { Task } from "../models/Task.js";
import { Project } from "../models/Project.js";

export async function getAllTasks(req, res) {
  const userId = req.user.id;
  const isAdmin = req.user.role === "ADMIN";

  let query = {};
  
  if (!isAdmin) {
    const userProjects = await Project.find({ members: userId }).select("_id");
    const projectIds = userProjects.map(p => p._id);
    
    query = {
      $or: [
        { assignee: userId },
        { project: { $in: projectIds } }
      ]
    };
  }

  const tasks = await Task.find(query)
    .populate("project", "name")
    .populate("assignee", "name email");
    
  res.json(tasks);
}

export async function createTask(req, res) {
  const { title, description, dueDate, project, assignee } = req.body;

  if (!title || !project) {
    return res.status(400).json({ message: "Title and Project are required." });
  }

  const task = await Task.create({
    title,
    description,
    dueDate,
    project,
    assignee
  });

  res.status(201).json(task);
}

export async function updateTask(req, res) {
  const { id } = req.params;
  const userId = req.user.id;
  const isAdmin = req.user.role === "ADMIN";

  const task = await Task.findById(id);
  
  if (!task) {
    return res.status(404).json({ message: "Task not found." });
  }

  // Permission check: Admin or the Assignee
  if (!isAdmin && task.assignee?.toString() !== userId) {
    return res.status(403).json({ message: "You only have permission to update tasks assigned to you." });
  }

  const updatedTask = await Task.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true }
  ).populate("project", "name").populate("assignee", "name email");

  res.json(updatedTask);
}
