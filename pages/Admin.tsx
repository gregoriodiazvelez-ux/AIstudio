import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLots } from '../context/LotContext';
import { LotStatus } from '../types';
import { RefreshCw, LayoutDashboard, Home, HardHat } from 'lucide-react';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const { lots, updateLot, progressUpdates, updateProgress, resetData } = useLots();
  
  // State for Lot Editing
  const [editingId, setEditingId] = useState<number | null>(null);
  const [tempData, setTempData] = useState<{price: string, status: LotStatus} | null>(null);

  // State for Progress Editing
  const [editingProgressId, setEditingProgressId] = useState<number | null>(null);
  const [tempProgressData, setTempProgressData] = useState<{
    percentage: number;
    description: string;
    date: string;
    status: 'Completado' | 'En Progreso' | 'Próximamente';
  } | null>(null);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/login');
    }
  }, [navigate]);

  // --- Lot Handlers ---
  const startEdit = (lot: any) => {
    setEditingId(lot.id);
    setTempData({ price: lot.price, status: lot.status });
  };

  const saveEdit = (id: number) => {
    if (tempData) {
      updateLot(id, tempData);
      setEditingId(null);
      setTempData(null);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTempData(null);
  };

  // --- Progress Handlers ---
  const startEditProgress = (item: any) => {
    setEditingProgressId(item.id);
    setTempProgressData({ 
      percentage: item.percentage, 
      description: item.description,
      date: item.date,
      status: item.status
    });
  };

  const saveEditProgress = (id: number) => {
    if (tempProgressData) {
      updateProgress(id, tempProgressData);
      setEditingProgressId(null);
      setTempProgressData(null);
    }
  };

  const cancelEditProgress = () => {
    setEditingProgressId(null);
    setTempProgressData(null);
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Admin Header */}
      <div className="bg-stone-900 text-white py-6 px-4 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <LayoutDashboard className="h-6 w-6 text-forest-400" />
            <h1 className="text-xl font-bold font-serif">Panel de Control</h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-stone-400 hover:text-white transition-colors text-sm"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Ver Sitio Web</span>
            </Link>
            {/* Logout button removed per request */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-12">
        
        {/* --- SECCIÓN LOTES --- */}
        <div>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl font-bold text-stone-800">Gestión de Lotes</h2>
              <p className="text-stone-600">Edita los precios y el estado de disponibilidad.</p>
            </div>
            <button 
              onClick={() => {
                if(window.confirm('¿Estás seguro? Esto restaurará todos los datos a los valores originales.')) {
                  resetData();
                }
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-stone-300 rounded-lg text-sm font-medium text-stone-600 hover:bg-stone-50"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Restaurar Datos</span>
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-stone-200">
                <thead className="bg-stone-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Lote</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Área</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Precio</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-stone-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-stone-200">
                  {lots.map((lot) => (
                    <tr key={lot.id} className={editingId === lot.id ? "bg-forest-50" : "hover:bg-stone-50"}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 flex-shrink-0 bg-stone-200 rounded flex items-center justify-center font-bold text-stone-600 text-xs">
                            {lot.id}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-stone-900">Lote {lot.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
                        {lot.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingId === lot.id ? (
                          <input 
                            type="text" 
                            value={tempData?.price} 
                            onChange={(e) => setTempData({...tempData!, price: e.target.value})}
                            className="w-full px-3 py-2 bg-white border border-stone-300 rounded shadow-sm text-stone-900 focus:ring-2 focus:ring-forest-500 outline-none text-sm"
                          />
                        ) : (
                          <span className="text-sm font-medium text-stone-900">{lot.price}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingId === lot.id ? (
                          <select 
                            value={tempData?.status}
                            onChange={(e) => setTempData({...tempData!, status: e.target.value as LotStatus})}
                            className="w-full px-3 py-2 bg-white border border-stone-300 rounded shadow-sm text-stone-900 focus:ring-2 focus:ring-forest-500 outline-none text-sm"
                          >
                            {Object.values(LotStatus).map((status) => (
                              <option key={status} value={status}>{status}</option>
                            ))}
                          </select>
                        ) : (
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${lot.status === LotStatus.AVAILABLE ? 'bg-green-100 text-green-800' : 
                              lot.status === LotStatus.RESERVED ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-stone-100 text-stone-800'}`}>
                            {lot.status}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {editingId === lot.id ? (
                          <div className="flex justify-end space-x-2">
                            <button onClick={() => saveEdit(lot.id)} className="text-forest-600 hover:text-forest-900 font-bold bg-white px-3 py-1 rounded border border-forest-200 shadow-sm">Guardar</button>
                            <button onClick={cancelEdit} className="text-stone-500 hover:text-stone-700 bg-white px-3 py-1 rounded border border-stone-200 shadow-sm">Cancelar</button>
                          </div>
                        ) : (
                          <button onClick={() => startEdit(lot)} className="text-stone-500 hover:text-forest-600">Editar</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* --- SECCIÓN PROGRESO --- */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <HardHat className="h-6 w-6 text-amber-500" />
            <div>
              <h2 className="text-2xl font-bold text-stone-800">Avance de Obra</h2>
              <p className="text-stone-600">Actualiza el porcentaje, fecha, estado y descripción de las fases.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-stone-200">
                <thead className="bg-stone-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider w-1/5">Fase y Estado</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider w-1/6">Datos</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Descripción</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-stone-500 uppercase tracking-wider w-24">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-stone-200">
                  {progressUpdates.map((item) => (
                    <tr key={item.id} className={editingProgressId === item.id ? "bg-amber-50" : "hover:bg-stone-50"}>
                      <td className="px-6 py-4 align-top">
                        <span className="font-medium text-stone-900 block mb-2">{item.title}</span>
                        {editingProgressId === item.id ? (
                          <select
                            value={tempProgressData?.status}
                            onChange={(e) => setTempProgressData({...tempProgressData!, status: e.target.value as any})}
                            className="w-full text-xs px-2 py-2 bg-white border border-stone-300 rounded shadow-sm text-stone-900 focus:ring-2 focus:ring-amber-500 outline-none"
                          >
                            <option value="En Progreso">En Progreso</option>
                            <option value="Completado">Completado</option>
                            <option value="Próximamente">Próximamente</option>
                          </select>
                        ) : (
                          <span className={`text-xs px-2 py-0.5 rounded-full inline-block
                            ${item.status === 'Completado' ? 'bg-green-100 text-green-800' : 
                              item.status === 'En Progreso' ? 'bg-amber-100 text-amber-800' : 'bg-stone-100 text-stone-500'}`}>
                            {item.status}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 align-top space-y-3">
                        {/* Percentage */}
                        <div>
                          <label className="text-[10px] uppercase text-stone-400 font-bold block mb-1">Avance</label>
                          {editingProgressId === item.id ? (
                             <div className="flex items-center gap-1">
                               <input 
                                type="number" 
                                min="0" max="100"
                                value={tempProgressData?.percentage} 
                                onChange={(e) => setTempProgressData({...tempProgressData!, percentage: Number(e.target.value)})}
                                className="w-16 px-2 py-1 bg-white border border-stone-300 rounded shadow-sm text-stone-900 focus:ring-2 focus:ring-amber-500 outline-none text-sm"
                              />
                              <span className="text-stone-500 text-sm">%</span>
                             </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <div className="w-full bg-stone-200 rounded-full h-1.5 max-w-[60px]">
                                <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                              </div>
                              <span className="text-sm font-bold text-stone-700">{item.percentage}%</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Date */}
                        <div>
                           <label className="text-[10px] uppercase text-stone-400 font-bold block mb-1">Fecha</label>
                           {editingProgressId === item.id ? (
                             <input 
                                type="text"
                                value={tempProgressData?.date} 
                                onChange={(e) => setTempProgressData({...tempProgressData!, date: e.target.value})}
                                className="w-full px-2 py-1 bg-white border border-stone-300 rounded shadow-sm text-stone-900 focus:ring-2 focus:ring-amber-500 outline-none text-sm"
                                placeholder="Ej: Oct 2024"
                              />
                           ) : (
                             <span className="text-sm text-stone-600 block">{item.date}</span>
                           )}
                        </div>
                      </td>
                      <td className="px-6 py-4 align-top">
                        {editingProgressId === item.id ? (
                          <textarea 
                            value={tempProgressData?.description} 
                            onChange={(e) => setTempProgressData({...tempProgressData!, description: e.target.value})}
                            rows={4}
                            className="w-full px-2 py-2 bg-white border border-stone-300 rounded shadow-sm text-stone-900 focus:ring-2 focus:ring-amber-500 outline-none text-sm resize-none"
                          />
                        ) : (
                          <span className="text-sm text-stone-600 line-clamp-3 leading-relaxed">{item.description}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap align-top">
                        {editingProgressId === item.id ? (
                          <div className="flex flex-col space-y-2 items-end">
                            <button onClick={() => saveEditProgress(item.id)} className="text-amber-600 hover:text-amber-900 font-bold bg-white px-3 py-1 rounded border border-amber-200 shadow-sm">Guardar</button>
                            <button onClick={cancelEditProgress} className="text-stone-500 hover:text-stone-700 bg-white px-3 py-1 rounded border border-stone-200 shadow-sm">Cancelar</button>
                          </div>
                        ) : (
                          <button onClick={() => startEditProgress(item)} className="text-stone-500 hover:text-amber-600">Editar</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Admin;