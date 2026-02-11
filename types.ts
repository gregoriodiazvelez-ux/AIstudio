export enum LotStatus {
  AVAILABLE = 'Disponible',
  RESERVED = 'Reservado',
  SOLD = 'Vendido'
}

export interface Lot {
  id: number;
  size: string; // e.g., "2,500 m²"
  price: string; // e.g., "$450,000,000 COP"
  status: LotStatus;
  description: string;
  image: string;
  coordinates?: { top: number; left: number }; // Percentage coordinates for map
}

export interface ProgressUpdate {
  id: number;
  title: string;
  description: string;
  percentage: number;
  date: string;
  status: 'Completado' | 'En Progreso' | 'Próximamente';
  images: string[]; // Array of image URLs for the gallery
}