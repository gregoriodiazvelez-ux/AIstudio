import React, { useState } from 'react';
import { Lot, LotStatus } from '../types';
import { useLots } from '../context/LotContext';
import { X, ZoomIn, MapPin, Image as ImageIcon } from 'lucide-react';

/**
 * ==========================================
 * CONFIGURACIÓN DE COORDENADAS
 * ==========================================
 * Estas coordenadas se mantienen fijas porque dependen de la imagen del mapa.
 */
const lotCoordinates = [
  { top: 40, left: 50 }, // Lote 1 (Centro)
  { top: 55, left: 35 }, // Lote 2
  { top: 30, left: 45 }, // Lote 3
  { top: 65, left: 45 }, // Lote 4
  { top: 45, left: 65 }, // Lote 5
  { top: 25, left: 60 }, // Lote 6
  { top: 75, left: 30 }, // Lote 7
  { top: 20, left: 30 }, // Lote 8
  { top: 50, left: 80 }, // Lote 9
  { top: 80, left: 60 }, // Lote 10
  { top: 15, left: 75 }, // Lote 11
  { top: 35, left: 20 }, // Lote 12
  { top: 60, left: 15 }, // Lote 13
  { top: 85, left: 45 }, // Lote 14
  { top: 10, left: 50 }, // Lote 15
];

const Lotes: React.FC = () => {
  const { lots } = useLots(); // Consuming dynamic data from context
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);
  
  // Lógica de carga de imágenes en cascada
  const [imgSrc, setImgSrc] = useState('/Actual Map.jpg');
  const [loadStep, setLoadStep] = useState(0);

  const handleImageError = () => {
    if (loadStep === 0) {
      setImgSrc('/plano-topografico.png');
      setLoadStep(1);
    } else if (loadStep === 1) {
      setImgSrc('https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2940&auto=format&fit=crop');
      setLoadStep(2);
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
      {/* Header */}
      <div className="bg-white border-b border-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">Mapa de Lotes</h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Explora nuestro plano interactivo. Selecciona un número para ver los detalles, disponibilidad y precios de cada lote.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-forest-600 shadow-sm border border-stone-200"></span>
              <span className="text-sm font-medium text-stone-600">Disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-amber-500 shadow-sm border border-stone-200"></span>
              <span className="text-sm font-medium text-stone-600">Reservado</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-stone-400 shadow-sm border border-stone-200"></span>
              <span className="text-sm font-medium text-stone-600">Vendido</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Map Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white p-4 rounded-3xl shadow-xl border border-stone-100">
          
          {/* Map Container */}
          <div className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden bg-stone-100 group">
            
            <img 
              src={imgSrc}
              onError={handleImageError}
              alt="Plano del Proyecto" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            
            {/* Aviso si se está usando la imagen de respaldo */}
            {loadStep === 2 && (
              <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded text-xs text-stone-500 border border-stone-200 shadow-sm z-20">
                Mostrando plano de ejemplo (Agrega 'plano-topografico.jpg' en public/)
              </div>
            )}

            {/* Map Title Overlay */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-sm border border-stone-100 hidden sm:block z-20">
              <h3 className="font-serif font-bold text-stone-800 flex items-center gap-2">
                <ZoomIn className="h-4 w-4 text-forest-600" />
                Plano General
              </h3>
            </div>

            {/* Interactive Pins */}
            {lots.map((lot, index) => {
               // Use index safely to get coordinates. Ensure we don't go out of bounds if lots > coords
               const coords = lotCoordinates[index] || { top: 50, left: 50 };
               return (
                <button
                  key={lot.id}
                  onClick={() => setSelectedLot(lot)}
                  className={`absolute w-8 h-8 md:w-10 md:h-10 -ml-4 -mt-4 rounded-full flex items-center justify-center text-xs md:text-sm font-bold transition-all duration-300 z-10 shadow-lg ${getStatusColor(lot.status)}`}
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
          <p className="text-center text-sm text-stone-400 mt-4 flex items-center justify-center gap-2">
            <MapPin className="h-4 w-4" />
            Haz clic en los indicadores numéricos sobre el mapa para ver la ficha del lote.
          </p>
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
                  <h2 className="text-3xl font-serif font-bold">Lote {selectedLot.id}</h2>
                </div>
              </div>
              
              <div className="p-8">
                <div className="hidden md:block mb-6">
                  <h2 className="text-3xl font-serif font-bold text-stone-900">Lote {selectedLot.id}</h2>
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
                    <div className="flex justify-between items-center pt-2 border-t border-stone-200">
                      <span className="text-stone-500 text-sm">Precio</span>
                      <span className="text-xl font-bold text-forest-700">{selectedLot.price}</span>
                    </div>
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
