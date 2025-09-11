"use client"
import { Menu } from "lucide-react"

interface WelcomeScreenProps {
  onNavigateToMain: () => void
}

export function WelcomeScreen({ onNavigateToMain }: WelcomeScreenProps) {
  return (
    <div className="max-w-sm mx-auto min-h-screen bg-white">
      {/* Status bar simulation */}
      <div className="flex justify-between items-center px-6 py-4 text-sm font-medium">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          </div>
          <div className="ml-2 w-6 h-3 border border-black rounded-sm">
            <div className="w-4 h-2 bg-black rounded-sm m-0.5"></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <button onClick={onNavigateToMain}>
          <Menu className="w-6 h-6 text-teal-600" />
        </button>
        <div className="w-6"></div>
      </div>

      {/* Welcome banner */}
      <div className="mx-6 mb-6 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg p-6 text-center">
        <img
          src="/small-island-tree.png"
          alt="Pequeño árbol en isla"
          className="w-full h-24 object-cover rounded-lg mb-4"
        />
        <h1 className="text-xl font-medium text-gray-900">Bienvenido a NodoVerde</h1>
      </div>

      {/* Content */}
      <div className="px-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4 text-center">
          Conectando vecinos para un barrio más sostenible
        </h2>

        <p className="text-sm text-gray-600 mb-8 leading-relaxed text-center">
          EcoVeci es tu plataforma comunitaria para reportar, colaborar y mejorar tu entorno. Únete a tus vecinos para
          hacer del barrio un lugar más limpio, seguro y amigable con el ambiente.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">Reporta lo que importa</h3>

        <p className="text-sm text-gray-600 mb-6 leading-relaxed text-center">
          ¿Has visto basura acumulada, fugas de agua o ruidos molestos? Con EcoVeci puedes reportar problemas
          ambientales en minutos. Tu voz cuenta para que las autoridades y vecinos actúen rápidamente.
        </p>

        {/* Tree image */}
        <div className="w-full h-48 bg-gradient-to-b from-blue-200 to-orange-200 rounded-lg overflow-hidden mb-8">
          <img
            src="/solitary-tree-rocks.png"
            alt="Árbol solitario en rocas con cielo azul"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Home indicator */}
      <div className="flex justify-center pb-4">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  )
}
