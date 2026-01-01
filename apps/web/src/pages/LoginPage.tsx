import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="min-h-screen flex relative z-10">
        {/* Left Panel - Form */}
        <div className="flex-1 flex flex-col justify-center px-8 py-12 lg:px-16">
          <div className="mx-auto w-full max-w-sm">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 mb-12">
              <img src="/inflogo.svg" alt="InfinityX" className="h-8 w-auto" />
            </Link>

            <div className="space-y-2 mb-8">
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome back
              </h1>
              <p className="text-slate-400">
                Sign in to your account to continue
              </p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="animate-spin">⟳</span> Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <span>→</span>
                  </>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Right Panel - Decorative */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-slate-900 to-slate-950 border-l border-slate-800 items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5" />
          <div className="relative text-center max-w-md px-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/20">
              <svg
                className="h-10 w-10 text-white"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 0H16V12.0632C15.9663 14.2434 14.1885 16 12.0005 16H0V24H8.68629C10.808 24 12.8429 23.1571 14.3431 21.6569L21.6569 14.3431C23.1571 12.8429 24 10.808 24 8.68629V0Z"
                  fill="currentColor"
                />
                <path
                  d="M16 40H24V27.9368C24.0337 25.7566 25.8115 24 27.9995 24H40V16H31.3137C29.192 16 27.1571 16.8429 25.6569 18.3431L18.3431 25.6569C16.8429 27.1571 16 29.192 16 31.3137V40Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-3">
              Build workflows like you write code
            </h2>
            <p className="text-slate-400">
              Run them like infrastructure. Developer-first automation for
              modern teams.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
