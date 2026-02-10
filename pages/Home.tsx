import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Map, ShieldCheck } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop" 
            alt="Beautiful nature landscape in Antioquia" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-stone-900/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 tracking-tight animate-fade-in-up">
            Lotes Exclusivos en <br className="hidden md:block" />
            <span className="text-forest-300">El Retiro, Antioquia</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-stone-100 mb-10 font-light leading-relaxed animate-fade-in-up delay-100">
            15 lotes exclusivos rodeados de naturaleza virgen. <br />
            Vive una experiencia ecológica y pacífica.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-200">
            <Link 
              to="/lotes" 
              className="w-full sm:w-auto px-8 py-4 bg-forest-600 hover:bg-forest-500 text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-forest-500/30 flex items-center justify-center"
            >
              Ver Lotes <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/contact" 
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full font-semibold transition-all flex items-center justify-center"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-forest-50 mb-6 text-forest-600">
                <Leaf className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-3">Vida Ecológica</h3>
              <p className="text-stone-600">Diseñado respetando el medio ambiente, con zonas verdes protegidas e infraestructura sostenible.</p>
            </div>
            <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-earth-100 mb-6 text-earth-600">
                <Map className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-3">Ubicación Privilegiada</h3>
              <p className="text-stone-600">Ubicado en el corazón de El Retiro, con un clima perfecto y cercanía a Medellín.</p>
            </div>
            <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-forest-50 mb-6 text-forest-600">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-3">Seguridad y Privacidad</h3>
              <p className="text-stone-600">Una comunidad cerrada que garantiza privacidad y seguridad para ti y tu familia.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Visual Break */}
      <section className="relative h-96">
        <img 
          src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2641&auto=format&fit=crop" 
          alt="Bosque nativo" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-900/40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Un Santuario para la Vida</h2>
            <p className="text-lg text-stone-200">Donde el confort moderno se encuentra con la belleza natural.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;