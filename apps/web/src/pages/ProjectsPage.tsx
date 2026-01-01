import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

interface Project {
  id: string;
  name: string;
  workflowCount: number;
  createdAt: string;
}

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
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

  const handleDelete = async (projectId: string) => {
    if (!window.confirm('Delete this project?')) return;

    try {
      await api.delete(`/projects/${projectId}`);
      setProjects(projects.filter((p) => p.id !== projectId));
    } catch (error) {
      console.error('Failed to delete project', error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Projects</h1>

      {loading ? (
        <div className="text-[#9CA3AF]">Loading...</div>
      ) : projects.length === 0 ? (
        <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-8 text-center text-[#9CA3AF]">
          No projects yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[#111827] border border-[#1F2937] rounded-lg p-6 hover:border-[#4F8CFF] transition-colors"
            >
              <h3 className="text-lg font-semibold text-white mb-2">{project.name}</h3>
              <p className="text-sm text-[#9CA3AF] mb-4">{project.workflowCount} workflows</p>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/projects/${project.id}`)}
                  className="flex-1 py-2 bg-[#4F8CFF] hover:bg-[#3D6BC4] text-white text-sm font-medium rounded-lg transition-colors"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
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
  );
}
