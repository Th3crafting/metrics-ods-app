"use client"

import { useEffect, useMemo, useState } from "react"
import { ArrowLeft, FileText, BarChart3, AlertTriangle, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { API_BASE_URL } from "@/lib/env"

interface ModeratorWelcomeScreenProps {
  onBack: () => void
  onViewCases: () => void
  onDashboard: () => void
  onAdminTools?: () => void
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
  byStatus: {
    Abierto?: number
    Pendiente?: number
    EnRevision?: number
    Cerrado?: number
    Rechazado?: number
    [k: string]: number | undefined
  }
  lists: {
    Abierto?: DashboardItem[]
    Pendiente?: DashboardItem[]
    EnRevision?: DashboardItem[]
    Cerrado?: DashboardItem[]
    Rechazado?: DashboardItem[]
    [k: string]: DashboardItem[] | undefined
  }
}

export function ModeratorWelcomeScreen({ onBack, onViewCases, onDashboard, onAdminTools }: ModeratorWelcomeScreenProps) {
  const [displayName, setDisplayName] = useState<string>("")
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const [sinRevisar, setSinRevisar] = useState<number>(0)
  const [pendientes, setPendientes] = useState<number>(0)
  const [solucionados, setSolucionados] = useState<number>(0)
  const [rechazados, setRechazados] = useState<number>(0)

  const token = useMemo(() => (typeof window !== "undefined" ? localStorage.getItem("auth_token") : null), [])

  useEffect(() => {
    let cancelled = false

    async function boot() {
      if (!token) {
        setError("No se encontró sesión activa.")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        try {
          const [, payload] = token.split(".")
          const claims = JSON.parse(atob(payload))
          setIsAdmin(!!claims?.is_admin)
        } catch {
          setIsAdmin(false)
        }

        const meRes = await fetch(`${API_BASE_URL}/moderadores/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!meRes.ok) throw new Error("No se pudo obtener el perfil del moderador")
        const me = await meRes.json()
        if (!cancelled) setDisplayName(me?.nombre || me?.name || me?.email || "Moderador")

        const dashRes = await fetch(`${API_BASE_URL}/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!dashRes.ok) throw new Error("No se pudo obtener el dashboard de reportes")
        const dash: DashboardResponse = await dashRes.json()

        const by = dash?.byStatus ?? {}
        if (!cancelled) {
          setSinRevisar(Number(by.Abierto ?? 0))
          setPendientes(Number(by.Pendiente ?? 0) + Number(by.EnRevision ?? 0))
          setSolucionados(Number(by.Cerrado ?? 0))
          setRechazados(Number(by.Rechazado ?? 0))
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Error cargando datos")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    boot()
    return () => {
      cancelled = true
    }
  }, [API_BASE_URL, token])

  const cards = [
    { label: "Sin Revisar", count: sinRevisar, color: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" },
    { label: "Pendientes", count: pendientes, color: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-200" },
    { label: "Solucionados", count: solucionados, color: "bg-green-100", text: "text-green-800", border: "border-green-200" },
    { label: "Rechazados", count: rechazados, color: "bg-red-100", text: "text-red-800", border: "border-red-200" },
  ]

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

      {/* Welcome Section */}
      <div className="mx-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-teal-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-800 mb-1">Panel de Moderación</h1>
            <p className="text-gray-600 text-sm mb-2">{loading ? "Cargando..." : `Hola, ${displayName}`}</p>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="grid gap-3 max-w-xs mx-auto w-full">
              <Button onClick={onViewCases} className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg px-8 py-3 w-full">
                <FileText className="w-4 h-4 mr-2" />
                Ver Casos
              </Button>

              {/* Visible solo para administradores */}
              {isAdmin && (
                <Button
                  variant="outline"
                  className="rounded-lg px-8 py-3 w-full border-teal-600 text-teal-700"
                  onClick={onAdminTools}
                >
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Herramientas de Administración
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Section: Estadísticas */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Estadísticas</h3>
          <Button variant="ghost" size="sm" onClick={onDashboard}>
            <BarChart3 className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {cards.map((c) => (
            <div key={c.label} className={`bg-white rounded-xl p-4 shadow-sm border ${c.border}`}>
              <div className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium ${c.color} ${c.text} mb-2`}>
                {c.label}
              </div>
              <div className="text-2xl font-bold text-gray-800">{loading ? "—" : c.count}</div>
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
                Los casos deben ser revisados para verificar si constituyen infracción ambiental y si existen pruebas suficientes para proceder.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
