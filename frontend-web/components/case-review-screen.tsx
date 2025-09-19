"use client"

import { ArrowLeft, MapPin, Calendar, Clock, User, CheckCircle, XCircle, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useMemo } from "react"
import { API_BASE_URL } from "@/lib/env"

interface CaseReviewScreenProps {
  onBack: () => void
  onAssignToEntity: (caseId: number) => void
  caseData?: CaseDTO
}

type CaseStatus = "sin_revisar" | "pendiente" | "en_revision" | "rechazado" | "cerrado"

const ESTADOS = {
  ABIERTO: 1,
  PENDIENTE: 2,
  EN_REVISION: 3,
  CERRADO: 4,
  RECHAZADO: 5,
} as const

export type CaseDTO = {
  id: number
  type: string
  description: string
  location: string
  urgency: "baja" | "media" | "alta"
  reportedBy: string
  reportedAt: string
  status?: "sin_revisar" | "pendiente" | "en_revision" | "rechazado" | "cerrado"
  entityName?: string
}

export function CaseReviewScreen({ onBack, onAssignToEntity, caseData }: CaseReviewScreenProps) {
  const token = useMemo(() => (typeof window !== "undefined" ? localStorage.getItem("auth_token") : null), [])

  const cd: CaseDTO = caseData ?? {
    id: 0,
    type: "—",
    description: "",
    location: "",
    urgency: "media",
    reportedBy: "—",
    reportedAt: "",
    status: "sin_revisar",
    entityName: "",
  }

  const [showNotification, setShowNotification] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const [caseStatus, setCaseStatus] = useState<CaseStatus>(cd.status ?? "sin_revisar")
  const [assignedEntity, setAssignedEntity] = useState<string>(cd.entityName ?? "")

  const notifyOk = () => {
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 2000)
  }

  async function updateEstado(estadoId: number) {
    if (!token) return setApiError("Sesión no encontrada")
    setApiError(null)
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE_URL}/reportes/${cd.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ estadoId }),
      })
      if (!res.ok) {
        const msg = (await res.json().catch(() => null))?.message ?? "No se pudo actualizar el estado"
        throw new Error(msg)
      }
      notifyOk()
    } catch (e: any) {
      setApiError(e?.message ?? "Error inesperado")
      throw e
    } finally {
      setLoading(false)
    }
  }

  const handleAssignEntity = () => {
    onAssignToEntity(cd.id)
  }

  const handleReject = async () => {
    if (caseStatus !== "sin_revisar") return
    await updateEstado(ESTADOS.RECHAZADO)
    setCaseStatus("rechazado")
  }

  const handleMarkDone = async () => {
    if (!assignedEntity || (caseStatus !== "en_revision" && caseStatus !== "pendiente")) return
    await updateEstado(ESTADOS.CERRADO)
    setCaseStatus("cerrado")
  }

  const handleMarkPending = async () => {
    if (caseStatus === "cerrado" || caseStatus === "rechazado") return
    await updateEstado(ESTADOS.PENDIENTE)
    setCaseStatus("pendiente")
  }

  const urgencyBadge =
    cd.urgency === "alta"
      ? "bg-red-100 text-red-800"
      : cd.urgency === "media"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-green-100 text-green-800"

  const statusLabel =
    caseStatus === "pendiente"
      ? "Pendiente"
      : caseStatus === "rechazado"
      ? "Rechazado"
      : caseStatus === "en_revision"
      ? "En revisión"
      : caseStatus === "cerrado"
      ? "Realizado"
      : "Sin revisar"

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

      {/* Notifications */}
      {showNotification && (
        <div className="mx-6 mt-4 p-3 bg-green-100 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-800">Caso actualizado</span>
          </div>
        </div>
      )}
      {apiError && (
        <div className="mx-6 mt-4 p-3 bg-red-100 border border-red-200 rounded-lg text-sm text-red-700">{apiError}</div>
      )}

      {/* Case Details */}
      <div className="px-6 py-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-gray-500">ID: {cd.id}</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm font-medium text-orange-600">{cd.type}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <div className={`px-2 py-1 rounded-lg text-xs font-medium ${urgencyBadge}`}>Urgencia: {cd.urgency}</div>
          </div>

          {caseStatus !== "sin_revisar" && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <div
                className={`px-2 py-1 rounded-lg text-xs font-medium inline-block ${
                  caseStatus === "pendiente"
                    ? "bg-yellow-100 text-yellow-800"
                    : caseStatus === "rechazado"
                    ? "bg-red-100 text-red-800"
                    : caseStatus === "en_revision"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                Estado: {statusLabel}
              </div>
              {!!assignedEntity && <p className="text-xs text-gray-600 mt-1">Asignado a: {assignedEntity}</p>}
            </div>
          )}
        </div>

        {/* Descripción */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">Descripción</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{cd.description}</p>
        </div>

        {/* Ubicación */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-4">
          <h3 className="font-semibold text-gray-800 mb-3">Ubicación</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{cd.location}</span>
            </div>
          </div>
        </div>

        {/* Reporter */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Información del Reporte</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Reportado por: {cd.reportedBy}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{cd.reportedAt}</span>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="space-y-3">
          <Button
            onClick={handleAssignEntity}
            disabled={caseStatus !== "sin_revisar"}
            className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 text-white py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <Clock className="w-4 h-4" />
            Asignar entidad (pasa a En revisión)
          </Button>

          <Button
            onClick={handleMarkPending}
            disabled={caseStatus === "cerrado" || caseStatus === "rechazado"}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <Clock className="w-4 h-4" />
            Marcar como Pendiente
          </Button>

          <Button
            onClick={handleReject}
            disabled={caseStatus !== "sin_revisar"}
            className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <XCircle className="w-4 h-4" />
            Rechazar
          </Button>

          <Button
            onClick={handleMarkDone}
            disabled={!assignedEntity || (caseStatus !== "en_revision" && caseStatus !== "pendiente")}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Marcar como Realizado
          </Button>
        </div>
      </div>
    </div>
  )
}
