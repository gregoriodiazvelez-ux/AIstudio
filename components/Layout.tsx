import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, TreePine, Lock } from 'lucide-react';

const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Define which pages should have a transparent navbar at the top
  const transparentNavPaths = ['/', '/why-gaia', '/progress', '/lotes'];
  const isTransparentPage = transparentNavPaths.includes(location.pathname);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  const isActive = (path: string) => location.pathname === path;

  // Dynamic Navbar Styles
  // Scrolled state is now semi-transparent dark gray (glassmorphism)
  // Changed from bg-stone-900/70 to bg-stone-900/40 for even more transparency
  const navBackgroundClass = isTransparentPage && !isScrolled 
    ? 'bg-transparent border-transparent' 
    : 'bg-stone-900/40 backdrop-blur-md border-b border-white/10 shadow-lg';

  const navTextClass = isTransparentPage && !isScrolled 
    ? 'text-white hover:text-forest-200' 
    : 'text-stone-200 hover:text-white';

  const navLogoTextClass = 'text-white';
    
  const navActiveTextClass = isTransparentPage && !isScrolled
    ? 'text-forest-300 font-semibold'
    : 'text-forest-400 font-semibold';

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Por qué Gaia', path: '/why-gaia' },
    { name: 'Avance de Obra', path: '/progress' },
    { name: 'Lotes', path: '/lotes' },
    { name: 'Contacto', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${navBackgroundClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* Left Side: Logo (Fixed width to allow perfect centering of links) */}
            <div className="w-48 flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2 group" onClick={closeMenu}>
                <div className={`p-2 rounded-lg transition-colors ${isTransparentPage && !isScrolled ? 'bg-white/20' : 'bg-forest-600'}`}>
                  <TreePine className={`h-6 w-6 text-white`} />
                </div>
                <span className={`text-2xl font-display font-medium tracking-wide ${navLogoTextClass}`}>
                  Gaia
                </span>
              </Link>
            </div>

            {/* Center: Desktop Menu Links */}
            <div className="hidden md:flex flex-1 justify-center items-center space-x-8 lg:space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm lg:text-base font-medium tracking-wide transition-colors duration-200 ${
                    isActive(link.path) ? navActiveTextClass : navTextClass
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Side: Admin & Mobile Toggle (Fixed width to match Logo side) */}
            <div className="w-48 flex justify-end items-center">
              {/* Admin Lock - Desktop */}
              <div className="hidden md:block">
                 <Link 
                  to="/login" 
                  className={`transition-colors p-2 rounded-full hover:bg-white/10 ${navTextClass}`}
                  aria-label="Admin Login"
                >
                   <Lock className="h-4 w-4" />
                 </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={toggleMenu}
                  className={`p-2 rounded-md focus:outline-none transition-colors ${isTransparentPage && !isScrolled ? 'text-white hover:bg-white/10' : 'text-stone-200 hover:bg-white/10'}`}
                >
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden absolute w-full bg-stone-900/95 backdrop-blur-xl border-b border-stone-800 shadow-lg transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="px-4 pt-2 pb-6 space-y-2 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={`block px-3 py-3 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-forest-900/50 text-forest-300'
                    : 'text-stone-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-stone-800 flex justify-center">
               <Link
                to="/login"
                onClick={closeMenu}
                className="flex items-center px-3 py-3 rounded-md text-base font-medium text-stone-500 hover:bg-white/5 hover:text-stone-300"
              >
                <Lock className="h-4 w-4 mr-2" />
                Acceso Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - Remove top padding on transparent pages so Hero goes under navbar */}
      <main className={`flex-grow ${isTransparentPage ? 'pt-0' : 'pt-20'}`}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-2 mb-4">
                <TreePine className="h-6 w-6 text-forest-400" />
                <span className="text-2xl font-display font-medium text-white">
                  Gaia
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
                <li><Link to="/why-gaia" className="hover:text-forest-400 transition-colors">Por qué Gaia</Link></li>
                <li><Link to="/lotes" className="hover:text-forest-400 transition-colors">Ver Lotes</Link></li>
                <li><Link to="/progress" className="hover:text-forest-400 transition-colors">Avance de Obra</Link></li>
                <li><Link to="/contact" className="hover:text-forest-400 transition-colors">Contacto</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Ubicación y Contacto</h3>
              <ul className="space-y-2 text-sm text-stone-400">
                <li className="flex items-start justify-center md:justify-start">
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
            <p>&copy; {new Date().getFullYear()} Gaia Lotes. Todos los derechos reservados.</p>
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