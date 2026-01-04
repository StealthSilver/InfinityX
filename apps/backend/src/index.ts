import dotenv from "dotenv";
import path from "path";

// Load .env.local only in development
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.resolve(__dirname, "../.env.local") });
}

import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";
import authRoutes from "./routes/auth";
import projectRoutes from "./routes/projects";
import workflowRoutes from "./routes/workflows";
import runRoutes from "./routes/runs";
import webhookRoutes from "./routes/webhooks";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/projects/:projectId/workflows", workflowRoutes);
app.use("/api/workflows/:workflowId", runRoutes);
app.use("/api/webhook", webhookRoutes);

// Error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✨ Backend listening on http://localhost:${PORT}`);
});
