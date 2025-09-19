"use client"

import { ArrowLeft, Building2, Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useMemo } from "react"
import { API_BASE_URL } from "@/lib/env"

interface EntitySelectionScreenProps {
  onBack: () => void
  onEntityAssigned: (entityName: string) => void
  caseId: number
}

type ExtEntity = { id: number; nombre: string; contacto?: string; telefono?: string }

export function EntitySelectionScreen({ onBack, onEntityAssigned, caseId }: EntitySelectionScreenProps) {
  const token = useMemo(() => (typeof window !== "undefined" ? localStorage.getItem("auth_token") : null), [])
  const [entities, setEntities] = useState<ExtEntity[]>([])
  const [selectedEntityId, setSelectedEntityId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      if (!token) {
        setLoading(false)
        setApiError("Sesión no encontrada")
        return
      }
      try {
        setLoading(true)
        const res = await fetch(`${API_BASE_URL}/entidades-externas`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) throw new Error("No se pudieron obtener las entidades")
        const data: ExtEntity[] = await res.json()
        if (!cancelled) setEntities(data)
      } catch (e: any) {
        if (!cancelled) setApiError(e?.message ?? "Error cargando entidades")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [API_BASE_URL, token])

  const selectedEntity = entities.find((e) => e.id === selectedEntityId) || null

  const handleSendToEntity = async () => {
    if (!selectedEntityId || !token) return
    setApiError(null)
    setSubmitting(true)
    try {
      const res = await fetch(`${API_BASE_URL}/reportes/${caseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ entidadExternaId: selectedEntityId, estadoId: 3 }),
      })
      if (!res.ok) {
        const msg = (await res.json().catch(() => null))?.message ?? "No se pudo asignar la entidad"
        throw new Error(msg)
      }

      setShowNotification(true)
      setTimeout(() => {
        setShowNotification(false)
        if (selectedEntity) onEntityAssigned(selectedEntity.nombre)
      }, 1200)
    } catch (e: any) {
      setApiError(e?.message ?? "Error enviando a entidad")
    } finally {
      setSubmitting(false)
    }
  }

  const getTag = (name: string) => {
    if (/ambiente|ambiental/i.test(name)) return "Ambiental"
    if (/acueduct|agua/i.test(name)) return "Servicios Públicos"
    if (/polic|seguridad/i.test(name)) return "Seguridad"
    if (/alcald|gobierno/i.test(name)) return "Gobierno"
    return "General"
  }

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "Ambiental":
        return "bg-green-100 text-green-800 border-green-200"
      case "Servicios Públicos":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Seguridad":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Gobierno":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold text-gray-800">Asignar Entidad</h1>
        <div className="w-10"></div>
      </div>

      {/* Avisos */}
      {showNotification && (
        <div className="mx-6 mt-4 p-3 bg-green-100 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-800">Caso enviado exitosamente a la entidad</span>
          </div>
        </div>
      )}
      {apiError && <div className="mx-6 mt-4 p-3 bg-red-100 border border-red-200 rounded-lg text-sm text-red-700">{apiError}</div>}

      <div className="px-6 py-4">
        {loading ? (
          <p className="text-sm text-gray-500">Cargando entidades…</p>
        ) : (
          <>
            <h3 className="font-semibold text-gray-800 mb-4">Seleccionar Entidad Responsable</h3>
            <div className="space-y-3 mb-6">
              {entities.map((e) => {
                const tag = getTag(e.nombre)
                return (
                  <div
                    key={e.id}
                    onClick={() => setSelectedEntityId(e.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedEntityId === e.id ? "border-teal-500 bg-teal-50" : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-5 h-5 text-gray-600" />
                        <div>
                          <h4 className="font-medium text-gray-800">{e.nombre}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full border ${getTagColor(tag)}`}>{tag}</span>
                          {!!e.contacto && <p className="text-xs text-gray-500 mt-1">{e.contacto}</p>}
                          {!!e.telefono && <p className="text-xs text-gray-500">{e.telefono}</p>}
                        </div>
                      </div>
                      {selectedEntityId === e.id && <CheckCircle className="w-5 h-5 text-teal-500" />}
                    </div>
                  </div>
                )
              })}
              {entities.length === 0 && <p className="text-sm text-gray-500">No hay entidades registradas.</p>}
            </div>

            <Button
              onClick={handleSendToEntity}
              disabled={!selectedEntityId || submitting}
              className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-gray-300 text-white py-3 rounded-lg flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              {submitting ? "Enviando..." : "Enviar Caso a Entidad"}
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
