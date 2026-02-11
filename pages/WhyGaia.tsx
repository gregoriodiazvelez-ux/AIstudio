import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Leaf, ShieldCheck, DollarSign, Sun, Car, Smartphone, CheckCircle2, ArrowRight } from 'lucide-react';

const WhyGaia: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?auto=format&fit=crop&q=80&w=2600" 
            alt="Deep forest in Antioquia" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[2px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-display font-normal mb-6 tracking-wide animate-fade-in-up">
            Por qué Gaia
          </h1>
          <p className="max-w-2xl mx-auto text-xl md:text-2xl font-light tracking-wide text-stone-100 animate-fade-in-up delay-100">
            Más que un lote, una inversión inteligente en calidad de vida y futuro.
          </p>
        </div>
      </section>

      {/* Intro Text */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-stone-600 text-lg md:text-xl leading-relaxed font-serif italic">
            "Hemos diseñado Gaia pensando en el equilibrio perfecto entre la rentabilidad financiera y la riqueza natural. Cada detalle responde a una necesidad moderna de vivir mejor, más seguro y en armonía con el entorno."
          </p>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

          {/* 1. Precio */}
          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 group">
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <DollarSign className="h-7 w-7 text-forest-600" />
            </div>
            <h3 className="text-2xl font-display font-bold text-stone-900 mb-4">El Mejor Precio del Sector</h3>
            <p className="text-stone-600 leading-relaxed mb-6">
              Hemos realizado un estudio exhaustivo de mercado y podemos afirmar con confianza que tenemos el mejor precio por metro cuadrado de toda la zona.
            </p>
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
              <p className="text-sm font-medium text-stone-800 flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-forest-600 flex-shrink-0" />
                <span>Desafío de valor: Si encuentras una opción más económica con características similares, háznolo saber.</span>
              </p>
            </div>
          </div>

          {/* 2. Sostenibilidad */}
          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 group">
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Leaf className="h-7 w-7 text-forest-600" />
            </div>
            <h3 className="text-2xl font-display font-bold text-stone-900 mb-4">Sostenibilidad Real</h3>
            <p className="text-stone-600 leading-relaxed mb-6">
              Nos enfocamos en el mínimo impacto ambiental posible. El diseño respeta la topografía y la flora existente.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-stone-600 text-sm">
                <Sun className="h-5 w-5 text-amber-500 flex-shrink-0" />
                <span>Iluminación solar en zonas comunes para eficiencia energética.</span>
              </li>
              <li className="flex items-start gap-3 text-stone-600 text-sm">
                <Car className="h-5 w-5 text-stone-500 flex-shrink-0" />
                <span>Vías en afirmado construidas con todos los estándares normativos. Tienen el ancho suficiente para dos carros, pero su estética rústica se mezcla con la belleza del entorno.</span>
              </li>
            </ul>
          </div>

          {/* 3. Seguridad */}
          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 group">
            <div className="w-14 h-14 bg-stone-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="h-7 w-7 text-stone-700" />
            </div>
            <h3 className="text-2xl font-display font-bold text-stone-900 mb-4">Seguridad Colaborativa</h3>
            <p className="text-stone-600 leading-relaxed mb-6">
              La tranquilidad es nuestra prioridad. Implementamos tecnología moderna para cuidarnos entre todos.
            </p>
            <div className="flex items-center gap-4 bg-stone-50 p-4 rounded-xl border border-stone-200">
              <Smartphone className="h-8 w-8 text-forest-600" />
              <div>
                <h4 className="font-bold text-stone-800 text-sm">Acceso Remoto Total</h4>
                <p className="text-xs text-stone-500">Cámaras CCTV a las que todos los propietarios tienen acceso desde su celular.</p>
              </div>
            </div>
          </div>

          {/* 4. Valorización */}
          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 group">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <TrendingUp className="h-7 w-7 text-blue-600" />
            </div>
            <h3 className="text-2xl font-display font-bold text-stone-900 mb-4">Alta Valorización</h3>
            <p className="text-stone-600 leading-relaxed mb-6">
              El Retiro es una de las ciudades del oriente antioqueño con mayor proyección de crecimiento y calidad de vida.
            </p>
            <div className="relative h-32 bg-stone-50 rounded-xl overflow-hidden border border-stone-200 flex items-center justify-center">
              {/* Abstract Chart Graphic */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-100 to-transparent opacity-50"></div>
              <svg className="w-full h-full absolute inset-0 text-blue-500" viewBox="0 0 100 50" preserveAspectRatio="none">
                <path d="M0,50 L20,40 L40,45 L60,20 L80,25 L100,0 L100,50 Z" fill="currentColor" fillOpacity="0.1" />
                <path d="M0,50 L20,40 L40,45 L60,20 L80,25 L100,0" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              <p className="relative z-10 text-center px-4 text-sm font-medium text-stone-700">
                Con nuestros precios de entrada, tu terreno tendrá una valorización muy por encima del promedio del mercado.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-forest-900 py-20 mt-auto">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display text-white mb-6">
            ¿Listo para hacer una inversión inteligente?
          </h2>
          <p className="text-forest-200 mb-10 text-lg">
            Agenda una visita y comprueba por ti mismo la magia y el potencial de Gaia.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/lotes" 
              className="px-8 py-4 bg-white text-forest-900 rounded-full font-bold hover:bg-forest-50 transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              Ver Disponibilidad <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-4 bg-transparent border border-white text-white rounded-full font-bold hover:bg-white/10 transition-colors"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyGaia;