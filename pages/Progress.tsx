import React from 'react';
import { ProgressUpdate } from '../types';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

const updates: ProgressUpdate[] = [
  {
    id: 1,
    title: "Vía de Acceso y Portería",
    description: "La pavimentación de la entrada principal y la construcción de la portería están casi completas. El paisajismo ha comenzado.",
    percentage: 90,
    date: "Fase Actual",
    status: 'En Progreso'
  },
  {
    id: 2,
    title: "Infraestructura de Servicios",
    description: "Instalación de redes eléctricas subterráneas, acueducto y fibra óptica en los sectores principales.",
    percentage: 65,
    date: "Fase Actual",
    status: 'En Progreso'
  },
  {
    id: 3,
    title: "Vías Internas - Sector A",
    description: "Movimiento de tierras completado. Compactación de sub-base en progreso. Pavimentación programada para el próximo mes.",
    percentage: 40,
    date: "Fase Actual",
    status: 'En Progreso'
  },
  {
    id: 4,
    title: "Zonas Comunes y Parques",
    description: "Diseño finalizado. La limpieza del terreno para el parque central y senderos comenzará pronto.",
    percentage: 15,
    date: "Próximamente",
    status: 'Próximamente'
  },
  {
    id: 5,
    title: "Permisos y Licencias",
    description: "Todos los permisos ambientales y de construcción han sido aprobados por las autoridades locales.",
    percentage: 100,
    date: "Completado: Ene 2024",
    status: 'Completado'
  }
];

const Progress: React.FC = () => {
  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">Avance de Obra</h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Mantente actualizado con el desarrollo de Lotes El Retiro. Estamos comprometidos con la transparencia y la excelencia en cada paso.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="space-y-12">
          {updates.map((update) => (
            <div key={update.id} className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
              <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
                {/* Visual / Image Placeholder */}
                <div className="w-full md:w-1/3 flex-shrink-0">
                  <div className="aspect-video w-full rounded-lg bg-stone-200 relative overflow-hidden group">
                     <img 
                      src={`https://picsum.photos/seed/${update.id + 50}/800/600`} 
                      alt={update.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-stone-800 shadow-sm">
                      {update.date}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-serif font-bold text-stone-900">{update.title}</h3>
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress;