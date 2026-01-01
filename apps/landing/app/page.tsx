export default function Home() {
  return (
    <main className="bg-[#0B0E14] text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[#4F8CFF]">
            Automation Without Limits
          </h1>
          <p className="text-xl md:text-2xl text-[#9CA3AF] mb-8 leading-relaxed">
            InfinityX is the developer-first platform for building, deploying, and monitoring automated workflows.
            Connect your APIs, run complex sequences, and get real-time insights.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#" className="px-8 py-3 bg-[#4F8CFF] hover:bg-[#3D6BC4] rounded-lg font-semibold transition-colors">
              Get Started →
            </a>
            <a href="#" className="px-8 py-3 border border-[#4F8CFF] text-[#4F8CFF] hover:bg-[#4F8CFF] hover:text-white rounded-lg font-semibold transition-colors">
              Watch Demo
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#111827] px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Why InfinityX?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '⚡', title: 'Lightning Fast', desc: 'Execute complex workflows in milliseconds with optimized HTTP calls.' },
              { icon: '🔒', title: 'Secure & Reliable', desc: 'Enterprise-grade security with JWT auth and comprehensive audit logs.' },
              { icon: '🔌', title: 'Easy Integration', desc: 'Connect any HTTP API. No complex SDK needed. Just configure and go.' },
              { icon: '📊', title: 'Real-time Monitoring', desc: 'Track every step execution with detailed logs and error reporting.' },
              { icon: '🚀', title: 'Scalable', desc: 'From single requests to millions of automated workflows daily.' },
              { icon: '🛠️', title: 'Developer Friendly', desc: 'Clean API, TypeScript support, and intuitive dashboard.' },
            ].map((feature, i) => (
              <div key={i} className="bg-[#1F2937] border border-[#374151] rounded-lg p-6 hover:border-[#4F8CFF] transition-colors">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-[#9CA3AF]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="space-y-8">
            {[
              { step: '1', title: 'Create a Project', desc: 'Organize your automations in projects for better management.' },
              { step: '2', title: 'Build a Workflow', desc: 'Define sequential HTTP steps that execute one after another.' },
              { step: '3', title: 'Trigger & Monitor', desc: 'Start workflows via API or webhooks. Monitor execution in real-time.' },
              { step: '4', title: 'Scale with Confidence', desc: 'Your workflows scale automatically. Handle thousands of concurrent runs.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-[#4F8CFF] rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-[#9CA3AF] text-lg">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-20 bg-[#111827] px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to automate?</h2>
          <p className="text-xl text-[#9CA3AF] mb-8">
            Join hundreds of developers building powerful automations with InfinityX.
          </p>
          <a href="#" className="inline-block px-8 py-4 bg-[#4F8CFF] hover:bg-[#3D6BC4] rounded-lg font-semibold transition-colors text-lg">
            Start for Free
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1F2937] py-8 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-[#9CA3AF]">
          <p>© 2024 InfinityX. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#4F8CFF]">Docs</a>
            <a href="#" className="hover:text-[#4F8CFF]">Status</a>
            <a href="#" className="hover:text-[#4F8CFF]">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
