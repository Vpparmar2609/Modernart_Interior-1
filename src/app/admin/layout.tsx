import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-900 text-white flex font-sans">
      <aside className="w-64 bg-neutral-950 p-8 flex flex-col gap-8 border-r border-neutral-800">
        <div>
          <h2 className="text-2xl font-light tracking-widest text-amber-500">STUDIO</h2>
          <p className="text-xs text-neutral-500 mt-1 tracking-wider">ADMINISTRATION</p>
        </div>
        <nav className="flex flex-col gap-2">
          <Link href="/admin" className="px-4 py-3 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white transition-all">
            Dashboard
          </Link>
          <Link href="/admin/projects" className="px-4 py-3 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white transition-all">
            Projects
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-12 overflow-y-auto bg-neutral-900/50">
        {children}
      </main>
    </div>
  );
}
