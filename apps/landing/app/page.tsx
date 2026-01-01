"use client";

import { useState } from "react";

const features = [
  {
    title: "Sequential Workflows",
    description:
      "Build workflows with ordered steps that execute in sequence. Add HTTP requests, transforms, and more.",
  },
  {
    title: "Webhook Triggers",
    description:
      "Trigger workflows via HTTP webhooks. Integrate with any service that can make HTTP requests.",
  },
  {
    title: "Real-time Observability",
    description:
      "Monitor workflow executions in real-time. View detailed logs for every step.",
  },
  {
    title: "Developer-First",
    description:
      "Built for developers. Clean API, structured logs, and predictable behavior.",
  },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setEmail("");
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <img src="/inflogo.svg" alt="InfinityX" className="h-8 w-auto" />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#how"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              How It Works
            </a>
            <a
              href="#waitlist"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              Waitlist
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="px-6 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
              Login
            </button>
            <button className="px-6 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              Now in Private Beta
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Build workflows like
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                you write code
              </span>
            </h1>

            <p className="text-xl md:text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Run them like infrastructure. Developer-first workflow automation
              with real-time observability built in.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                Start Building
                <span>→</span>
              </button>
              <a
                href="#features"
                className="w-full sm:w-auto px-8 py-3 border border-slate-700 hover:border-slate-600 rounded-lg font-semibold transition-colors"
              >
                See Features
              </a>
            </div>

            {/* Code Preview */}
            <div className="mt-16 max-w-4xl mx-auto">
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-1 shadow-2xl shadow-blue-500/5">
                <div className="rounded-lg bg-slate-950 border border-slate-800 overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 bg-slate-900/50">
                    <div className="flex gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                      <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                    </div>
                    <span className="text-xs text-slate-500 ml-2">
                      workflow-builder.ts
                    </span>
                  </div>

                  <div className="p-6 font-mono text-sm overflow-x-auto">
                    <div className="space-y-2">
                      <div>
                        <span className="text-blue-400">const</span>{" "}
                        <span className="text-slate-200">workflow</span>{" "}
                        <span className="text-slate-600">=</span>{" "}
                        <span className="text-blue-400">new</span>{" "}
                        <span className="text-green-400">Workflow</span>
                        <span className="text-slate-600">(</span>
                        <span className="text-orange-400">"user-sync"</span>
                        <span className="text-slate-600">)</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-slate-600">.</span>
                        <span className="text-cyan-400">step</span>
                        <span className="text-slate-600">(</span>
                        <span className="text-orange-400">"fetch-users"</span>
                        <span className="text-slate-600">,</span>{" "}
                        <span className="text-blue-400">async</span>{" "}
                        <span className="text-slate-600">() =&gt;</span> {"{"}
                      </div>
                      <div className="pl-8">
                        <span className="text-blue-400">return</span>{" "}
                        <span className="text-cyan-400">fetch</span>
                        <span className="text-slate-600">(</span>
                        <span className="text-orange-400">
                          "https://api.example.com/users"
                        </span>
                        <span className="text-slate-600">)</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-slate-600">{"}"}</span>
                        <span className="text-slate-600">)</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-slate-600">.</span>
                        <span className="text-cyan-400">step</span>
                        <span className="text-slate-600">(</span>
                        <span className="text-orange-400">"sync-to-db"</span>
                        <span className="text-slate-600">,</span>{" "}
                        <span className="text-blue-400">async</span>
                        <span className="text-slate-600">(ctx) =&gt;</span>{" "}
                        {"{...}"}
                        <span className="text-slate-600">)</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-slate-600">.</span>
                        <span className="text-green-400">trigger</span>
                        <span className="text-slate-600">(</span>
                        <span className="text-orange-400">"webhook"</span>
                        <span className="text-slate-600">)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 md:py-32 border-t border-slate-800/50"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything you need to automate
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Built for developers who demand reliability and visibility into
              every execution.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-900/70 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-400 mb-4 group-hover:bg-blue-500/20 transition-colors flex items-center justify-center font-bold">
                  {"→"}
                </div>
                <h3 className="font-semibold mb-2 text-lg">{feature.title}</h3>
                <p className="text-sm text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-20 md:py-32 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            How It Works
          </h2>

          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Create a Project",
                desc: "Organize your automations in projects for better management and collaboration.",
              },
              {
                step: "02",
                title: "Build a Workflow",
                desc: "Define sequential HTTP steps that execute one after another with full visibility.",
              },
              {
                step: "03",
                title: "Trigger & Monitor",
                desc: "Start workflows via API or webhooks. Monitor execution in real-time with detailed logs.",
              },
              {
                step: "04",
                title: "Scale with Confidence",
                desc: "Your workflows scale automatically. Handle thousands of concurrent runs without breaking a sweat.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                  {item.step}
                </div>
                <div className="pt-2">
                  <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section
        id="waitlist"
        className="py-20 md:py-32 border-t border-slate-800/50"
      >
        <div className="max-w-2xl mx-auto px-4 md:px-6 text-center">
          <div className="w-16 h-16 mx-auto mb-8">
            <img src="/xlogo.svg" alt="InfinityX" className="h-16 w-16" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Join the Waitlist
          </h2>
          <p className="text-lg text-slate-400 mb-8">
            Be the first to know when we launch. Early access for developers who
            want to build reliable automation.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-2 text-green-400 bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-3 w-fit mx-auto">
              <span className="text-lg">✓</span>
              <span className="font-medium">You're on the list!</span>
            </div>
          ) : (
            <form
              onSubmit={handleWaitlist}
              className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
            >
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Join
                <span>→</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <img
                  src="/inflogo.svg"
                  alt="InfinityX"
                  className="h-8 w-auto"
                />
              </div>
            </div>

            <p className="text-sm text-slate-500">
              © 2026 InfinityX. Developer-first workflow automation.
            </p>

            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                Docs
              </a>
              <a
                href="#"
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                Status
              </a>
              <a
                href="#"
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
