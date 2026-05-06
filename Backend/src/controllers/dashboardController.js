import { Project } from "../models/Project.js";
import { Task } from "../models/Task.js";
import { User } from "../models/User.js";

export async function getDashboardStats(req, res) {
  const userId = req.user.id;
  const isAdmin = req.user.role === "ADMIN";

  // 1. Count total projects accessible to the user
  const projectQuery = isAdmin ? {} : { members: userId };
  const totalProjects = await Project.countDocuments(projectQuery);

  // 2. Count total team members
  const totalMembers = await User.countDocuments();

  // 3. Count open tasks
  // For Admin: All open tasks
  // For Member: Tasks assigned to them OR tasks in projects they belong to
  let taskQuery = { status: { $ne: "DONE" } };
  
  if (!isAdmin) {
    const userProjects = await Project.find({ members: userId }).select("_id");
    const projectIds = userProjects.map(p => p._id);
    
    taskQuery = {
      ...taskQuery,
      $or: [
        { assignee: userId },
        { project: { $in: projectIds } }
      ]
    };
  }
  
  const openTasks = await Task.countDocuments(taskQuery);

  res.json({
    totalProjects,
    openTasks,
    totalMembers
  });
}
