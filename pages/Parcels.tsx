import React, { useState } from 'react';
import { Lot, LotStatus } from '../types';
import { useLots } from '../context/LotContext';
import { X, ZoomIn, MapPin, ChevronRight, Info, TrendingUp } from 'lucide-react';

/**
 * ==========================================
 * CONFIGURACIÓN DE COORDENADAS
 * ==========================================
 * Coordenadas ajustadas al plano topográfico visual.
 * Basado en la distribución de 15 lotes en el mapa wireframe.
 */
const lotCoordinates = [
  { top: 15, left: 9 },   // Lote 1: Extremo Izquierdo Superior
  { top: 28, left: 11 },  // Lote 2: Extremo Izquierdo Inferior
  { top: 15, left: 20 },  // Lote 3: Izquierda Interior Superior
  { top: 22, left: 32 },  // Lote 4: El "Puente" o Cuello
  { top: 32, left: 46 },  // Lote 5: Centro Superior
  { top: 18, left: 60 },  // Lote 6: Superior Derecha (Alto)
  { top: 18, left: 75 },  // Lote 7: Esquina Superior Derecha
  { top: 38, left: 66 },  // Lote 8: Centro Derecha (Bajo el 6)
  { top: 45, left: 85 },  // Lote 9: Punta Extrema Derecha
  { top: 60, left: 45 },  // Lote 10: Grande Vertical Izquierda (Abajo del camino)
  { top: 55, left: 58 },  // Lote 11: Centro (Abajo del camino)
  { top: 52, left: 75 },  // Lote 12: Derecha Media (Bajo el 7)
  { top: 72, left: 80 },  // Lote 13: Esquina Inferior Derecha
  { top: 82, left: 68 },  // Lote 14: Borde Inferior Derecha
  { top: 78, left: 55 },  // Lote 15: Borde Inferior Centro
];

