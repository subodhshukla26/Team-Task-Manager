import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 5001),
  clientUrl: process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(",")
    : ["http://localhost:3000", "http://localhost:3001"],
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/team-task-manager",
  jwtSecret: process.env.JWT_SECRET || "dev-only-change-this-secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  isProduction: process.env.NODE_ENV === "production",
};

if (env.jwtSecret === "dev-only-change-this-secret" && env.isProduction) {
  throw new Error("JWT_SECRET must be set in production.");
}
