import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from '../utils/password';
import { signToken } from '../utils/jwt';
import { ValidationError, UnauthorizedError } from '../utils/errors';

const prisma = new PrismaClient();

export class AuthService {
  async signup(email: string, password: string) {
    if (!email || !password) throw new ValidationError('Email and password required');
    if (password.length < 6) throw new ValidationError('Password must be 6+ chars');

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new ValidationError('Email already registered');

    const hash = await hashPassword(password);
    const user = await prisma.user.create({ data: { email, passwordHash: hash } });

    const token = signToken({ userId: user.id, email: user.email });
    return { user: { id: user.id, email: user.email }, token };
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedError('Invalid email or password');

    const valid = await comparePassword(password, user.passwordHash);
    if (!valid) throw new UnauthorizedError('Invalid email or password');

    const token = signToken({ userId: user.id, email: user.email });
    return { user: { id: user.id, email: user.email }, token };
  }

  async getUser(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, createdAt: true },
    });
    if (!user) throw new ValidationError('User not found');
    return user;
  }
}

export const authService = new AuthService();
