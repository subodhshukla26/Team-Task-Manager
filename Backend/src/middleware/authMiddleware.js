import { findUserById } from "../db/database.js";
import { getTokenFromRequest, verifyAuthToken } from "../utils/auth.js";

export async function requireAuth(req, res, next) {
  const token = getTokenFromRequest(req);

  if (!token) {
    return res.status(401).json({ message: "Authentication required." });
  }

  try {
    const payload = verifyAuthToken(token);
    const user = await findUserById(payload.sub);

    if (!user) {
      return res.status(401).json({ message: "Authentication required." });
    }

    req.user = user;
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}

export function requireRole(...roles) {
  const allowed = roles.map((role) => role.toUpperCase());

  return (req, res, next) => {
    if (!req.user || !allowed.includes(req.user.role)) {
      return res.status(403).json({ message: "You do not have permission to do this." });
    }

    return next();
  };
}
