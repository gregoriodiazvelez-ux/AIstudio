import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock authentication
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-200">
        <div className="bg-forest-800 p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-forest-700 rounded-full flex items-center justify-center mb-4 text-white">
            <Lock className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-white">Panel Administrativo</h2>
          <p className="text-forest-200 text-sm mt-2">Ingresa tus credenciales para gestionar lotes</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200 text-center">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Usuario</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-stone-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none transition-all"
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Contraseña</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-stone-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-forest-600 hover:bg-forest-700 text-white font-bold rounded-lg shadow-md transition-colors"
            >
              Iniciar Sesión
            </button>
          </form>
          
          <div className="mt-6 text-center text-xs text-stone-400">
            <p>Credenciales demo: admin / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;