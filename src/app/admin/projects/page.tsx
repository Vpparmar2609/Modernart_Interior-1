"use client";
import { useState, useEffect } from 'react';

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);
  
  // Basic Fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [index, setIndex] = useState('');
  const [tagline, setTagline] = useState('');
  const [location, setLocation] = useState('');
  const [year, setYear] = useState('');
  const [area, setArea] = useState('');
  const [duration, setDuration] = useState('');
  const [hasVideo, setHasVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [heroUrl, setHeroUrl] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  
  // String Lists (Comma separated or Newline)
  const [cats, setCats] = useState('');
  const [scope, setScope] = useState('');
  const [materials, setMaterials] = useState('');
  const [description, setDescription] = useState('');

  // Dynamic Array Fields
  const [images, setImages] = useState<{src: string, cap: string, tall: boolean}[]>([]);
  const [mood, setMood] = useState<{name: string, tone: string}[]>([]);
  const [furniture, setFurniture] = useState<{piece: string, maker: string, room: string}[]>([]);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const uploadToGridFS = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    return data.url;
  };

  const handleHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setHeroUrl(await uploadToGridFS(e.target.files[0]));
  };

  const handlePosterUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setPosterUrl(await uploadToGridFS(e.target.files[0]));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    if (e.target.files?.[0]) {
      const url = await uploadToGridFS(e.target.files[0]);
      const newImages = [...images];
      newImages[idx].src = url;
      setImages(newImages);
    }
  };

  const handleEdit = (p: any) => {
    setEditId(p._id);
    setTitle(p.title || '');
    setSlug(p.slug || '');
    setIndex(p.index || '');
    setTagline(p.tagline || '');
    setLocation(p.location || '');
    setYear(p.year || '');
    setArea(p.area || '');
    setDuration(p.duration || '');
    setHasVideo(!!p.video);
    setVideoUrl(p.video || '');
    setHeroUrl(p.hero || '');
    setPosterUrl(p.poster || '');
    
    setCats(p.cats ? p.cats.join(', ') : '');
    setScope(p.scope ? p.scope.join(', ') : '');
    setMaterials(p.materials ? p.materials.join(', ') : '');
    setDescription(p.description ? p.description.join('\n') : '');

    setImages(p.images || []);
    setMood(p.mood || []);
    setFurniture(p.furniture || []);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditId(null);
    setTitle(''); setSlug(''); setIndex(''); setTagline(''); setLocation(''); setYear(''); setArea(''); setDuration('');
    setHasVideo(false); setVideoUrl(''); setHeroUrl(''); setPosterUrl('');
    setCats(''); setScope(''); setMaterials(''); setDescription('');
    setImages([]); setMood([]); setFurniture([]);
  };

  const handleSubmit = async () => {
    if (!title || !slug || !index) return alert('Please fill in required fields (Title, Slug, Index)');
    
    const parsedCats = cats.split(',').map(s => s.trim()).filter(Boolean);
    const parsedScope = scope.split(',').map(s => s.trim()).filter(Boolean);
    const parsedMaterials = materials.split(',').map(s => s.trim()).filter(Boolean);
    const parsedDesc = description.split('\n').map(s => s.trim()).filter(Boolean);

    const projectData = { 
      title, slug, index, tagline, location, year, area, duration,
      cats: parsedCats, scope: parsedScope, description: parsedDesc, materials: parsedMaterials,
      images, mood, furniture,
      hero: heroUrl, poster: posterUrl, video: videoUrl
    };

    try {
      if (editId) {
        await fetch(`/api/projects/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectData)
        });
        alert('Project updated!');
      } else {
        await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectData)
        });
        alert('Project created!');
      }
      fetchProjects();
      resetForm();
    } catch (err) {
      alert('Failed to save project');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      fetchProjects();
    } catch (err) {
      alert('Failed to delete');
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div>
        <h1 className="text-4xl font-light text-white mb-2">Projects Management</h1>
        <p className="text-neutral-400">Add new projects to your portfolio or manage existing ones.</p>
      </div>
      
      <div className="bg-neutral-950 p-8 rounded-3xl border border-neutral-800 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-light text-amber-500">
            {editId ? `Edit Project: ${title}` : 'Add New Project'}
          </h2>
          {editId && (
            <button onClick={resetForm} className="text-sm text-neutral-400 hover:text-white transition-colors">
              Cancel Edit
            </button>
          )}
        </div>
        
        {/* Basic Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Project Title</label>
              <input className="w-full bg-neutral-900 border border-neutral-800 p-4 rounded-xl text-white focus:border-amber-500" placeholder="Aditya Antilia" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Slug</label>
              <input className="w-full bg-neutral-900 border border-neutral-800 p-4 rounded-xl text-white focus:border-amber-500" placeholder="aditya-antilia" value={slug} onChange={e => setSlug(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Index</label>
              <input className="w-full bg-neutral-900 border border-neutral-800 p-4 rounded-xl text-white focus:border-amber-500" placeholder="01" value={index} onChange={e => setIndex(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Tagline</label>
              <input className="w-full bg-neutral-900 border border-neutral-800 p-4 rounded-xl text-white focus:border-amber-500" placeholder="A beautiful exploration" value={tagline} onChange={e => setTagline(e.target.value)} />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Location</label>
                <input className="w-full bg-neutral-900 border border-neutral-800 p-4 rounded-xl text-white" value={location} onChange={e => setLocation(e.target.value)} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Year</label>
                <input className="w-full bg-neutral-900 border border-neutral-800 p-4 rounded-xl text-white" value={year} onChange={e => setYear(e.target.value)} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Area</label>
                <input className="w-full bg-neutral-900 border border-neutral-800 p-4 rounded-xl text-white" value={area} onChange={e => setArea(e.target.value)} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Duration</label>
                <input className="w-full bg-neutral-900 border border-neutral-800 p-4 rounded-xl text-white" value={duration} onChange={e => setDuration(e.target.value)} />
              </div>
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Hero Image</label>
              <input type="file" className="w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-amber-500/10 file:text-amber-500 hover:file:bg-amber-500/20" onChange={handleHeroUpload} />
              {heroUrl && <p className="text-xs text-green-500 mt-2 truncate">Current: {heroUrl}</p>}
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Poster Image</label>
              <input type="file" className="w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-amber-500/10 file:text-amber-500 hover:file:bg-amber-500/20" onChange={handlePosterUpload} />
              {posterUrl && <p className="text-xs text-green-500 mt-2 truncate">Current: {posterUrl}</p>}
            </div>
          </div>
        </div>

        {/* Text Area / Comma separated fields */}
        <h3 className="text-xl font-light text-white border-b border-neutral-800 pb-2 mb-6">List Fields</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-1">Categories (Comma separated)</label>
            <input className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded-lg text-white text-sm" placeholder="Residential, Interior" value={cats} onChange={e => setCats(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-1">Scope (Comma separated)</label>
            <input className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded-lg text-white text-sm" placeholder="Interior Design, 3D Rendering" value={scope} onChange={e => setScope(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-1">Materials (Comma separated)</label>
            <input className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded-lg text-white text-sm" placeholder="Wood, Stone, Fabric" value={materials} onChange={e => setMaterials(e.target.value)} />
          </div>
          <div>
            <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 mb-2 cursor-pointer w-max">
              <input type="checkbox" checked={hasVideo} onChange={e => { setHasVideo(e.target.checked); if(!e.target.checked) setVideoUrl(''); }} className="accent-amber-500" />
              Include Video Walkthrough
            </label>
            {hasVideo && (
              <input className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded-lg text-white text-sm animate-in fade-in" placeholder="https://..." value={videoUrl} onChange={e => setVideoUrl(e.target.value)} />
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-1">Description (Each line is a paragraph)</label>
            <textarea className="w-full h-32 bg-neutral-900 border border-neutral-800 p-3 rounded-lg text-white text-sm resize-none" value={description} onChange={e => setDescription(e.target.value)} />
          </div>
        </div>

        {/* Dynamic Arrays */}
        <h3 className="text-xl font-light text-white border-b border-neutral-800 pb-2 mb-6">Project Images</h3>
        <div className="space-y-4 mb-8">
          {images.map((img, i) => (
            <div key={i} className="flex gap-4 items-center bg-neutral-900 p-4 rounded-lg border border-neutral-800 flex-wrap">
              <input type="file" className="text-sm w-full md:w-1/3" onChange={(e) => handleImageUpload(e, i)} />
              {img.src && <span className="text-xs text-green-500 truncate max-w-xs">{img.src}</span>}
              <input placeholder="Caption" className="bg-neutral-950 border border-neutral-800 p-2 rounded text-white flex-1 min-w-[200px]" value={img.cap} onChange={e => {
                const newImages = [...images]; newImages[i].cap = e.target.value; setImages(newImages);
              }} />
              <button onClick={() => setImages(images.filter((_, idx) => idx !== i))} className="text-red-500 text-sm">Remove</button>
            </div>
          ))}
          <button onClick={() => setImages([...images, {src: '', cap: '', tall: false}])} className="text-amber-500 text-sm border border-amber-500/50 px-4 py-2 rounded hover:bg-amber-500/10 transition-colors">+ Add Image</button>
        </div>

        <h3 className="text-xl font-light text-white border-b border-neutral-800 pb-2 mb-6">Mood Palette</h3>
        <div className="space-y-4 mb-8">
          {mood.map((m, i) => (
            <div key={i} className="flex gap-4 items-center bg-neutral-900 p-4 rounded-lg border border-neutral-800">
              <input placeholder="Name (e.g. Warm)" className="bg-neutral-950 border border-neutral-800 p-2 rounded text-white flex-1" value={m.name} onChange={e => {
                const newMood = [...mood]; newMood[i].name = e.target.value; setMood(newMood);
              }} />
              <input placeholder="Tone (e.g. #d9cdb4)" className="bg-neutral-950 border border-neutral-800 p-2 rounded text-white flex-1" value={m.tone} onChange={e => {
                const newMood = [...mood]; newMood[i].tone = e.target.value; setMood(newMood);
              }} />
              <button onClick={() => setMood(mood.filter((_, idx) => idx !== i))} className="text-red-500 text-sm">Remove</button>
            </div>
          ))}
          <button onClick={() => setMood([...mood, {name: '', tone: ''}])} className="text-amber-500 text-sm border border-amber-500/50 px-4 py-2 rounded hover:bg-amber-500/10 transition-colors">+ Add Mood</button>
        </div>

        <h3 className="text-xl font-light text-white border-b border-neutral-800 pb-2 mb-6">Furniture Schedule</h3>
        <div className="space-y-4 mb-8">
          {furniture.map((f, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center bg-neutral-900 p-4 rounded-lg border border-neutral-800">
              <input placeholder="Piece" className="bg-neutral-950 border border-neutral-800 p-2 rounded text-white" value={f.piece} onChange={e => {
                const newF = [...furniture]; newF[i].piece = e.target.value; setFurniture(newF);
              }} />
              <input placeholder="Maker" className="bg-neutral-950 border border-neutral-800 p-2 rounded text-white" value={f.maker} onChange={e => {
                const newF = [...furniture]; newF[i].maker = e.target.value; setFurniture(newF);
              }} />
              <input placeholder="Room" className="bg-neutral-950 border border-neutral-800 p-2 rounded text-white" value={f.room} onChange={e => {
                const newF = [...furniture]; newF[i].room = e.target.value; setFurniture(newF);
              }} />
              <button onClick={() => setFurniture(furniture.filter((_, idx) => idx !== i))} className="text-red-500 text-sm place-self-center md:place-self-end">Remove</button>
            </div>
          ))}
          <button onClick={() => setFurniture([...furniture, {piece: '', maker: '', room: ''}])} className="text-amber-500 text-sm border border-amber-500/50 px-4 py-2 rounded hover:bg-amber-500/10 transition-colors">+ Add Furniture</button>
        </div>

        <button onClick={handleSubmit} className="mt-8 px-8 py-4 bg-amber-500 text-neutral-950 font-medium tracking-wide rounded-xl hover:bg-amber-400 transition-all">
          {editId ? 'Update Project' : 'Publish Project'}
        </button>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-light text-white">Existing Projects</h2>
        {loading ? (
          <p className="text-neutral-500">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-neutral-500">No projects found. Add one above or run the data migration.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {projects.map(p => (
              <div key={p._id} className="p-6 bg-neutral-950 border border-neutral-800 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group hover:border-neutral-700 transition-colors">
                <div className="flex items-center gap-6">
                  <span className="text-2xl font-light text-neutral-600">{p.index}</span>
                  <div>
                    <p className="text-xl text-white">{p.title}</p>
                    <p className="text-sm text-neutral-500">/{p.slug}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => handleEdit(p)} className="text-amber-500/50 hover:text-amber-500 transition-colors text-sm uppercase tracking-widest">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(p._id)} className="text-red-500/50 hover:text-red-500 transition-colors text-sm uppercase tracking-widest">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
