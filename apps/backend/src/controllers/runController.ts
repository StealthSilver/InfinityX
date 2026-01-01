import { Response } from 'express';
import { AuthRequest } from '../middleware/errorHandler';
import { runService } from '../services/runService';
import { workflowEngine } from '../engine/workflowEngine';

export class RunController {
  async triggerWorkflow(req: AuthRequest, res: Response) {
    const { workflowId } = req.params;
    const result = await workflowEngine.executeWorkflow(workflowId, req.body);
    res.status(202).json(result);
  }

  async getRun(req: AuthRequest, res: Response) {
    const { runId } = req.params;
    const run = await runService.getRun(runId);
    res.json(run);
  }

  async listRuns(req: AuthRequest, res: Response) {
    const { workflowId } = req.params;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
    const runs = await runService.listRuns(workflowId, limit);
    res.json(runs);
  }
}

export const runController = new RunController();
