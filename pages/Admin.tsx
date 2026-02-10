import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLots } from '../context/LotContext';
import { LotStatus } from '../types';
import { Save, LogOut, RefreshCw, LayoutDashboard, Home } from 'lucide-react';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const { lots, updateLot, resetData } = useLots();
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Local state for the row currently being edited
  const [tempData, setTempData] = useState<{price: string, status: LotStatus} | null>(null);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

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

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Admin Header */}
      <div className="bg-stone-900 text-white py-6 px-4 shadow-md">
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
            
            <div className="h-4 w-px bg-stone-700"></div>

            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 text-stone-400 hover:text-red-400 transition-colors text-sm"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold text-stone-800">Gestión de Lotes</h2>
            <p className="text-stone-600">Edita los precios y el estado de disponibilidad de los lotes.</p>
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
                        <div className="h-10 w-10 flex-shrink-0 bg-stone-200 rounded-lg flex items-center justify-center font-bold text-stone-600">
                          {lot.id}
                        </div>
                        <div className="ml-4">
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
                          className="w-full px-2 py-1 border border-stone-300 rounded focus:ring-2 focus:ring-forest-500 outline-none text-sm"
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
                          className="w-full px-2 py-1 border border-stone-300 rounded focus:ring-2 focus:ring-forest-500 outline-none text-sm bg-white"
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
                          <button 
                            onClick={() => saveEdit(lot.id)}
                            className="text-forest-600 hover:text-forest-900 bg-white border border-forest-200 px-3 py-1 rounded hover:bg-forest-50"
                          >
                            Guardar
                          </button>
                          <button 
                            onClick={cancelEdit}
                            className="text-stone-500 hover:text-stone-700 px-2"
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => startEdit(lot)}
                          className="text-forest-600 hover:text-forest-900"
                        >
                          Editar
                        </button>
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
  );
};

export default Admin;