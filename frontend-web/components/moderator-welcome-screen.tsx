"use client"

import { ArrowLeft, FileText, BarChart3, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ModeratorWelcomeScreenProps {
  onBack: () => void
  onViewCases: () => void
  onDashboard: () => void
}

export function ModeratorWelcomeScreen({ onBack, onViewCases, onDashboard }: ModeratorWelcomeScreenProps) {
  const stats = [
    {
      label: "Pendientes",
      count: 12,
      color: "bg-yellow-100",
      textColor: "text-yellow-800",
      borderColor: "border-yellow-200",
    },
    { label: "Rechazados", count: 3, color: "bg-red-100", textColor: "text-red-800", borderColor: "border-red-200" },
    {
      label: "Solucionados",
      count: 25,
      color: "bg-green-100",
      textColor: "text-green-800",
      borderColor: "border-green-200",
    },
    {
      label: "Sin Revisar",
      count: 8,
      color: "bg-blue-100",
      textColor: "text-blue-800",
      borderColor: "border-blue-200",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2">
          <img src="/nodoverde-logo-green-leaf.png" alt="NodoVerde" className="w-8 h-8" />
          <span className="text-sm font-medium text-green-600">NodoVerde</span>
        </div>
      </div>

      {/* Welcome Section with Professional Background */}
      <div className="mx-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-teal-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-800 mb-2">Panel de Moderación</h1>
            <p className="text-gray-600 text-sm mb-6">Gestiona y revisa los reportes de la comunidad</p>

            <Button
              onClick={onViewCases}
              className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg px-8 py-3 w-full max-w-xs"
            >
              <FileText className="w-4 h-4 mr-2" />
              Ver Casos
            </Button>
          </div>
        </div>
      </div>

      {/* Dashboard Section */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Estadísticas</h3>
          <Button variant="ghost" size="sm" onClick={onDashboard}>
            <BarChart3 className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
            <div key={index} className={`bg-white rounded-xl p-4 shadow-sm border ${stat.borderColor}`}>
              <div
                className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium ${stat.color} ${stat.textColor} mb-2`}
              >
                {stat.label}
              </div>
              <div className="text-2xl font-bold text-gray-800">{stat.count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="px-6 mb-6">
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm text-blue-800 leading-relaxed">
                Los casos deben ser revisados verificar si los hechos reportados constituyen una infracción a las normas
                ambientales y si existen pruebas suficientes para proceder.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Indicator */}
      <div className="flex justify-center pb-4">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  )
}
