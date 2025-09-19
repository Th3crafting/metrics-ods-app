"use client"

import { ArrowLeft, Search, Eye, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect, useMemo } from "react"
import { API_BASE_URL } from "@/lib/env"
import type { CaseDTO } from "./case-review-screen"

interface ModeratorCasesScreenProps {
  onBack: () => void
  onViewCase: (caseData: CaseDTO) => void
}

type DashboardItem = {
  id: number
  titulo: string
  descripcion: string | null
  direccion: string
  fecha: string
  tipoReporteId: number
  tipoReporteNombre: string
}
type DashboardResponse = {
  totals: { total: number; thisMonth: number }
  byStatus: Record<string, number>
  lists: {
    Abierto?: DashboardItem[]
    Pendiente?: DashboardItem[]
    EnRevision?: DashboardItem[]
    Cerrado?: DashboardItem[]
    Rechazado?: DashboardItem[]
  }
}
type UICase = {
  id: string
  type: string
  description: string
  location: string
  status: "sin_revisar" | "pendiente" | "solucionado" | "rechazado"
  urgency: "alta" | "media" | "baja"
  date: string
  reporter: string
}

export function ModeratorCasesScreen({ onBack, onViewCase }: ModeratorCasesScreenProps) {
  const [activeFilter, setActiveFilter] = useState<"sin_revisar" | "todos" | "pendiente" | "solucionado" | "rechazado">("sin_revisar")
  const [query, setQuery] = useState("")
  const [cases, setCases] = useState<UICase[]>([])
  const [counts, setCounts] = useState<Record<string, number>>({ sin_revisar: 0, pendiente: 0, solucionado: 0, rechazado: 0, todos: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const token = useMemo(() => (typeof window !== "undefined" ? localStorage.getItem("auth_token") : null), [])

    useEffect(() => {
      let cancelled = false
      async function load() {
        if (!token) {
          setError("No hay sesión")
          setLoading(false)
          return
        }
        try {
          setLoading(true)
          setError(null)

          const res = await fetch(`${API_BASE_URL}/dashboard?limit=20&offset=0`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          if (!res.ok) {
            throw new Error("No se pudo obtener el dashboard")
          }

          const dash: DashboardResponse = await res.json()

          const toUi = (it: DashboardItem, status: UICase["status"]): UICase => ({
            id: String(it.id),
            type: (it.tipoReporteNombre ?? "—").toUpperCase(),
            description: it.descripcion || it.titulo || "",
            location: it.direccion || "",
            status,
            urgency: (it as any).urgency ?? "media",
            date: new Date(it.fecha).toISOString().slice(0, 10),
            reporter: (it as any).reporter ?? "-",
          })

          const sinRevisar = (dash.lists.Abierto ?? []).map((i) => toUi(i, "sin_revisar"))
          const pendientes = [
            ...(dash.lists.Pendiente ?? []).map((i) => toUi(i, "pendiente")),
            ...(dash.lists.EnRevision ?? []).map((i) => toUi(i, "pendiente")),
          ]
          const solucionados = (dash.lists.Cerrado ?? []).map((i) => toUi(i, "solucionado"))
          const rechazados = (dash.lists.Rechazado ?? []).map((i) => toUi(i, "rechazado"))

          const all = [...sinRevisar, ...pendientes, ...solucionados, ...rechazados]

          if (!cancelled) {
            setCases(all)
            setCounts({
              sin_revisar: sinRevisar.length,
              pendiente: pendientes.length,
              solucionado: solucionados.length,
              rechazado: rechazados.length,
              todos: all.length,
            })
          }
        } catch (e: any) {
          if (!cancelled) setError(e?.message ?? "Error cargando casos")
        } finally {
          if (!cancelled) setLoading(false)
        }
      }
      load()
      return () => {
        cancelled = true
      }
    }, [API_BASE_URL, token])

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
  const getUrgencyColorText = (urgency: string) => {
    switch (urgency) {
      case "alta":
        return "text-red-500"
      case "media":
        return "text-yellow-500"
      case "baja":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  const search = (items: UICase[]) => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((c) =>
      [c.type, c.description, c.location, c.date].some((v) => v?.toLowerCase().includes(q))
    )
  }

  const casesByFilter: Record<typeof activeFilter, UICase[]> = {
    sin_revisar: cases.filter((c) => c.status === "sin_revisar"),
    pendiente: cases.filter((c) => c.status === "pendiente"),
    solucionado: cases.filter((c) => c.status === "solucionado"),
    rechazado: cases.filter((c) => c.status === "rechazado"),
    todos: cases,
  }

  const filteredCases = search(casesByFilter[activeFilter])

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
          <Input
            placeholder="Buscar casos..."
            className="pl-10 bg-gray-50 border-gray-200"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { key: "sin_revisar", label: "Sin Revisar", count: counts.sin_revisar },
            { key: "todos", label: "Todos", count: counts.todos },
            { key: "pendiente", label: "Pendientes", count: counts.pendiente },
            { key: "solucionado", label: "Solucionados", count: counts.solucionado },
            { key: "rechazado", label: "Rechazados", count: counts.rechazado },
          ].map((filter) => (
            <Button
              key={filter.key}
              variant={activeFilter === (filter.key as any) ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter.key as any)}
              className={`whitespace-nowrap ${
                activeFilter === filter.key ? "bg-teal-600 hover:bg-teal-700" : "bg-white hover:bg-gray-50"
              }`}
            >
              {filter.label}
              <span className="ml-2 bg-white text-teal-600 rounded-full px-2 py-0.5 text-xs font-bold">
                {filter.count}
              </span>
            </Button>
          ))}
        </div>
      </div>

      {/* Cases List */}
      <div className="px-6 py-4 space-y-4">
        {loading && <p className="text-sm text-gray-500">Cargando...</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}
        {!loading && !error && filteredCases.length === 0 && (
          <p className="text-sm text-gray-500">No hay casos para mostrar.</p>
        )}

        {filteredCases.map((case_) => (
          <div
            key={case_.id}
            className={`bg-white rounded-xl p-4 shadow-sm border-l-4 ${getUrgencyColor(case_.urgency)} cursor-pointer hover:shadow-md transition-shadow`}
            onClick={() => onViewCase({
              id: Number(case_.id),
              type: case_.type,
              description: case_.description,
              location: case_.location,
              urgency: case_.urgency,
              reportedBy: case_.reporter,
              reportedAt: case_.date,
              status: case_.status as any,
              entityName: "",
            })}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded">{case_.type}</span>
                <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(case_.status)}`}>
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
              <p><span className="font-medium">Ubicación:</span> {case_.location || "—"}</p>
              <p><span className="font-medium">Fecha:</span> {case_.date}</p>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <span className={`text-xs font-medium ${getUrgencyColorText(case_.urgency)}`}>Urgencia: {case_.urgency}</span>
              {case_.status === "sin_revisar" && (
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Requiere Revisión</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
