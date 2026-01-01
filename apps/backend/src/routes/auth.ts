import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { authenticate } from '../middleware/auth';
import { authController } from '../controllers/authController';

const router = Router();

router.post('/signup', asyncHandler((req, res) => authController.signup(req as any, res)));
router.post('/login', asyncHandler((req, res) => authController.login(req as any, res)));
router.get('/me', authenticate, asyncHandler((req, res) => authController.getMe(req as any, res)));

export default router;
