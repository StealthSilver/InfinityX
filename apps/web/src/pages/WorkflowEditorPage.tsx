import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../lib/api';

interface Step {
  id: string;
  order: number;
  type: string;
  config: any;
}

export function WorkflowEditorPage() {
  const { workflowId } = useParams<{ workflowId: string }>();
  const [workflow, setWorkflow] = useState<any>(null);
  const [steps, setSteps] = useState<Step[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newStepUrl, setNewStepUrl] = useState('');
  const [newStepMethod, setNewStepMethod] = useState('GET');
  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkflow();
  }, [workflowId]);

  const fetchWorkflow = async () => {
    try {
      const { data } = await api.get(`/projects/${data.projectId}/workflows/${workflowId}`);
      setWorkflow(data);
      setSteps(data.steps || []);
    } catch (error) {
      console.error('Failed to fetch workflow', error);
    } finally {
      setLoading(false);
    }
  };

  const addStep = () => {
    if (!newStepUrl.trim()) return;
    const step: Step = {
      id: Math.random().toString(),
      order: steps.length + 1,
      type: 'HTTP',
      config: { url: newStepUrl, method: newStepMethod, headers: {}, body: null },
    };
    setSteps([...steps, step]);
    setNewStepUrl('');
  };

  const removeStep = (stepId: string) => {
    setSteps(steps.filter((s) => s.id !== stepId).map((s, i) => ({ ...s, order: i + 1 })));
  };

  const saveWorkflow = async () => {
    if (!workflow?.projectId) return;
    setSaving(true);
    try {
      await api.put(`/projects/${workflow.projectId}/workflows/${workflowId}/steps`, { steps });
      alert('Workflow saved!');
    } catch (error) {
      console.error('Failed to save workflow', error);
      alert('Failed to save workflow');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-[#9CA3AF]">Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <button onClick={() => navigate(-1)} className="text-[#4F8CFF] hover:underline mb-4">
          ← Back
        </button>
        <h1 className="text-3xl font-bold text-white">{workflow?.name}</h1>
        <p className="text-[#9CA3AF]">Configure workflow steps</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-[#111827] border border-[#1F2937] rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Add Step</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-[#9CA3AF] mb-2">HTTP Method</label>
              <select
                value={newStepMethod}
                onChange={(e) => setNewStepMethod(e.target.value)}
                className="w-full px-4 py-2 bg-[#1F2937] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#4F8CFF]"
              >
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>DELETE</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="https://api.example.com/webhook"
              value={newStepUrl}
              onChange={(e) => setNewStepUrl(e.target.value)}
              className="w-full px-4 py-2 bg-[#1F2937] border border-[#374151] rounded-lg text-white placeholder-[#6B7280] focus:outline-none focus:border-[#4F8CFF] text-sm"
            />
            <button
              onClick={addStep}
              disabled={!newStepUrl.trim()}
              className="w-full py-2 bg-[#4F8CFF] hover:bg-[#3D6BC4] text-white font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              Add Step
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">Steps ({steps.length})</h2>
            <button
              onClick={saveWorkflow}
              disabled={saving}
              className="px-4 py-2 bg-[#22C55E] hover:bg-[#16A34A] text-white font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Workflow'}
            </button>
          </div>

          {steps.length === 0 ? (
            <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-8 text-center text-[#9CA3AF]">
              No steps yet. Add one to get started.
            </div>
          ) : (
            <div className="space-y-2">
              {steps.map((step) => (
                <div key={step.id} className="bg-[#111827] border border-[#1F2937] rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-[#4F8CFF] font-semibold">Step {step.order}</span>
                      <p className="text-white">{step.config.method} {step.config.url}</p>
                    </div>
                    <button
                      onClick={() => removeStep(step.id)}
                      className="text-[#EF4444] hover:text-[#DC2626]"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="text-xs text-[#6B7280]">
                    <code>{JSON.stringify(step.config, null, 2)}</code>
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
