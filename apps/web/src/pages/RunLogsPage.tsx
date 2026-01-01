import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../lib/api';

interface StepRun {
  id: string;
  status: string;
  logs: string;
  startedAt: string;
  finishedAt: string;
  step: { order: number; type: string };
}

interface Run {
  id: string;
  status: string;
  createdAt: string;
  startedAt?: string;
  finishedAt?: string;
  stepRuns: StepRun[];
}

export function RunLogsPage() {
  const [searchParams] = useSearchParams();
  const [runs, setRuns] = useState<Run[]>([]);
  const [selectedRun, setSelectedRun] = useState<Run | null>(null);
  const [loading, setLoading] = useState(true);

  const workflowId = searchParams.get('workflow');

  useEffect(() => {
    if (workflowId) fetchRuns();
  }, [workflowId]);

  const fetchRuns = async () => {
    if (!workflowId) return;
    try {
      const { data } = await api.get(`/workflows/${workflowId}/runs`);
      setRuns(data);
      if (data.length > 0) setSelectedRun(data[0]);
    } catch (error) {
      console.error('Failed to fetch runs', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return 'bg-[#065F46] text-[#A7F3D0]';
      case 'FAILED':
        return 'bg-[#7F1D1D] text-[#FCA5A5]';
      case 'RUNNING':
        return 'bg-[#1E40AF] text-[#BFDBFE]';
      default:
        return 'bg-[#1F2937] text-[#9CA3AF]';
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Execution Logs</h1>

      {!workflowId ? (
        <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-8 text-center text-[#9CA3AF]">
          Select a workflow to view execution logs
        </div>
      ) : loading ? (
        <div className="text-[#9CA3AF]">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-4">
            <h2 className="text-lg font-semibold text-white mb-4">Runs</h2>
            {runs.length === 0 ? (
              <div className="text-sm text-[#9CA3AF]">No runs yet</div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-auto">
                {runs.map((run) => (
                  <button
                    key={run.id}
                    onClick={() => setSelectedRun(run)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedRun?.id === run.id
                        ? 'bg-[#4F8CFF] text-white'
                        : 'hover:bg-[#1F2937] text-[#9CA3AF]'
                    }`}
                  >
                    <div className="text-sm font-medium">Run {run.id.slice(0, 8)}</div>
                    <div className={`text-xs mt-1 px-2 py-1 rounded w-fit ${getStatusColor(run.status)}`}>
                      {run.status}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {selectedRun && (
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Run Details</h3>
                <div className="space-y-2 text-sm text-[#9CA3AF]">
                  <div>
                    <span className="text-[#6B7280]">ID:</span> {selectedRun.id}
                  </div>
                  <div>
                    <span className="text-[#6B7280]">Status:</span>{' '}
                    <span className={`px-2 py-1 rounded ${getStatusColor(selectedRun.status)}`}>{selectedRun.status}</span>
                  </div>
                  <div>
                    <span className="text-[#6B7280]">Started:</span>{' '}
                    {selectedRun.startedAt ? new Date(selectedRun.startedAt).toLocaleString() : 'N/A'}
                  </div>
                  <div>
                    <span className="text-[#6B7280]">Finished:</span>{' '}
                    {selectedRun.finishedAt ? new Date(selectedRun.finishedAt).toLocaleString() : 'N/A'}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Step Executions</h3>
                {selectedRun.stepRuns.map((stepRun) => (
                  <div key={stepRun.id} className="bg-[#111827] border border-[#1F2937] rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-white font-medium">Step {stepRun.step.order}</h4>
                        <p className="text-sm text-[#9CA3AF]">{stepRun.step.type}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(stepRun.status)}`}>
                        {stepRun.status}
                      </span>
                    </div>
                    {stepRun.logs && (
                      <pre className="bg-[#0B0E14] border border-[#1F2937] rounded p-3 text-xs text-[#A7F3D0] overflow-x-auto font-mono">
                        {stepRun.logs}
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
