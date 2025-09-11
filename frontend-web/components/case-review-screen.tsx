"use client"

import { ArrowLeft, MapPin, Calendar, Clock, User, CheckCircle, XCircle, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface CaseReviewScreenProps {
  onBack: () => void
  onAssignToEntity: () => void
}

export function CaseReviewScreen({ onBack, onAssignToEntity }: CaseReviewScreenProps) {
  const [selectedAction, setSelectedAction] = useState<string>("")
  const [showNotification, setShowNotification] = useState(false)
  const [caseStatus, setCaseStatus] = useState<string>("sin-revisar") // sin-revisar, pendiente, rechazado, realizado
  const [assignedEntity, setAssignedEntity] = useState<string>("")

  const caseData = {
    id: "RPT-2024-001",
    type: "Basura",
    description:
      "Acumulación de basura cerca al restaurante El Buen Sabor. Los residuos están generando malos olores y atrayendo insectos.",
    location: "Calle 45 #23-67, Barrio Centro",
    department: "Cundinamarca",
    municipality: "Bogotá",
    locality: "Chapinero",
    urgency: "Alto",
    reportedBy: "María González",
    reportedAt: "2024-01-15 14:30",
    image: "/solitary-tree-rocks.png",
  }

  const handleActionSelect = (action: string) => {
    if (action === "pendiente") {
      onAssignToEntity()
    } else if (action === "rechazado") {
      setSelectedAction(action)
      setCaseStatus("rechazado")
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 3000)
    } else if (action === "realizado") {
      if (caseStatus === "pendiente" && assignedEntity) {
        setSelectedAction(action)
        setCaseStatus("realizado")
        setShowNotification(true)
        setTimeout(() => setShowNotification(false), 3000)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold text-gray-800">Revisar Caso</h1>
        <div className="w-10"></div>
      </div>

      {/* Notification */}
      {showNotification && (
        <div className="mx-6 mt-4 p-3 bg-green-100 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-800">Caso actualizado exitosamente</span>
          </div>
        </div>
      )}

      {/* Case Details */}
      <div className="px-6 py-4">
        {/* Case ID and Type */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-gray-500">ID: {caseData.id}</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm font-medium text-orange-600">{caseData.type}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div
              className={`px-2 py-1 rounded-lg text-xs font-medium ${
                caseData.urgency === "Alto"
                  ? "bg-red-100 text-red-800"
                  : caseData.urgency === "Medio"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
              }`}
            >
              Urgencia: {caseData.urgency}
            </div>
          </div>
          {caseStatus !== "sin-revisar" && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <div
                className={`px-2 py-1 rounded-lg text-xs font-medium inline-block ${
                  caseStatus === "pendiente"
                    ? "bg-yellow-100 text-yellow-800"
                    : caseStatus === "rechazado"
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                }`}
              >
                Estado:{" "}
                {caseStatus === "pendiente" ? "Pendiente" : caseStatus === "rechazado" ? "Rechazado" : "Realizado"}
              </div>
              {assignedEntity && <p className="text-xs text-gray-600 mt-1">Asignado a: {assignedEntity}</p>}
            </div>
          )}
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">Descripción del Problema</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{caseData.description}</p>
        </div>

        {/* Location Details */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-4">
          <h3 className="font-semibold text-gray-800 mb-3">Ubicación</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{caseData.location}</span>
            </div>
            <div className="text-sm text-gray-600 ml-6">
              <p>
                {caseData.department} - {caseData.municipality}
              </p>
              <p>Localidad: {caseData.locality}</p>
            </div>
          </div>
        </div>

        {/* Reporter Info */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-4">
          <h3 className="font-semibold text-gray-800 mb-3">Información del Reporte</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Reportado por: {caseData.reportedBy}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{caseData.reportedAt}</span>
            </div>
          </div>
        </div>

        {/* Moderator Instructions */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 mb-6">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Instrucciones para Moderadores</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Verifica que la información sea veraz y completa</li>
                <li>• Evalúa si constituye una infracción ambiental</li>
                <li>• Marca como "Pendiente" para asignar a una entidad responsable</li>
                <li>• Marca como "Rechazado" si no cumple criterios o es falso</li>
                <li>• Marca como "Realizado" solo después de asignar a una entidad</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => handleActionSelect("pendiente")}
            disabled={caseStatus !== "sin-revisar"}
            className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 text-white py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <Clock className="w-4 h-4" />
            Asignar a Entidad (Pendiente)
          </Button>

          <Button
            onClick={() => handleActionSelect("rechazado")}
            disabled={caseStatus !== "sin-revisar"}
            className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <XCircle className="w-4 h-4" />
            Rechazar Caso
          </Button>

          <Button
            onClick={() => handleActionSelect("realizado")}
            disabled={caseStatus !== "pendiente" || !assignedEntity}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Marcar como Realizado
            {caseStatus !== "pendiente" && <span className="text-xs">(Debe asignar a entidad primero)</span>}
          </Button>
        </div>
      </div>

      {/* Bottom Indicator */}
      <div className="flex justify-center py-4">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  )
}
