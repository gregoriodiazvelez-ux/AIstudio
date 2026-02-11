import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Map, ShieldCheck, CheckCircle2 } from 'lucide-react';

const Home: React.FC = () => {
  // State to manage image sources with fallbacks
  // If you put 'foto-familia.jpg' in the public folder, it will load.
  // Otherwise, it falls back to the Unsplash URL.
  const [familyImg, setFamilyImg] = useState('/foto-familia.jpg');
  const [dogImg, setDogImg] = useState('/foto-alana.jpg');

  const handleFamilyImgError = () => {
    setFamilyImg('https://images.unsplash.com/photo-1591189320250-9324cd9051fb?q=80&w=1000&auto=format&fit=crop');
  };

  const handleDogImgError = () => {
    setDogImg('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&auto=format&fit=crop');
  };

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
          <h1 className="text-7xl sm:text-8xl md:text-[10rem] font-display font-normal mb-2 tracking-wide animate-fade-in-up">
            Gaia
          </h1>
          <p className="max-w-3xl mx-auto text-2xl sm:text-3xl md:text-4xl text-stone-100 mb-6 font-display italic leading-relaxed animate-fade-in-up delay-100">
            Vivir en armonía con el silencio
          </p>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-stone-200 mb-10 font-light tracking-wide animate-fade-in-up delay-200">
            15 lotes exclusivos rodeados de naturaleza virgen en El Retiro, Antioquia
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Feature 1: Vida Ecológica */}
            <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-forest-50 mb-6 text-forest-600">
                  <Leaf className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-display font-semibold text-stone-900">Vida Ecológica</h3>
              </div>
              <ul className="space-y-4 text-stone-600 text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-forest-500 flex-shrink-0 mt-0.5" />
                  <span>Vías amplias en afirmado con desagüe.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-forest-500 flex-shrink-0 mt-0.5" />
                  <span>Iluminación de carga solar en zonas comunes.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-forest-500 flex-shrink-0 mt-0.5" />
                  <span>Acceso a acueducto y energía a borde de lote.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-forest-500 flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-forest-700">Todos los lotes se entregan con explanación.</span>
                </li>
              </ul>
            </div>

            {/* Feature 2: Ubicación */}
            <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-earth-100 mb-6 text-earth-600">
                  <Map className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-display font-semibold text-stone-900">Ubicación Privilegiada</h3>
              </div>
              <ul className="space-y-4 text-stone-600 text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-earth-500 flex-shrink-0 mt-0.5" />
                  <span>Punto estratégico entre La Ceja y El Retiro.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-earth-500 flex-shrink-0 mt-0.5" />
                  <span>A 18 minutos del parque de El Retiro.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-earth-500 flex-shrink-0 mt-0.5" />
                  <span>A 20 minutos del parque de La Ceja.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-earth-500 flex-shrink-0 mt-0.5" />
                  <span>Sobre la vereda La Amapola, vecina de Pantanillo.</span>
                </li>
              </ul>
            </div>

            {/* Feature 3: Seguridad */}
            <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-forest-50 mb-6 text-forest-600">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-display font-semibold text-stone-900">Seguridad y Privacidad</h3>
              </div>
              <ul className="space-y-4 text-stone-600 text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-forest-500 flex-shrink-0 mt-0.5" />
                  <span>Comunidad cerrada que garantiza privacidad.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-forest-500 flex-shrink-0 mt-0.5" />
                  <span>Acceso controlado y monitoreo inteligente.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-forest-500 flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-forest-700">Todos los propietarios tendrán acceso a la app de monitoreo de cámaras.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Gaia Concept Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Images */}
            <div className="relative">
              {/* Main Tall Image */}
              <div className="w-full h-[600px] bg-stone-200 overflow-hidden shadow-lg relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1200&auto=format&fit=crop" 
                  alt="Bosque de árboles altos" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Overlapping Small Image */}
              <div className="absolute -bottom-10 -right-4 md:-right-10 w-64 h-64 bg-stone-300 z-20 border-8 border-white shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=800&auto=format&fit=crop" 
                  alt="Detalle naturaleza musgo" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Column: Typography */}
            <div className="lg:pl-8 mt-12 lg:mt-0">
              {/* Overline */}
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-stone-800"></div>
                <span className="text-xs font-bold tracking-[0.2em] text-stone-600 uppercase">
                  Concepto de vida consciente
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-5xl md:text-6xl font-display text-stone-900 mb-10 leading-[1.1]">
                <span className="italic font-normal">El lujo</span> de lo esencial y <span className="italic font-normal">la pausa</span> necesaria.
              </h2>

              {/* Text Content */}
              <div className="prose prose-stone text-stone-600 text-lg leading-relaxed">
                <p className="mb-6">
                  <span className="float-left text-6xl font-display text-stone-300 leading-[0.8] pr-3 pt-2">E</span>
                  n el susurro del viento entre los robles y el aroma a tierra húmeda tras la lluvia, encontramos el verdadero significado de hogar. Nuestro proyecto nace del respeto absoluto por los ciclos naturales de la cordillera.
                </p>
                <p>
                  Hemos trazado 15 refugios exclusivos donde la arquitectura se rinde ante el paisaje. No se trata de construir sobre la tierra, sino de pertenecer a ella, integrando cada parcela en el ecosistema místico de los bosques de niebla de El Retiro.
                </p>
              </div>

              {/* Quote */}
              <blockquote className="mt-10 mb-12">
                <p className="text-2xl font-display italic text-forest-700">
                  "Habitar el silencio es reencontrarse con el origen."
                </p>
              </blockquote>

              {/* Footer Info */}
              <div className="grid grid-cols-2 gap-8 border-t border-stone-100 pt-8">
                <div>
                  <h4 className="text-xs font-bold tracking-widest text-stone-800 uppercase mb-2">Sostenibilidad</h4>
                  <p className="text-sm text-stone-500">Preservación del bosque nativo y corredores biológicos.</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-widest text-stone-800 uppercase mb-2">Exclusividad</h4>
                  <p className="text-sm text-stone-500">Solo 15 parcelas diseñadas para la privacidad absoluta y el bienestar.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Quiénes Somos Section */}
      <section className="py-24 bg-stone-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Text Column (Left) */}
            <div className="order-2 lg:order-1">
               <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-forest-600"></div>
                <span className="text-xs font-bold tracking-[0.2em] text-forest-700 uppercase">
                  Nuestra Historia
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display text-stone-900 mb-8">
                Quiénes somos
              </h2>
              <div className="prose prose-stone text-stone-600 text-lg leading-relaxed space-y-4">
                <p>
                  Somos la familia Díaz, un proyecto construido desde lo familiar y lo auténtico. Lina, Mauricio, Martín, Gregorio y Alana —nuestra perrita y embajadora oficial de la marca— compartimos el amor por la naturaleza y la vida tranquila.
                </p>
                <p>
                  Este proyecto nace de nuestra conexión con El Retiro, un lugar que disfrutamos en familia, donde Alana es la primera en correr libremente por las mangas del lote y recordarnos todos los días por qué soñamos con crear espacios para vivir, respirar y disfrutar con calma.
                </p>
              </div>
            </div>

            {/* Image Collage Column (Right) */}
            <div className="relative order-1 lg:order-2 flex justify-center lg:block">
              {/* Main Image - Familia */}
              <div className="w-full max-w-md lg:max-w-full h-[450px] bg-stone-200 rounded-2xl overflow-hidden shadow-xl relative z-10">
                <img 
                  src={familyImg}
                  onError={handleFamilyImgError}
                  alt="Familia disfrutando de la naturaleza" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Overlapping Small Image (Dog) - Alana */}
              <div className="absolute -bottom-12 -left-4 lg:-left-12 w-56 h-56 bg-stone-100 rounded-xl z-20 border-4 border-white shadow-2xl overflow-hidden transform -rotate-6">
                 <img 
                  src={dogImg}
                  onError={handleDogImgError}
                  alt="Alana corriendo libre" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Decorative Element */}
              <div className="absolute top-10 -right-10 w-24 h-24 bg-forest-100 rounded-full opacity-50 z-0"></div>
            </div>

          </div>
        </div>
      </section>
      
      {/* Visual Break (Last Image) */}
      <section className="relative h-96">
        <img 
          src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2641&auto=format&fit=crop" 
          alt="Bosque nativo" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-900/40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Un Santuario para la Vida</h2>
            <p className="text-lg text-stone-200">Donde el confort moderno se encuentra con la belleza natural.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;