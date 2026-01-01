import { Response } from 'express';
import { AuthRequest } from '../middleware/errorHandler';
import { workflowService } from '../services/workflowService';

export class WorkflowController {
  async createWorkflow(req: AuthRequest, res: Response) {
    const { projectId } = req.params;
    const { name, steps } = req.body;
    const workflow = await workflowService.createWorkflow(req.user!.userId, projectId, name, steps || []);
    res.status(201).json(workflow);
  }

  async getWorkflow(req: AuthRequest, res: Response) {
    const { workflowId } = req.params;
    const workflow = await workflowService.getWorkflow(workflowId, req.user!.userId);
    res.json(workflow);
  }

  async listWorkflows(req: AuthRequest, res: Response) {
    const { projectId } = req.params;
    const workflows = await workflowService.listWorkflows(projectId, req.user!.userId);
    res.json(workflows);
  }

  async updateWorkflow(req: AuthRequest, res: Response) {
    const { workflowId } = req.params;
    const workflow = await workflowService.updateWorkflow(workflowId, req.user!.userId, req.body);
    res.json(workflow);
  }

  async updateSteps(req: AuthRequest, res: Response) {
    const { workflowId } = req.params;
    const { steps } = req.body;
    const workflow = await workflowService.updateSteps(workflowId, req.user!.userId, steps);
    res.json(workflow);
  }

  async deleteWorkflow(req: AuthRequest, res: Response) {
    const { workflowId } = req.params;
    const result = await workflowService.deleteWorkflow(workflowId, req.user!.userId);
    res.json(result);
  }
}

export const workflowController = new WorkflowController();
