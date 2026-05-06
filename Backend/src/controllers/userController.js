import { User } from "../models/User.js";

export async function getAllUsers(req, res) {
  const users = await User.find({}, "id name email role createdAt updatedAt");
  res.json(users);
}
