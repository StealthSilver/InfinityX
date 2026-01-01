import { PrismaClient } from '@prisma/client';
import { ValidationError, NotFoundError, ForbiddenError } from '../utils/errors';
import { projectService } from './projectService';

const prisma = new PrismaClient();

export class WorkflowService {
  async createWorkflow(userId: string, projectId: string, name: string, steps: any[] = []) {
    await projectService.getProject(projectId, userId);
    if (!name || !name.trim()) throw new ValidationError('Workflow name required');

    return await prisma.workflow.create({
      data: {
        name: name.trim(),
        projectId,
        steps: { create: steps.map((s) => ({ order: s.order, type: s.type, config: s.config })) },
      },
      include: { steps: { orderBy: { order: 'asc' } } },
    });
  }

  async getWorkflow(workflowId: string, userId?: string) {
    const workflow = await prisma.workflow.findUnique({
      where: { id: workflowId },
      include: { project: true, steps: { orderBy: { order: 'asc' } } },
    });

    if (!workflow) throw new NotFoundError('Workflow not found');
    if (userId && workflow.project.userId !== userId) throw new ForbiddenError('Cannot access workflow');

    return workflow;
  }

  async listWorkflows(projectId: string, userId: string) {
    await projectService.getProject(projectId, userId);

    const workflows = await prisma.workflow.findMany({
      where: { projectId },
      include: { steps: { select: { id: true } }, runs: { select: { id: true } } },
      orderBy: { createdAt: 'desc' },
    });

    return workflows.map(w => ({
      ...w,
      stepCount: w.steps.length,
      runCount: w.runs.length,
      steps: undefined,
      runs: undefined,
    }));
  }

  async updateWorkflow(workflowId: string, userId: string, data: any) {
    await this.getWorkflow(workflowId, userId);
    return await prisma.workflow.update({
      where: { id: workflowId },
      data,
      include: { steps: { orderBy: { order: 'asc' } } },
    });
  }

  async updateSteps(workflowId: string, userId: string, steps: any[]) {
    await this.getWorkflow(workflowId, userId);
    
    await prisma.step.deleteMany({ where: { workflowId } });
    return await prisma.workflow.update({
      where: { id: workflowId },
      data: {
        steps: { create: steps.map((s) => ({ order: s.order, type: s.type, config: s.config })) },
      },
      include: { steps: { orderBy: { order: 'asc' } } },
    });
  }

  async deleteWorkflow(workflowId: string, userId: string) {
    await this.getWorkflow(workflowId, userId);
    await prisma.workflow.delete({ where: { id: workflowId } });
    return { success: true };
  }
}

export const workflowService = new WorkflowService();
