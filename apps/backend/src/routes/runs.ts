import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { authenticate } from '../middleware/auth';
import { runController } from '../controllers/runController';

const router = Router();

router.post('/trigger/:workflowId', authenticate, asyncHandler((req, res) => runController.triggerWorkflow(req as any, res)));
router.get('/', authenticate, asyncHandler((req, res) => runController.listRuns(req as any, res)));
router.get('/:runId', authenticate, asyncHandler((req, res) => runController.getRun(req as any, res)));

export default router;
