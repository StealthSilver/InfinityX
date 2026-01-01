import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const LOGO = 'InfinityX';
const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/projects', label: 'Projects', icon: '📁' },
  { path: '/runs', label: 'Execution Logs', icon: '��' },
];

export function AppShell() {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#0B0E14]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111827] border-r border-[#1F2937] flex flex-col">
        <div className="p-6 border-b border-[#1F2937]">
          <h1 className="text-2xl font-bold text-[#4F8CFF]">{LOGO}</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-[#4F8CFF] text-white'
                  : 'text-[#9CA3AF] hover:text-white hover:bg-[#1F2937]'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-[#1F2937]">
          <div className="text-sm text-[#9CA3AF] mb-3">{user?.email}</div>
          <button
            onClick={logout}
            className="w-full px-4 py-2 bg-[#1F2937] text-[#9CA3AF] rounded-lg hover:bg-[#374151] transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-[#111827] border-b border-[#1F2937] px-8 py-4">
          <h2 className="text-xl font-semibold text-white">Workflow Automation</h2>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
