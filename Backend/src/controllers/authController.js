import bcrypt from "bcryptjs";
import { countUsers, createUser, findUserByEmail } from "../db/database.js";
import {
  clearAuthCookie,
  serializeUser,
  setAuthCookie,
  signAuthToken,
} from "../utils/auth.js";

const PASSWORD_SALT_ROUNDS = 12;

function authResponse(res, statusCode, user) {
  const token = signAuthToken(user);
  setAuthCookie(res, token);

  return res.status(statusCode).json({
    token,
    user: serializeUser(user),
  });
}

export async function signup(req, res) {
  const { name, email, password } = req.body;
  const normalizedEmail = email.toLowerCase();

  const existingUser = await findUserByEmail(normalizedEmail);

  if (existingUser) {
    return res.status(409).json({ message: "An account with this email already exists." });
  }

  const userCount = await countUsers();
  const passwordHash = await bcrypt.hash(password, PASSWORD_SALT_ROUNDS);
  const user = await createUser({
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    role: userCount === 0 ? "ADMIN" : "MEMBER",
  });

  return authResponse(res, 201, user);
}

export async function login(req, res) {
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase();

  const user = await findUserByEmail(normalizedEmail);

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  return authResponse(res, 200, user);
}

export async function me(req, res) {
  return res.json({ user: serializeUser(req.user) });
}

export async function logout(_req, res) {
  clearAuthCookie(res);
  return res.json({ message: "Logged out successfully." });
}
