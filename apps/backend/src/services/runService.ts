import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '../utils/errors';

const prisma = new PrismaClient();

export class RunService {
  async createRun(workflowId: string) {
    return await prisma.run.create({ data: { workflowId, status: 'PENDING' } });
  }

  async getRun(runId: string) {
    const run = await prisma.run.findUnique({
      where: { id: runId },
      include: {
        stepRuns: {
          include: { step: { select: { id: true, order: true, type: true, config: true } } },
          orderBy: { createdAt: 'asc' },
        },
        workflow: { select: { id: true, name: true } },
      },
    });

    if (!run) throw new NotFoundError('Run not found');
    return run;
  }

  async listRuns(workflowId: string, limit = 50) {
    return await prisma.run.findMany({
      where: { workflowId },
      include: { stepRuns: { select: { id: true, status: true } } },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async updateRunStatus(runId: string, status: string) {
    return await prisma.run.update({
      where: { id: runId },
      data: {
        status,
        ...(status === 'RUNNING' && { startedAt: new Date() }),
        ...(status !== 'RUNNING' && { finishedAt: new Date() }),
      },
    });
  }

  async createStepRun(runId: string, stepId: string) {
    return await prisma.stepRun.create({
      data: { runId, stepId, status: 'PENDING' },
    });
  }

  async updateStepRun(stepRunId: string, data: any) {
    return await prisma.stepRun.update({ where: { id: stepRunId }, data });
  }

  async getStepRun(stepRunId: string) {
    return await prisma.stepRun.findUnique({
      where: { id: stepRunId },
      include: { step: true },
    });
  }
}

export const runService = new RunService();
