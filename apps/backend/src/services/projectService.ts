import { PrismaClient } from '@prisma/client';
import { ValidationError, NotFoundError, ForbiddenError } from '../utils/errors';

const prisma = new PrismaClient();

export class ProjectService {
  async createProject(userId: string, name: string) {
    if (!name || !name.trim()) throw new ValidationError('Project name required');

    return await prisma.project.create({
      data: { name: name.trim(), userId },
    });
  }

  async getProject(projectId: string, userId: string) {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { workflows: { select: { id: true, name: true, isActive: true } } },
    });

    if (!project) throw new NotFoundError('Project not found');
    if (project.userId !== userId) throw new ForbiddenError('Cannot access project');

    return project;
  }

  async listProjects(userId: string) {
    const projects = await prisma.project.findMany({
      where: { userId },
      include: { workflows: { select: { id: true } } },
      orderBy: { createdAt: 'desc' },
    });

    return projects.map(p => ({
      ...p,
      workflowCount: p.workflows.length,
      workflows: undefined,
    }));
  }

  async deleteProject(projectId: string, userId: string) {
    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) throw new NotFoundError('Project not found');
    if (project.userId !== userId) throw new ForbiddenError('Cannot delete project');

    await prisma.project.delete({ where: { id: projectId } });
    return { success: true };
  }
}

export const projectService = new ProjectService();
