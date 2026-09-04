export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <h1 className="text-5xl font-light tracking-tight text-white">Dashboard</h1>
      <p className="text-lg text-neutral-400 max-w-2xl">
        Welcome to the Studio Administration Panel. Here you can manage your portfolio projects and handle content updates dynamically.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <div className="p-8 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-amber-500/50 transition-colors group">
          <h3 className="text-2xl font-light text-white mb-2 group-hover:text-amber-500 transition-colors">Projects</h3>
          <p className="text-neutral-400 mb-6">Manage your luxury interior portfolio.</p>
          <a href="/admin/projects" className="inline-flex items-center text-sm uppercase tracking-widest text-amber-500 hover:text-amber-400">
            Manage Projects &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
