export interface JWTPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface AuthPayload {
  user: {
    id: string;
    email: string;
  };
  token: string;
}

export interface SignupRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectWithWorkflows extends Project {
  workflowCount?: number;
  workflows?: Workflow[];
}

export interface Step {
  id: string;
  order: number;
  type: 'HTTP';
  config: {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    body?: any;
  };
}

export interface Workflow {
  id: string;
  name: string;
  projectId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  steps?: Step[];
}

export interface WorkflowWithStats extends Workflow {
  stepCount?: number;
  runCount?: number;
}

export interface StepRun {
  id: string;
  runId: string;
  stepId: string;
  status: 'PENDING' | 'RUNNING' | 'SUCCESS' | 'FAILED';
  logs?: string;
  startedAt?: string;
  finishedAt?: string;
  step?: Step;
}

export interface Run {
  id: string;
  workflowId: string;
  status: 'PENDING' | 'RUNNING' | 'SUCCESS' | 'FAILED';
  createdAt: string;
  startedAt?: string;
  finishedAt?: string;
  stepRuns?: StepRun[];
}

export interface WorkflowExecutionPayload {
  workflowId: string;
  payload?: any;
}

export interface WorkflowExecutionResult {
  runId: string;
  status: 'SUCCESS' | 'FAILED';
  results?: Array<{
    stepId: string;
    stepRunId: string;
    status: string;
    logs: string;
  }>;
  error?: string;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  error?: string;
}
