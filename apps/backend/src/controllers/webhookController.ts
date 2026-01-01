import { Response, Request } from 'express';
import { workflowEngine } from '../engine/workflowEngine';

export class WebhookController {
  async triggerWorkflow(req: Request, res: Response) {
    const { workflowId } = req.params;
    const result = await workflowEngine.executeWorkflow(workflowId, req.body);
    res.status(202).json(result);
  }
}

export const webhookController = new WebhookController();
