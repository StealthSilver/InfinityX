import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { authMiddleware } from "../middleware/auth";
import { workflowController } from "../controllers/workflowController";

const router = Router({ mergeParams: true });

router.post(
  "/",
  authMiddleware,
  asyncHandler((req, res) => workflowController.createWorkflow(req as any, res))
);
router.get(
  "/",
  authMiddleware,
  asyncHandler((req, res) => workflowController.listWorkflows(req as any, res))
);
router.get(
  "/:workflowId",
  authMiddleware,
  asyncHandler((req, res) => workflowController.getWorkflow(req as any, res))
);
router.put(
  "/:workflowId",
  authMiddleware,
  asyncHandler((req, res) => workflowController.updateWorkflow(req as any, res))
);
router.put(
  "/:workflowId/steps",
  authMiddleware,
  asyncHandler((req, res) => workflowController.updateSteps(req as any, res))
);
router.delete(
  "/:workflowId",
  authMiddleware,
  asyncHandler((req, res) => workflowController.deleteWorkflow(req as any, res))
);

export default router;
