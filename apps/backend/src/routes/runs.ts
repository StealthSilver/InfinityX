import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { authMiddleware } from "../middleware/auth";
import { runController } from "../controllers/runController";

const router = Router();

router.post(
  "/trigger/:workflowId",
  authMiddleware,
  asyncHandler((req, res) => runController.triggerWorkflow(req as any, res))
);
router.get(
  "/",
  authMiddleware,
  asyncHandler((req, res) => runController.listRuns(req as any, res))
);
router.get(
  "/:runId",
  authMiddleware,
  asyncHandler((req, res) => runController.getRun(req as any, res))
);

export default router;
