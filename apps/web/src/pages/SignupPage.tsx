import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await signup(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-[#111827] rounded-lg border border-[#1F2937] p-8">
          <h1 className="text-3xl font-bold text-[#4F8CFF] mb-2">InfinityX</h1>
          <p className="text-[#9CA3AF] mb-8">Create an account</p>

          {error && <div className="bg-[#7F1D1D] text-[#FCA5A5] p-3 rounded mb-4 text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#E5E7EB] mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-[#1F2937] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#4F8CFF]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#E5E7EB] mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-[#1F2937] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#4F8CFF]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#E5E7EB] mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 bg-[#1F2937] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#4F8CFF]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-[#4F8CFF] hover:bg-[#3D6BC4] text-white font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Sign up'}
            </button>
          </form>

          <p className="mt-6 text-center text-[#9CA3AF]">
            Already have an account?{' '}
            <Link to="/login" className="text-[#4F8CFF] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
