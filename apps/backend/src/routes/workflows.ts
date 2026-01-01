import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { authenticate } from '../middleware/auth';
import { workflowController } from '../controllers/workflowController';

const router = Router({ mergeParams: true });

router.post('/', authenticate, asyncHandler((req, res) => workflowController.createWorkflow(req as any, res)));
router.get('/', authenticate, asyncHandler((req, res) => workflowController.listWorkflows(req as any, res)));
router.get('/:workflowId', authenticate, asyncHandler((req, res) => workflowController.getWorkflow(req as any, res)));
router.put('/:workflowId', authenticate, asyncHandler((req, res) => workflowController.updateWorkflow(req as any, res)));
router.put('/:workflowId/steps', authenticate, asyncHandler((req, res) => workflowController.updateSteps(req as any, res)));
router.delete('/:workflowId', authenticate, asyncHandler((req, res) => workflowController.deleteWorkflow(req as any, res)));

export default router;
