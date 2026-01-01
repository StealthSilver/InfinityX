import axios from "axios";
import { runService } from "../services/runService";
import { workflowService } from "../services/workflowService";

export class WorkflowEngine {
  async executeWorkflow(workflowId: string, payload?: any) {
    const run = await runService.createRun(workflowId);

    try {
      const workflow = await workflowService.getWorkflow(workflowId);

      if (!workflow.steps || workflow.steps.length === 0) {
        await runService.updateRunStatus(run.id, "FAILED");
        return {
          runId: run.id,
          status: "FAILED",
          error: "No steps in workflow",
        };
      }

      await runService.updateRunStatus(run.id, "RUNNING");

      const results: any[] = [];

      for (const step of workflow.steps) {
        const stepRun = await runService.createStepRun(run.id, step.id);

        try {
          await runService.updateStepRun(stepRun.id, {
            status: "RUNNING",
            startedAt: new Date(),
          });

          const config = step.config as any;
          const response = await axios({
            method: config?.method || "GET",
            url: config?.url,
            headers: config?.headers,
            data: config?.body,
            timeout: 30000,
          });

          const logs = `Request: ${JSON.stringify(
            step.config,
            null,
            2
          )}\n\nResponse: ${JSON.stringify(response.data, null, 2)}`;

          await runService.updateStepRun(stepRun.id, {
            status: "SUCCESS",
            logs,
            finishedAt: new Date(),
          });

          results.push({
            stepId: step.id,
            stepRunId: stepRun.id,
            status: "SUCCESS",
            logs,
          });
        } catch (error: any) {
          const errMsg = error.message || "Unknown error";
          const logs = `Request: ${JSON.stringify(
            step.config,
            null,
            2
          )}\n\nError: ${errMsg}`;

          await runService.updateStepRun(stepRun.id, {
            status: "FAILED",
            logs,
            finishedAt: new Date(),
          });
          await runService.updateRunStatus(run.id, "FAILED");

          return {
            runId: run.id,
            status: "FAILED",
            results,
            error: `Step ${step.order} failed: ${errMsg}`,
          };
        }
      }

      await runService.updateRunStatus(run.id, "SUCCESS");
      return { runId: run.id, status: "SUCCESS", results };
    } catch (error: any) {
      await runService.updateRunStatus(run.id, "FAILED");
      return {
        runId: run.id,
        status: "FAILED",
        error: error.message || "Workflow failed",
      };
    }
  }
}

export const workflowEngine = new WorkflowEngine();
