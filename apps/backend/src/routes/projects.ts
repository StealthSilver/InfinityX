import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { authenticate } from '../middleware/auth';
import { projectController } from '../controllers/projectController';

const router = Router();

router.post('/', authenticate, asyncHandler((req, res) => projectController.createProject(req as any, res)));
router.get('/', authenticate, asyncHandler((req, res) => projectController.listProjects(req as any, res)));
router.get('/:projectId', authenticate, asyncHandler((req, res) => projectController.getProject(req as any, res)));
router.delete('/:projectId', authenticate, asyncHandler((req, res) => projectController.deleteProject(req as any, res)));

export default router;
