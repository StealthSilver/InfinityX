import { Response } from 'express';
import { AuthRequest } from '../middleware/errorHandler';
import { projectService } from '../services/projectService';

export class ProjectController {
  async createProject(req: AuthRequest, res: Response) {
    const { name } = req.body;
    const project = await projectService.createProject(req.user!.userId, name);
    res.status(201).json(project);
  }

  async getProject(req: AuthRequest, res: Response) {
    const { projectId } = req.params;
    const project = await projectService.getProject(projectId, req.user!.userId);
    res.json(project);
  }

  async listProjects(req: AuthRequest, res: Response) {
    const projects = await projectService.listProjects(req.user!.userId);
    res.json(projects);
  }

  async deleteProject(req: AuthRequest, res: Response) {
    const { projectId } = req.params;
    const result = await projectService.deleteProject(projectId, req.user!.userId);
    res.json(result);
  }
}

export const projectController = new ProjectController();
