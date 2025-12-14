import express from "express";
import cors from "cors";
import morgan from "morgan";
import serverless from "serverless-http";
import dotenv from "dotenv";

import connectDb from "./src/db.js";

import userRoutes from "./src/backend/routes/user.routes.js";
import projectRoutes from "./src/backend/routes/project.routes.js";
import qualificationRoutes from "./src/backend/routes/qualification.routes.js";
import contactRoutes from "./src/backend/routes/contact.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("tiny"));

// Ensure DB connection for every request (connection is cached)
app.use(async (req, res, next) => {
  try {
    await connectDb();
    next();
  } catch (e) {
    console.error("DB connection error:", e);
    res.status(500).json({ message: "Database connection failed" });
  }
});

// Health check
app.get("/health", (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

// Routes (mounted WITHOUT /api because we'll rewrite /api/* to this function)
app.use("/users", userRoutes);
app.use("/projects", projectRoutes);
app.use("/qualifications", qualificationRoutes);
app.use("/contact", contactRoutes);

// 404
app.use((req, res) => res.status(404).json({ message: "Not Found" }));

export const handler = serverless(app, { basePath: "/api" });
