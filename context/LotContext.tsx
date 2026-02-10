import React, { createContext, useContext, useState, useEffect } from 'react';
import { Lot, LotStatus } from '../types';

interface LotContextType {
  lots: Lot[];
  updateLot: (id: number, updates: Partial<Lot>) => void;
  resetData: () => void;
}

const LotContext = createContext<LotContextType | undefined>(undefined);

// Initial default data generation
const generateInitialLots = (): Lot[] => {
  return Array.from({ length: 15 }, (_, i) => {
    const id = i + 1;
    let status = LotStatus.AVAILABLE;
    // Default initial states based on original code
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

export const LotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lots, setLots] = useState<Lot[]>(() => {
    // Try to load from local storage first
    const saved = localStorage.getItem('el-retiro-lots-data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing lots data", e);
      }
    }
    return generateInitialLots();
  });

  // Save to local storage whenever lots change
  useEffect(() => {
    localStorage.setItem('el-retiro-lots-data', JSON.stringify(lots));
  }, [lots]);

  const updateLot = (id: number, updates: Partial<Lot>) => {
    setLots(prevLots => 
      prevLots.map(lot => lot.id === id ? { ...lot, ...updates } : lot)
    );
  };

  const resetData = () => {
    const initial = generateInitialLots();
    setLots(initial);
  };

  return (
    <LotContext.Provider value={{ lots, updateLot, resetData }}>
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
