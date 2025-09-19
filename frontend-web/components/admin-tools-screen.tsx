"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Users2, Share2, Building2, Shapes } from "lucide-react"

interface AdminToolsScreenProps {
    onBack: () => void
    onManageModerators: () => void
    onAssignModerators: () => void
    onManageEntities: () => void
    onManageReportTypes: () => void
}

export function AdminToolsScreen({
    onBack,
    onManageModerators,
    onAssignModerators,
    onManageEntities,
    onManageReportTypes,
}: AdminToolsScreenProps) {
    return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold text-gray-800">Herramientas de Administración</h1>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="px-6 py-6 grid gap-4 max-w-xl mx-auto">
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
              <Users2 className="w-5 h-5 text-teal-600" />
            </span>
            <div>
              <h3 className="font-semibold text-gray-800">Moderadores</h3>
              <p className="text-sm text-gray-600">Crear, actualizar o eliminar moderadores.</p>
            </div>
          </div>
          <Button onClick={onManageModerators} className="w-full bg-teal-600 hover:bg-teal-700 text-white">
            Gestionar moderadores
          </Button>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <Share2 className="w-5 h-5 text-indigo-600" />
            </span>
            <div>
              <h3 className="font-semibold text-gray-800">Asignaciones</h3>
              <p className="text-sm text-gray-600">Asignar moderadores a sectores.</p>
            </div>
          </div>
          <Button onClick={onAssignModerators} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
            Asignar moderadores a sectores
          </Button>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-emerald-600" />
            </span>
            <div>
              <h3 className="font-semibold text-gray-800">Entidades externas</h3>
              <p className="text-sm text-gray-600">Agregar y administrar entidades.</p>
            </div>
          </div>
          <Button onClick={onManageEntities} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
            Gestionar entidades
          </Button>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <Shapes className="w-5 h-5 text-amber-600" />
            </span>
            <div>
              <h3 className="font-semibold text-gray-800">Tipos de reportes</h3>
              <p className="text-sm text-gray-600">Agregar nuevos tipos de reporte.</p>
            </div>
          </div>
          <Button onClick={onManageReportTypes} className="w-full bg-amber-500 hover:bg-amber-600 text-white">
            Gestionar tipos de reportes
          </Button>
        </div>
      </div>
    </div>
  )
}