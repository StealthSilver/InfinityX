import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { webhookController } from '../controllers/webhookController';

const router = Router();

router.post('/:workflowId', asyncHandler((req, res) => webhookController.triggerWorkflow(req, res)));

export default router;
