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
      <div className="relative w-full h-fit text-center py-4">
        {/* Keeps button height consistent */}
        <span className="invisible absolute inset-0 flex items-center justify-center whitespace-nowrap">
          {en.length > es.length ? en : es}
        </span>

        {/* English */}
        <span
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out ${
            hovered ? "opacity-0" : "opacity-100"
          }`}
        >
          {en}
        </span>

        {/* Spanish */}
        <span
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out delay-200 ${
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
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white pt-24 px-6 md:px-12 transition-colors duration-300">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
          Welcome to{" "}
          <span className="text-purple-600 dark:text-purple-400">
            PomonaCare AI
          </span>
        </h1>
        <h2 className="font-heading text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-2">
          Salud accesible e inclusiva para todos.
        </h2>
        <p className="font-heading text-md md:text-lg max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
          An AI-powered app that helps Spanish-speaking families in Pomona
          better understand their health and find nearby care.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-4">
          <HoverTranslateButton
            to="/ChatBot"
            en="🧠 Try the Health Chatbot"
            es="🧠 Probar el Chat de Salud"
            color="font-heading bg-purple-600 hover:bg-purple-700 text-white hover:text-purple-200"
          />
          <HoverTranslateButton
            to="/TranslateDocuments"
            en="📄 Translate a Document"
            es="📄 Traducir un Documento"
            color="font-heading bg-gray-200 hover:bg-gray-300 text-gray-900 hover:text-purple-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          />
          <HoverTranslateButton
            to="/SymptomToCare"
            en="🩺 Use Symptom Checker"
            es="🩺 Verificar Síntomas"
            color="font-heading bg-green-600 hover:bg-green-700 text-white hover:text-purple-200"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-4xl mx-auto">
        <h3 className="font-heading text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">
          What PomonaCare AI Offers / Lo que ofrecemos
        </h3>
        <ul className="font-heading space-y-4 text-left text-gray-800 dark:text-gray-200">
          <HoverFeatureItem
            icon="🧑🏽‍⚕️"
            es={
              <>
                <strong>Health Q&A in Spanish & English</strong> - Chat with an
                AI that explains health info in your preferred language.
              </>
            }
            en={
              <>
                <strong>Preguntas de Salud en Español e Inglés</strong> - Habla
                con una AI que explica información médica en tu idioma
                preferido.
              </>
            }
          />
          <HoverFeatureItem
            icon="📍"
            es={
              <>
                <strong>Nearby Clinic Recommendations</strong> - Find low-cost
                care based on symptoms and zip code.
              </>
            }
            en={
              <>
                <strong>Clínicas Cercanas</strong> - Encuentra atención médica
                económica según tus síntomas y código postal.
              </>
            }
          />
          <HoverFeatureItem
            icon="📘"
            es={
              <>
                <strong>Simple Explanations of Medical Terms</strong> - Understand what prescriptions or diagnoses mean.
              </>
            }
            en={
              <>
                <strong>Explicaciones Simples</strong> - Entiende qué significan recetas o diagnósticos.
              </>
            }
          />
          <HoverFeatureItem
            icon="📄"
            es={
              <>
                <strong>Document Translation</strong> - Instantly translate prescriptions or medical instructions into Spanish.
              </>
            }
            en={
              <>
                <strong>Traducción de Documentos</strong> - Traduce recetas o instrucciones médicas al instante.
              </>
            }
          />
          <HoverFeatureItem
            icon="🤝"
            es={
              <>
                <strong>Community Connection</strong> - Link to local health events, clinics, and support services.
              </>
            }
            en={
              <>
                <strong>Conexión Comunitaria</strong> - Encuentra eventos, clínicas y servicios de apoyo locales.
              </>
            }
          />
        </ul>
      </section>
    </div>
  );
}
