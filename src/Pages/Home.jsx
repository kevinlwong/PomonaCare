import { Link } from "react-router-dom";
import { useState } from "react";
import HoverFeatureItem from "../components/HoverFeatureItem";


function HoverTranslateButton({ to, en, es, color }) {
    const [hovered, setHovered] = useState(false);
  
    return (
      <Link
        to={to}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`transition-transform duration-500 ease-out px-6 py-3 rounded-md text-lg font-medium text-center ${color} hover:scale-105 w-72 overflow-hidden`}
      >
        <div className="relative h-6">
          {/* English Text */}
          <span
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              hovered ? "opacity-0" : "opacity-100"
            }`}
          >
            {en}
          </span>
  
          {/* Spanish Text with 100ms delay */}
          <span
            className={`absolute inset-0 transition-opacity duration-300 ease-in-out delay-200 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          >
            {es}
          </span>
        </div>
      </Link>
    );
  }
  

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white pt-24 px-6 md:px-12">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold mb-4">
          Welcome to <span className="text-purple-600">PomonaCare AI</span>
        </h1>
        <h2 className="font-heading text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-2">
          Salud accesible e inclusiva para todos.
        </h2>
        <p className="font-heading text-md md:text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
          An AI-powered app that helps Spanish-speaking families in Pomona
          better understand their health and find nearby care.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-4">

            
          <HoverTranslateButton
            to="/chatbot"
            en="🧠 Try the Health Chatbot"
            es="🧠 Probar el Chat de Salud"
            color="font-heading bg-purple-600 hover:bg-purple-700 text-white hover:text-purple-200"
          />
          <HoverTranslateButton
            to="/translatedocuments"
            en="📄 Translate a Document"
            es="📄 Traducir un Documento"
            color="font-heading bg-gray-100 hover:bg-gray-200 hover:text-purple-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          />
          <HoverTranslateButton
            to="/symptomtocare"
            en="🩺 Use Symptom Checker"
            es="🩺 Verificar Síntomas"
            color="font-heading bg-green-600 hover:bg-green-700 text-white hover:text-purple-200"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-4xl mx-auto">
        <h3 className="font-heading text-2xl font-bold mb-4 text-center">
          What PomonaCare AI Offers / Lo que ofrecemos
        </h3>
        <ul className="font-heading space-y-4 text-left">
  <HoverFeatureItem
    icon="🧑🏽‍⚕️"
    en={<><strong>Health Q&A in Spanish & English</strong> - Chat with an AI that explains health info in your preferred language.</>}
    es={<><strong>Preguntas de Salud en Español e Inglés</strong> - Habla con una IA que explica información médica en tu idioma preferido.</>}
  />
  <HoverFeatureItem
    icon="📍"
    en={<><strong>Nearby Clinic Recommendations</strong> - Find low-cost care based on symptoms and zip code.</>}
    es={<><strong>Clínicas Cercanas</strong> - Encuentra atención médica económica según tus síntomas y código postal.</>}
  />
  <HoverFeatureItem
    icon="📘"
    en={<><strong>Simple Explanations of Medical Terms</strong> - Understand what prescriptions or diagnoses mean.</>}
    es={<><strong>Explicaciones Simples</strong> - Entiende qué significan recetas o diagnósticos.</>}
  />
  <HoverFeatureItem
    icon="📄"
    en={<><strong>Document Translation</strong> - Instantly translate prescriptions or medical instructions into Spanish.</>}
    es={<><strong>Traducción de Documentos</strong> - Traduce recetas o instrucciones médicas al instante.</>}
  />
  <HoverFeatureItem
    icon="🤝"
    en={<><strong>Community Connection</strong> - Link to local health events, clinics, and support services.</>}
    es={<><strong>Conexión Comunitaria</strong> - Encuentra eventos, clínicas y servicios de apoyo locales.</>}
  />
</ul>

      </section>
    </div>
  );
}
