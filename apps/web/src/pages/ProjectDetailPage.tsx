import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../lib/api';

interface Workflow {
  id: string;
  name: string;
  isActive: boolean;
  stepCount: number;
  runCount: number;
  createdAt: string;
}

export function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [projectName, setProjectName] = useState('');
  const [newWorkflowName, setNewWorkflowName] = useState('');
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProject();
    fetchWorkflows();
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const { data } = await api.get(`/projects/${projectId}`);
      setProjectName(data.name);
    } catch (error) {
      console.error('Failed to fetch project', error);
    }
  };

  const fetchWorkflows = async () => {
    try {
      const { data } = await api.get(`/projects/${projectId}/workflows`);
      setWorkflows(data);
    } catch (error) {
      console.error('Failed to fetch workflows', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWorkflow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkflowName.trim()) return;

    setCreating(true);
    try {
      const { data } = await api.post(`/projects/${projectId}/workflows`, {
        name: newWorkflowName,
        steps: [],
      });
      setWorkflows([data, ...workflows]);
      setNewWorkflowName('');
      navigate(`/workflows/${data.id}`);
    } catch (error) {
      console.error('Failed to create workflow', error);
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteWorkflow = async (workflowId: string) => {
    if (!window.confirm('Delete this workflow?')) return;

    try {
      await api.delete(`/projects/${projectId}/workflows/${workflowId}`);
      setWorkflows(workflows.filter((w) => w.id !== workflowId));
    } catch (error) {
      console.error('Failed to delete workflow', error);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <button onClick={() => navigate('/projects')} className="text-[#4F8CFF] hover:underline mb-4">
          ← Back to Projects
        </button>
        <h1 className="text-3xl font-bold text-white">{projectName}</h1>
        <p className="text-[#9CA3AF]">Manage workflows</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 bg-[#111827] border border-[#1F2937] rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">New Workflow</h2>
          <form onSubmit={handleCreateWorkflow} className="space-y-3">
            <input
              type="text"
              placeholder="Workflow name"
              value={newWorkflowName}
              onChange={(e) => setNewWorkflowName(e.target.value)}
              className="w-full px-4 py-2 bg-[#1F2937] border border-[#374151] rounded-lg text-white placeholder-[#6B7280] focus:outline-none focus:border-[#4F8CFF]"
            />
            <button
              type="submit"
              disabled={creating || !newWorkflowName.trim()}
              className="w-full py-2 bg-[#4F8CFF] hover:bg-[#3D6BC4] text-white font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              {creating ? 'Creating...' : 'Create'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-white mb-4">Workflows</h2>
          {loading ? (
            <div className="text-[#9CA3AF]">Loading...</div>
          ) : workflows.length === 0 ? (
            <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-8 text-center text-[#9CA3AF]">
              No workflows yet.
            </div>
          ) : (
            <div className="space-y-2">
              {workflows.map((workflow) => (
                <div key={workflow.id} className="bg-[#111827] border border-[#1F2937] rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-white font-medium">{workflow.name}</h3>
                      <p className="text-sm text-[#9CA3AF]">{workflow.stepCount} steps • {workflow.runCount} runs</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${workflow.isActive ? 'bg-[#065F46] text-[#A7F3D0]' : 'bg-[#1F2937] text-[#6B7280]'}`}>
                      {workflow.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/workflows/${workflow.id}`)}
                      className="flex-1 py-2 bg-[#4F8CFF] hover:bg-[#3D6BC4] text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => navigate(`/runs?workflow=${workflow.id}`)}
                      className="flex-1 py-2 bg-[#1F2937] hover:bg-[#374151] text-[#9CA3AF] text-sm font-medium rounded-lg transition-colors"
                    >
                      Logs
                    </button>
                    <button
                      onClick={() => handleDeleteWorkflow(workflow.id)}
                      className="px-4 py-2 bg-[#1F2937] hover:bg-[#374151] text-[#EF4444] text-sm font-medium rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
