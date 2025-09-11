"use client"

import { ArrowLeft, Search, Eye, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface ModeratorCasesScreenProps {
  onBack: () => void
  onViewCase: (caseId: string) => void
}

export function ModeratorCasesScreen({ onBack, onViewCase }: ModeratorCasesScreenProps) {
  const [activeFilter, setActiveFilter] = useState("sin_revisar")

  const cases = [
    {
      id: "1",
      type: "BASURA",
      description: "Basura acumulada cerca al restaurante",
      location: "Barrio Centro, Calle 15",
      status: "pendiente",
      urgency: "alta",
      date: "2024-01-15",
      reporter: "Juan Pérez",
    },
    {
      id: "2",
      type: "FUGA",
      description: "Fuga de agua urgente en el Barrio Nueva Vista",
      location: "Nueva Vista, Carrera 8",
      status: "solucionado",
      urgency: "alta",
      date: "2024-01-14",
      reporter: "María García",
    },
    {
      id: "3",
      type: "TALA",
      description: "Tala ilegal de árboles en zona protegida",
      location: "Zona Verde Norte",
      status: "rechazado",
      urgency: "media",
      date: "2024-01-13",
      reporter: "Carlos López",
    },
    {
      id: "4",
      type: "RUIDO",
      description: "Ruido excesivo por construcción nocturna",
      location: "Barrio Residencial",
      status: "sin_revisar",
      urgency: "baja",
      date: "2024-01-12",
      reporter: "Ana Martínez",
    },
    {
      id: "5",
      type: "BASURA",
      description: "Acumulación de residuos en parque público",
      location: "Parque Central",
      status: "sin_revisar",
      urgency: "alta",
      date: "2024-01-16",
      reporter: "Pedro Ramírez",
    },
    {
      id: "6",
      type: "FUGA",
      description: "Tubería rota causando inundación",
      location: "Barrio Los Pinos",
      status: "sin_revisar",
      urgency: "alta",
      date: "2024-01-16",
      reporter: "Laura Sánchez",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "solucionado":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "rechazado":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "pendiente":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "sin_revisar":
        return <AlertCircle className="w-4 h-4 text-blue-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "solucionado":
        return "Solucionado"
      case "rechazado":
        return "Rechazado"
      case "pendiente":
        return "Pendiente"
      case "sin_revisar":
        return "Sin Revisar"
      default:
        return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "solucionado":
        return "bg-green-100 text-green-800"
      case "rechazado":
        return "bg-red-100 text-red-800"
      case "pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "sin_revisar":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "alta":
        return "border-l-red-500"
      case "media":
        return "border-l-yellow-500"
      case "baja":
        return "border-l-green-500"
      default:
        return "border-l-gray-500"
    }
  }

  const filteredCases = activeFilter === "todos" ? cases : cases.filter((c) => c.status === activeFilter)

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-800">Lista de Casos</h1>
          <div className="flex items-center gap-2">
            <img src="/nodoverde-logo-green-leaf.png" alt="NodoVerde" className="w-6 h-6" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Buscar casos..." className="pl-10 bg-gray-50 border-gray-200" />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { key: "sin_revisar", label: "Sin Revisar", count: filteredCases.length },
            { key: "todos", label: "Todos" },
            { key: "pendiente", label: "Pendientes" },
            { key: "solucionado", label: "Solucionados" },
            { key: "rechazado", label: "Rechazados" },
          ].map((filter) => (
            <Button
              key={filter.key}
              variant={activeFilter === filter.key ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter.key)}
              className={`whitespace-nowrap ${
                activeFilter === filter.key ? "bg-teal-600 hover:bg-teal-700" : "bg-white hover:bg-gray-50"
              }`}
            >
              {filter.label}
              {filter.key === "sin_revisar" && activeFilter === filter.key && (
                <span className="ml-1 bg-white text-teal-600 rounded-full px-2 py-0.5 text-xs font-bold">
                  {cases.filter((c) => c.status === "sin_revisar").length}
                </span>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Cases List */}
      <div className="px-6 py-4 space-y-4">
        {filteredCases.map((case_) => (
          <div
            key={case_.id}
            className={`bg-white rounded-xl p-4 shadow-sm border-l-4 ${getUrgencyColor(case_.urgency)} cursor-pointer hover:shadow-md transition-shadow`}
            onClick={() => onViewCase(case_.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded">{case_.type}</span>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(case_.status)}`}
                >
                  {getStatusIcon(case_.status)}
                  {getStatusText(case_.status)}
                </span>
              </div>
              <Button variant="ghost" size="sm" className="p-1">
                <Eye className="w-4 h-4 text-gray-400" />
              </Button>
            </div>

            <h3 className="font-medium text-gray-800 mb-2">{case_.description}</h3>

            <div className="space-y-1 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <span className="font-medium">Ubicación:</span> {case_.location}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium">Reportado por:</span> {case_.reporter}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium">Fecha:</span> {case_.date}
              </p>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <span
                className={`text-xs font-medium ${
                  case_.urgency === "alta"
                    ? "text-red-600"
                    : case_.urgency === "media"
                      ? "text-yellow-600"
                      : "text-green-600"
                }`}
              >
                Urgencia: {case_.urgency.charAt(0).toUpperCase() + case_.urgency.slice(1)}
              </span>
              {case_.status === "sin_revisar" && (
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  Requiere Revisión
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Indicator */}
      <div className="flex justify-center pb-4">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  )
}