const Lotes: React.FC = () => {
  const { lots } = useLots();
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);
  
  // Imagen por defecto del plano topográfico
  const [imgSrc, setImgSrc] = useState('public/ChatGPT Image Feb 10, 2026, 07_20_45 PM.png');
  const [imgError, setImgError] = useState(false);

  // Statistics Calculation
  const totalLotsBase = 15; 
  const soldLots = lots.filter(l => l.status === LotStatus.SOLD).length;
  const percentSold = Math.round((soldLots / totalLotsBase) * 100);

  // SVG Circle Calculations
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentSold / 100) * circumference;

  const handleImageError = () => {
    // Si falla la imagen local, usar una imagen externa confiable
    if (!imgError) {
      setImgError(true);
      // Usamos una imagen de mapa abstracto de Unsplash que carga rápido
      setImgSrc('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000');
    }
  };

  const getStatusColor = (status: LotStatus) => {
    switch (status) {
      case LotStatus.AVAILABLE: return 'bg-forest-600 text-white border-2 border-white hover:bg-forest-700 hover:scale-110 shadow-lg';
      case LotStatus.RESERVED: return 'bg-amber-500 text-white border-2 border-white hover:bg-amber-600 hover:scale-110 shadow-lg';
      case LotStatus.SOLD: return 'bg-stone-400 text-stone-100 border-2 border-stone-200 cursor-not-allowed opacity-90';
      default: return 'bg-stone-300 text-stone-800';
    }
  };
  
  const getStatusBadgeColor = (status: LotStatus) => {
    switch (status) {
      case LotStatus.AVAILABLE: return 'bg-forest-100 text-forest-800 border-forest-200';
      case LotStatus.RESERVED: return 'bg-amber-100 text-amber-800 border-amber-200';
      case LotStatus.SOLD: return 'bg-stone-100 text-stone-500 border-stone-200';
      default: return 'bg-stone-100 text-stone-800';
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mb-12">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2600" 
            alt="Green mountains landscape" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[2px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-display font-normal mb-4 tracking-wide animate-fade-in-up">
            Mapa de Lotes
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl font-light text-stone-100 animate-fade-in-up delay-100">
             Explora nuestro plano interactivo. Selecciona un número en el mapa o en la lista para ver todos los detalles.
          </p>
        </div>
      </section>

      {/* Main Content: Map & List Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Map (Takes up 2/3) */}
          <div className="lg:col-span-2 space-y-4">
             {/* Map Legend (Mobile Only) */}
             <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-forest-600 shadow-sm"></span>
                  <span className="text-xs font-medium text-stone-600">Disponible</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500 shadow-sm"></span>
                  <span className="text-xs font-medium text-stone-600">Reservado</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-stone-400 shadow-sm"></span>
                  <span className="text-xs font-medium text-stone-600">Vendido</span>
                </div>
              </div>

            <div className="bg-white p-2 rounded-3xl shadow-xl border border-stone-100 relative group overflow-hidden min-h-[400px] flex items-center justify-center bg-stone-100">
               <img 
                  src={imgSrc}
                  onError={handleImageError}
                  alt="Plano del Proyecto" 
                  className="w-full h-auto object-contain block rounded-2xl" 
                />
                
                {/* Aviso si se está usando la imagen de respaldo */}
                {imgError && (
                  <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded text-xs text-stone-500 border border-stone-200 shadow-sm z-20">
                    Mapa Referencial
                  </div>
                )}

                 {/* Interactive Pins */}
                {lots.map((lot, index) => {
                   const coords = lotCoordinates[index] || { top: 50, left: 50 };
                   return (
                    <button
                      key={lot.id}
                      onClick={() => setSelectedLot(lot)}
                      className={`absolute w-8 h-8 md:w-10 md:h-10 -ml-4 -mt-4 rounded-full flex items-center justify-center text-xs md:text-sm font-bold transition-all duration-300 z-10 shadow-lg transform hover:scale-110 ${getStatusColor(lot.status)}`}
                      style={{ 
                        top: `${coords.top}%`, 
                        left: `${coords.left}%` 
                      }}
                      aria-label={`Ver detalles del Lote ${lot.id}`}
                    >
                      {lot.id}
                    </button>
                   );
                })}
            </div>
            <p className="text-center lg:text-left text-sm text-stone-400 mt-2 flex items-center justify-center lg:justify-start gap-2">
                <MapPin className="h-4 w-4" />
                Haz clic en los pines para ver detalles.
            </p>
          </div>

          {/* RIGHT COLUMN: Statistics & List Summary (Takes up 1/3) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Sales Success Circle Card */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-stone-100 flex items-center justify-between relative overflow-hidden">
               <div className="relative z-10">
                 <div className="flex items-center gap-2 mb-1 text-forest-700">
                    <TrendingUp className="h-5 w-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">Éxito en Ventas</span>
                 </div>
                 <h3 className="text-xl font-display font-medium text-stone-900 leading-tight mb-1">
                   Lotes Vendidos
                 </h3>
                 <p className="text-sm text-stone-500 font-light">
                   Desde Junio 2026
                 </p>
               </div>

               {/* Circular Progress */}
               <div className="relative w-24 h-24 flex-shrink-0">
                 <svg className="w-full h-full -rotate-90" viewBox="0 0 88 88">
                   {/* Background Circle */}
                   <circle 
                      cx="44" cy="44" r={radius} 
                      fill="none" 
                      stroke="#e7e5e4" 
                      strokeWidth="6" 
                    />
                   {/* Progress Circle */}
                   <circle 
                      cx="44" cy="44" r={radius} 
                      fill="none" 
                      stroke="#238d4b" 
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-1000 ease-out"
                    />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-forest-800">
                   <span className="text-xl font-bold font-display">{percentSold}%</span>
                 </div>
               </div>
               
               {/* Decorative background element */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-forest-50 rounded-full blur-3xl -z-0 opacity-50 translate-x-10 -translate-y-10"></div>
            </div>

            {/* Inventory List */}
            <div className="bg-white rounded-2xl shadow-lg border border-stone-100 overflow-hidden h-[600px] flex flex-col">
              <div className="p-6 border-b border-stone-100 bg-stone-50/50">
                <h2 className="text-xl font-display font-medium text-stone-900 flex items-center gap-2">
                  Inventario de Lotes
                  <span className="text-xs font-sans font-normal bg-stone-200 text-stone-600 px-2 py-0.5 rounded-full">{lots.length}</span>
                </h2>
              </div>
              
              <div className="overflow-y-auto flex-grow p-2 space-y-2 custom-scrollbar">
                {lots.map((lot) => (
                  <button
                    key={lot.id}
                    onClick={() => setSelectedLot(lot)}
                    className="w-full text-left p-4 rounded-xl hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-200 group flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-stone-800 text-base">Lote {lot.id}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide font-bold ${getStatusBadgeColor(lot.status)}`}>
                          {lot.status}
                        </span>
                      </div>
                      <div className="text-sm text-stone-500 flex gap-3">
                         <span>{lot.size}</span>
                         {lot.status === LotStatus.AVAILABLE && <span className="text-forest-600 font-medium">{lot.price}</span>}
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-stone-300 group-hover:text-forest-600 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Modal */}
      {selectedLot && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity animate-fade-in"
            onClick={() => setSelectedLot(null)}
          ></div>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden animate-fade-in-up">
            <button 
              onClick={() => setSelectedLot(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 backdrop-blur rounded-full text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-auto">
                <img 
                  src={selectedLot.image} 
                  alt={`Lote ${selectedLot.id}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
                <div className="absolute bottom-4 left-4 md:hidden text-white">
                  <h2 className="text-3xl font-display font-medium">Lote {selectedLot.id}</h2>
                </div>
              </div>
              
              <div className="p-8">
                <div className="hidden md:block mb-6">
                  <h2 className="text-3xl font-display font-medium text-stone-900">Lote {selectedLot.id}</h2>
                  <div className="mt-2 inline-block">
                     <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadgeColor(selectedLot.status)}`}>
                      {selectedLot.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-2">Descripción</h4>
                    <p className="text-stone-600 leading-relaxed text-sm">
                      {selectedLot.description}
                    </p>
                  </div>

                  <div className="bg-stone-50 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-stone-500 text-sm">Área Total</span>
                      <span className="text-lg font-bold text-stone-800">{selectedLot.size}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-stone-500 text-sm">Topografía</span>
                      <span className="text-stone-800 font-medium text-sm">Mixta (Plana y Ondulada)</span>
                    </div>
                    {/* Hide price if not available */}
                    {selectedLot.status === LotStatus.AVAILABLE && (
                      <div className="flex justify-between items-center pt-2 border-t border-stone-200">
                        <span className="text-stone-500 text-sm">Precio</span>
                        <span className="text-xl font-bold text-forest-700">{selectedLot.price}</span>
                      </div>
                    )}
                  </div>

                  {selectedLot.status === LotStatus.AVAILABLE ? (
                    <a 
                      href={`mailto:gregoriodiazvelez2@gmail.com?subject=Consulta sobre Lote ${selectedLot.id}`}
                      className="block w-full py-4 bg-forest-700 hover:bg-forest-800 text-white text-center rounded-xl font-bold transition-colors shadow-lg shadow-forest-700/20"
                    >
                      Consultar por este Lote
                    </a>
                  ) : (
                    <div className="w-full py-4 bg-stone-100 text-stone-400 text-center rounded-xl font-medium cursor-not-allowed">
                      {selectedLot.status === LotStatus.SOLD ? 'Vendido' : 'Actualmente Reservado'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lotes;
