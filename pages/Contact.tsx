import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, ExternalLink } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Construct Mailto Link
    // This opens the default email client with the message pre-filled
    const subject = `Nuevo mensaje de contacto de ${formState.name}`;
    const body = `Nombre: ${formState.name}\nEmail: ${formState.email}\n\nMensaje:\n${formState.message}`;
    const mailtoLink = `mailto:gregoriodiazvelez2@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Trigger the email client
    window.location.href = mailtoLink;
    
    // Show success message in UI
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <div className="bg-forest-800 py-20 text-center text-white relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
         <div className="relative z-10 px-4">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Contáctanos</h1>
            <p className="text-forest-200 text-lg max-w-2xl mx-auto">
              ¿Listo para encontrar tu paraíso? Escríbenos hoy mismo.
            </p>
         </div>
      </div>

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Contact Info */}
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">Ponte en Contacto</h2>
              <p className="text-stone-600 leading-relaxed mb-8">
                Estamos disponibles para responder tus preguntas sobre disponibilidad, precios y cronograma de obra. Agenda una visita a El Retiro para ver el proyecto en persona.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white rounded-lg shadow-sm text-forest-600">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900">Correo Electrónico</h3>
                  <a href="mailto:gregoriodiazvelez2@gmail.com" className="text-forest-700 hover:text-forest-800 transition-colors">
                    gregoriodiazvelez2@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white rounded-lg shadow-sm text-forest-600">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900">Ubicación</h3>
                  <p className="text-stone-600">El Retiro, Antioquia, Colombia</p>
                  <p className="text-sm text-stone-500 mt-1">A 2km del Parque Principal</p>
                </div>
              </div>
              
               <div className="flex items-start space-x-4">
                <div className="p-3 bg-white rounded-lg shadow-sm text-forest-600">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900">Teléfono</h3>
                  <p className="text-stone-600">+57 (300) 123-4567</p>
                  <p className="text-sm text-stone-500 mt-1">Lun-Vie, 9am - 5pm</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-2xl overflow-hidden shadow-lg border border-stone-200">
                <div className="h-64 w-full bg-stone-200 relative">
                  <iframe 
                    title="Ubicación en El Retiro"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d-75.5393086847355!3d6.058769995577678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e469905c1064233%3A0x633390035099309!2sEl%20Retiro%2C%20Antioquia!5e0!3m2!1ses!2sco!4v1645000000000!5m2!1ses!2sco" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy"
                  ></iframe>
                </div>
                <div className="bg-white p-4 flex justify-between items-center">
                  <span className="text-sm font-medium text-stone-600">Abrir en Google Maps</span>
                  <a 
                    href="https://maps.app.goo.gl/ALSTjZ4a9Y3429AL9" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-forest-600 text-white text-sm font-bold rounded-lg hover:bg-forest-700 transition-colors"
                  >
                    <span>Ver Ubicación Exacta</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-stone-100">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">Envíanos un Mensaje</h2>
            
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-fade-in-up">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Send className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-2">¡Mensaje Preparado!</h3>
                <p className="text-stone-600 mb-6">Se ha abierto tu aplicación de correo para enviar el mensaje a gregoriodiazvelez2@gmail.com</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-stone-100 text-stone-700 rounded-lg hover:bg-stone-200 transition-colors"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none transition-all"
                    placeholder="Juan Pérez"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none transition-all"
                    placeholder="juan@ejemplo.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">Mensaje</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none transition-all resize-none"
                    placeholder="Estoy interesado en los lotes..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-lg text-white font-bold text-lg shadow-lg transition-all ${
                    isSubmitting 
                      ? 'bg-stone-400 cursor-not-allowed' 
                      : 'bg-forest-600 hover:bg-forest-700 hover:shadow-forest-600/30'
                  }`}
                >
                  {isSubmitting ? 'Abriendo Correo...' : 'Enviar Mensaje'}
                </button>
                <p className="text-xs text-center text-stone-400 mt-2">
                  Esto abrirá tu cliente de correo predeterminado.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;