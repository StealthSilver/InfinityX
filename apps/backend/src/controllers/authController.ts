import { Response } from 'express';
import { AuthRequest } from '../middleware/errorHandler';
import { authService } from '../services/authService';

export class AuthController {
  async signup(req: AuthRequest, res: Response) {
    const { email, password } = req.body;
    const result = await authService.signup(email, password);
    res.status(201).json(result);
  }

  async login(req: AuthRequest, res: Response) {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  }

  async getMe(req: AuthRequest, res: Response) {
    const user = await authService.getUser(req.user!.userId);
    res.json(user);
  }
}

export const authController = new AuthController();
