import mongoose from "mongoose";
import { env } from "../config/env.js";
import { User } from "../models/User.js";

let isConnected = false;

export async function initDb() {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(env.mongoUri);
    isConnected = db.connections[0].readyState === 1;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

export async function closeDb() {
  if (isConnected) {
    await mongoose.disconnect();
    isConnected = false;
  }
}

export async function countUsers() {
  return User.countDocuments();
}

export async function findUserByEmail(email) {
  const user = await User.findOne({ email });
  return user ? user.toJSON() : null;
}

export async function findUserById(id) {
  if (!mongoose.isValidObjectId(id)) return null;
  const user = await User.findById(id);
  return user ? user.toJSON() : null;
}

export async function createUser({ name, email, passwordHash, role }) {
  const user = await User.create({ name, email, passwordHash, role });
  return user.toJSON();
}
