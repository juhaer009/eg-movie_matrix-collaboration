export default function AddMovie() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Add New Movie</h1>
        <p className="text-zinc-500 mt-2">Upload and configure new cinematic content for your platform.</p>
      </div>
      
      <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-2xl md:rounded-3xl p-5 md:p-8 space-y-6 md:space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-4">
            <label className="text-sm font-bold text-zinc-400 block uppercase tracking-widest">Movie Title</label>
            <input 
              type="text" 
              placeholder="e.g. Inception"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 focus:outline-none focus:border-netflix-red transition-all"
            />
          </div>
          <div className="space-y-4">
             <label className="text-sm font-bold text-zinc-400 block uppercase tracking-widest">Release Year</label>
             <input 
              type="number" 
              placeholder="2024"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 focus:outline-none focus:border-netflix-red transition-all"
            />
          </div>
          <div className="md:col-span-2 space-y-4">
             <label className="text-sm font-bold text-zinc-400 block uppercase tracking-widest">Description</label>
             <textarea 
              rows="4"
              placeholder="A brief overview of the movie plot..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 focus:outline-none focus:border-netflix-red transition-all resize-none"
            />
          </div>
        </div>
        
        <div className="flex border-t border-zinc-800 pt-8 gap-4 justify-end">
          <button className="px-8 py-3 rounded-xl font-bold text-zinc-400 hover:text-white transition-colors">Discard</button>
          <button className="bg-netflix-red hover:bg-netflix-red-hover text-white px-10 py-3 rounded-xl transition-all font-bold shadow-lg shadow-netflix-red/20">
            Publish Content
          </button>
        </div>
      </div>
    </div>
  );
}
