import React, { createContext, useContext, useState, useEffect } from 'react';
import { Lot, LotStatus, ProgressUpdate } from '../types';

interface LotContextType {
  lots: Lot[];
  progressUpdates: ProgressUpdate[];
  updateLot: (id: number, updates: Partial<Lot>) => void;
  updateProgress: (id: number, updates: Partial<ProgressUpdate>) => void;
  resetData: () => void;
}

const LotContext = createContext<LotContextType | undefined>(undefined);

// Initial default data generation for Lots
const generateInitialLots = (): Lot[] => {
  return Array.from({ length: 15 }, (_, i) => {
    const id = i + 1;
    let status = LotStatus.AVAILABLE;
    if ([2, 5, 8, 12].includes(id)) status = LotStatus.SOLD;
    if ([3, 7, 14].includes(id)) status = LotStatus.RESERVED;

    return {
      id,
      size: `${2000 + (id * 50)} m²`,
      price: status === LotStatus.SOLD ? 'Vendido' : `$${350 + (id * 10)} Millones COP`,
      status,
      description: `El Lote ${id} cuenta con una ubicación privilegiada en el proyecto. Ofrece una topografía ideal para la construcción y vistas panorámicas del bosque nativo circundante.`,
      image: `https://picsum.photos/seed/${id * 100}/600/400`,
    };
  });
};

// Initial default data for Progress
const generateInitialProgress = (): ProgressUpdate[] => [
  {
    id: 1,
    title: "Vía de Acceso y Portería",
    description: "La pavimentación de la entrada principal y la construcción de la portería están casi completas. El paisajismo ha comenzado.",
    percentage: 90,
    date: "Fase Actual",
    status: 'En Progreso',
    images: [
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621905251189-08b95d50c00f?q=80&w=1000&auto=format&fit=crop"
    ]
  },
  {
    id: 2,
    title: "Infraestructura de Servicios",
    description: "Instalación de redes eléctricas subterráneas, acueducto y fibra óptica en los sectores principales.",
    percentage: 65,
    date: "Fase Actual",
    status: 'En Progreso',
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605218427306-0343d6114e44?q=80&w=1000&auto=format&fit=crop"
    ]
  },
  {
    id: 3,
    title: "Vías Internas - Sector A",
    description: "Movimiento de tierras completado. Compactación de sub-base en progreso. Pavimentación programada para el próximo mes.",
    percentage: 40,
    date: "Fase Actual",
    status: 'En Progreso',
    images: [
      "https://images.unsplash.com/photo-1590486803833-1c5dc8ce84ac?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534237710431-e2fc698436d0?q=80&w=1000&auto=format&fit=crop"
    ]
  },
  {
    id: 4,
    title: "Zonas Comunes y Parques",
    description: "Diseño finalizado. La limpieza del terreno para el parque central y senderos comenzará pronto.",
    percentage: 15,
    date: "Próximamente",
    status: 'Próximamente',
    images: [
       "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000&auto=format&fit=crop"
    ]
  },
  {
    id: 5,
    title: "Permisos y Licencias",
    description: "Todos los permisos ambientales y de construcción han sido aprobados por las autoridades locales.",
    percentage: 100,
    date: "Completado: Ene 2024",
    status: 'Completado',
    images: [
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1000&auto=format&fit=crop"
    ]
  }
];

export const LotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Lots State
  const [lots, setLots] = useState<Lot[]>(() => {
    const saved = localStorage.getItem('el-retiro-lots-data');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return generateInitialLots();
  });

  // Progress State
  const [progressUpdates, setProgressUpdates] = useState<ProgressUpdate[]>(() => {
    const saved = localStorage.getItem('el-retiro-progress-data');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return generateInitialProgress();
  });

  // Persistence
  useEffect(() => {
    localStorage.setItem('el-retiro-lots-data', JSON.stringify(lots));
  }, [lots]);

  useEffect(() => {
    localStorage.setItem('el-retiro-progress-data', JSON.stringify(progressUpdates));
  }, [progressUpdates]);

  // Updaters
  const updateLot = (id: number, updates: Partial<Lot>) => {
    setLots(prevLots => 
      prevLots.map(lot => lot.id === id ? { ...lot, ...updates } : lot)
    );
  };

  const updateProgress = (id: number, updates: Partial<ProgressUpdate>) => {
    setProgressUpdates(prev => 
      prev.map(item => {
        if (item.id !== id) return item;
        
        // Auto-update status based on percentage logic ONLY if status is NOT explicitly provided
        let newStatus = item.status;
        
        if (updates.status) {
          newStatus = updates.status;
        } else if (updates.percentage !== undefined) {
           if (updates.percentage >= 100) newStatus = 'Completado';
           else if (updates.percentage > 0) newStatus = 'En Progreso';
           else newStatus = 'Próximamente';
        }

        return { ...item, status: newStatus, ...updates };
      })
    );
  };

  const resetData = () => {
    setLots(generateInitialLots());
    setProgressUpdates(generateInitialProgress());
  };

  return (
    <LotContext.Provider value={{ lots, progressUpdates, updateLot, updateProgress, resetData }}>
      {children}
    </LotContext.Provider>
  );
};

export const useLots = () => {
  const context = useContext(LotContext);
  if (context === undefined) {
    throw new Error('useLots must be used within a LotProvider');
  }
  return context;
};