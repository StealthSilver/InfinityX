import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { authMiddleware } from "../middleware/auth";
import { projectController } from "../controllers/projectController";

const router = Router();

router.post(
  "/",
  authMiddleware,
  asyncHandler((req, res) => projectController.createProject(req as any, res))
);
router.get(
  "/",
  authMiddleware,
  asyncHandler((req, res) => projectController.listProjects(req as any, res))
);
router.get(
  "/:projectId",
  authMiddleware,
  asyncHandler((req, res) => projectController.getProject(req as any, res))
);
router.delete(
  "/:projectId",
  authMiddleware,
  asyncHandler((req, res) => projectController.deleteProject(req as any, res))
);

export default router;
