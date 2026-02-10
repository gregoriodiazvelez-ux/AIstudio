import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, TreePine, Lock } from 'lucide-react';

const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Avance de Obra', path: '/progress' },
    { name: 'Lotes', path: '/lotes' },
    { name: 'Contacto', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-stone-200 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link to="/" className="flex items-center space-x-2 group" onClick={closeMenu}>
              <div className="p-2 bg-forest-700 rounded-lg group-hover:bg-forest-800 transition-colors">
                <TreePine className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-serif font-bold text-stone-800 tracking-tight">
                Lotes <span className="text-forest-700">El Retiro</span>
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-forest-600 ${
                    isActive(link.path) ? 'text-forest-700 font-semibold' : 'text-stone-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-l border-stone-200 pl-8 ml-4">
                 <Link 
                  to="/login" 
                  className="text-stone-400 hover:text-forest-600 transition-colors"
                  aria-label="Admin Login"
                >
                   <Lock className="h-4 w-4" />
                 </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-stone-600 hover:text-stone-900 focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden absolute w-full bg-white border-b border-stone-200 shadow-lg transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={`block px-3 py-3 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-forest-50 text-forest-700'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-stone-100">
               <Link
                to="/login"
                onClick={closeMenu}
                className="flex items-center px-3 py-3 rounded-md text-base font-medium text-stone-500 hover:bg-stone-50 hover:text-stone-900"
              >
                <Lock className="h-4 w-4 mr-2" />
                Acceso Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <TreePine className="h-6 w-6 text-forest-400" />
                <span className="text-lg font-serif font-bold text-white">
                  Lotes El Retiro
                </span>
              </div>
              <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
                Lotes premium ecológicos rodeados de la impresionante naturaleza de Antioquia. Construye la casa de tus sueños en armonía con el medio ambiente.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Navegación</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-forest-400 transition-colors">Inicio</Link></li>
                <li><Link to="/lotes" className="hover:text-forest-400 transition-colors">Ver Lotes</Link></li>
                <li><Link to="/progress" className="hover:text-forest-400 transition-colors">Avance de Obra</Link></li>
                <li><Link to="/contact" className="hover:text-forest-400 transition-colors">Contacto</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Ubicación y Contacto</h3>
              <ul className="space-y-2 text-sm text-stone-400">
                <li className="flex items-start">
                  <span className="block">El Retiro, Antioquia, Colombia</span>
                </li>
                <li>
                  <a href="mailto:gregoriodiazvelez2@gmail.com" className="hover:text-forest-400 transition-colors">
                    gregoriodiazvelez2@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500">
            <p>&copy; {new Date().getFullYear()} Lotes El Retiro. Todos los derechos reservados.</p>
            <Link to="/login" className="mt-2 md:mt-0 text-stone-600 hover:text-stone-400 transition-colors flex items-center gap-1">
              <Lock className="w-3 h-3" /> Acceso Administrativo
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;