import React, { useState } from 'react';
import { useLots } from '../context/LotContext';
import { ProgressUpdate } from '../types';
import { CheckCircle2, Circle, Clock, ArrowRight, X, Image as ImageIcon } from 'lucide-react';

const Progress: React.FC = () => {
  const { progressUpdates } = useLots();
  const [selectedProgress, setSelectedProgress] = useState<ProgressUpdate | null>(null);

  // Close modal with ESC key
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProgress(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mb-12">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?q=80&w=2670&auto=format&fit=crop" 
            alt="River in nature" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[2px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 tracking-wide animate-fade-in-up">
            Avance de Obra
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl font-light text-stone-100 animate-fade-in-up delay-100">
             Mantente actualizado con el desarrollo de Gaia. Haz clic en cada etapa para ver la galería fotográfica.
          </p>
        </div>
      </section>

      {/* List of Progress Items */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {progressUpdates.map((update) => (
            <div 
              key={update.id} 
              onClick={() => setSelectedProgress(update)}
              className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden cursor-pointer group hover:shadow-xl hover:border-forest-200 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
                {/* Visual / Image Placeholder */}
                <div className="w-full md:w-1/3 flex-shrink-0">
                  <div className="aspect-video w-full rounded-lg bg-stone-200 relative overflow-hidden">
                     {/* Use the first image from the array, or a fallback */}
                     <img 
                      src={update.images?.[0] || `https://picsum.photos/seed/${update.id + 50}/800/600`} 
                      alt={update.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                    
                    {/* Badge */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-stone-800 shadow-sm z-10">
                      {update.date}
                    </div>

                    {/* Gallery hint */}
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur px-2 py-1 rounded-md text-xs text-white flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ImageIcon className="h-3 w-3" />
                      <span>Ver Galería</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow flex flex-col justify-center">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-serif font-bold text-stone-900 group-hover:text-forest-700 transition-colors">
                      {update.title}
                    </h3>
                    <div className="flex-shrink-0 ml-4">
                      {update.status === 'Completado' && <CheckCircle2 className="h-6 w-6 text-forest-600" />}
                      {update.status === 'En Progreso' && <Clock className="h-6 w-6 text-amber-500" />}
                      {update.status === 'Próximamente' && <Circle className="h-6 w-6 text-stone-300" />}
                    </div>
                  </div>
                  
                  <p className="text-stone-600 mb-6 leading-relaxed">
                    {update.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span className={
                        update.status === 'Completado' ? 'text-forest-700' : 
                        update.status === 'En Progreso' ? 'text-stone-800' : 'text-stone-400'
                      }>
                        Avance
                      </span>
                      <span className="text-stone-900">{update.percentage}%</span>
                    </div>
                    <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${
                          update.status === 'Completado' ? 'bg-forest-500' : 
                          update.status === 'Próximamente' ? 'bg-stone-300' : 'bg-gradient-to-r from-forest-500 to-amber-400'
                        }`}
                        style={{ width: `${update.percentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center text-forest-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                    Ver fotos del avance <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Screen Image Gallery Modal */}
      {selectedProgress && (
        <div className="fixed inset-0 z-[100] bg-stone-900 overflow-y-auto animate-fade-in">
          {/* Header Fixed */}
          <div className="fixed top-0 left-0 right-0 z-10 bg-stone-900/90 backdrop-blur-md border-b border-stone-800 px-4 py-4 flex justify-between items-center">
            <div>
              <h2 className="text-white text-xl font-serif font-bold">{selectedProgress.title}</h2>
              <p className="text-stone-400 text-sm">{selectedProgress.date} • {selectedProgress.percentage}% Completado</p>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProgress(null);
              }}
              className="p-2 rounded-full bg-stone-800 text-white hover:bg-stone-700 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Gallery Content */}
          <div className="max-w-7xl mx-auto px-4 pt-24 pb-12 min-h-screen">
            {selectedProgress.images && selectedProgress.images.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedProgress.images.map((img, index) => (
                  <div key={index} className="break-inside-avoid mb-6 rounded-lg overflow-hidden bg-stone-800 shadow-2xl group relative">
                    <img 
                      src={img} 
                      alt={`Foto avance ${index + 1}`}
                      className="w-full h-auto object-cover transition-opacity duration-300 hover:opacity-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-lg"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[60vh] text-stone-500">
                <ImageIcon className="h-16 w-16 mb-4 opacity-50" />
                <p>No hay imágenes disponibles para esta etapa.</p>
              </div>
            )}
            
            <div className="mt-12 text-center">
              <button 
                onClick={() => setSelectedProgress(null)}
                className="px-8 py-3 bg-stone-800 hover:bg-stone-700 text-white rounded-full font-medium transition-colors border border-stone-700"
              >
                Volver al listado
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Progress;