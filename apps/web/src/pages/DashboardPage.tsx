import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../lib/api';

interface Project {
  id: string;
  name: string;
  workflowCount: number;
  createdAt: string;
}

export function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [newProjectName, setNewProjectName] = useState('');
  const [creating, setCreating] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/projects');
      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    setCreating(true);
    try {
      const { data } = await api.post('/projects', { name: newProjectName });
      setProjects([data, ...projects]);
      setNewProjectName('');
    } catch (error) {
      console.error('Failed to create project', error);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.email}!</h1>
        <p className="text-[#9CA3AF]">Manage your automation workflows</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 bg-[#111827] border border-[#1F2937] rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">New Project</h2>
          <form onSubmit={handleCreateProject} className="space-y-3">
            <input
              type="text"
              placeholder="Project name"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="w-full px-4 py-2 bg-[#1F2937] border border-[#374151] rounded-lg text-white placeholder-[#6B7280] focus:outline-none focus:border-[#4F8CFF]"
            />
            <button
              type="submit"
              disabled={creating || !newProjectName.trim()}
              className="w-full py-2 bg-[#4F8CFF] hover:bg-[#3D6BC4] text-white font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              {creating ? 'Creating...' : 'Create'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Projects</h2>
          {loading ? (
            <div className="text-[#9CA3AF]">Loading...</div>
          ) : projects.length === 0 ? (
            <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-8 text-center text-[#9CA3AF]">
              No projects yet. Create one to get started!
            </div>
          ) : (
            <div className="space-y-2">
              {projects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => navigate(`/projects/${project.id}`)}
                  className="bg-[#111827] border border-[#1F2937] rounded-lg p-4 cursor-pointer hover:border-[#4F8CFF] transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-medium">{project.name}</h3>
                      <p className="text-sm text-[#9CA3AF]">{project.workflowCount} workflows</p>
                    </div>
                    <span className="text-sm text-[#6B7280]">{new Date(project.createdAt).toLocaleDateString()}</span>
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
