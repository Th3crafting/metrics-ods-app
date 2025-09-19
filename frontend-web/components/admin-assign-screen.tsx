"use client"

import { useEffect, useMemo, useState } from "react"
import { ArrowLeft, Users2, RefreshCw, CheckSquare, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { API_BASE_URL } from "@/lib/env"

interface AdminAssignScreenProps {
  onBack: () => void
}

type Moderador = { id: number; nombre: string; email: string }
type Sector = { id: number; nombre: string }

export function AdminAssignScreen({ onBack }: AdminAssignScreenProps) {
  const token = useMemo(() => (typeof window !== "undefined" ? localStorage.getItem("auth_token") : null), [])

  const [moderators, setModerators] = useState<Moderador[]>([])
  const [sectors, setSectors] = useState<Sector[]>([])
  const [selectedModeratorId, setSelectedModeratorId] = useState<number | null>(null)
  const [selectedSectorIds, setSelectedSectorIds] = useState<Set<number>>(new Set())

  const [loading, setLoading] = useState(true)
  const [loadingModerator, setLoadingModerator] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState("")

  const hasAny = selectedSectorIds.size > 0
  const isSelected = (id: number) => selectedSectorIds.has(id)
  const toggleId = (id: number) => {
    setSelectedSectorIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  async function loadBase() {
    if (!token) {
      setError("Sesión no encontrada")
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      setError(null)

      const [modsRes, secsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/moderadores`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_BASE_URL}/sectores`,    { headers: { Authorization: `Bearer ${token}` } }),
      ])
      if (!modsRes.ok) throw new Error("No se pudo obtener la lista de moderadores")
      if (!secsRes.ok) throw new Error("No se pudo obtener la lista de sectores")

      const modsRaw = await modsRes.json()
      const secsRaw = await secsRes.json()

      setModerators((modsRaw ?? []).map((m: any) => ({ id: m.id, nombre: m.nombre, email: m.email })))
      setSectors((secsRaw ?? []).map((s: any) => ({ id: s.id, nombre: s.nombre })))
    } catch (e: any) {
      setError(e?.message ?? "Error cargando datos")
    } finally {
      setLoading(false)
    }
  }

  async function loadModeratorSectors(moderatorId: number) {
    if (!token) return
    try {
      setLoadingModerator(true)
      setError(null)

      const res = await fetch(`${API_BASE_URL}/moderadores/${moderatorId}/sectores`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error("No se pudieron obtener los sectores del moderador")

      const data = await res.json()
      const ids: number[] = Array.isArray(data)
        ? data.map((x: any) => (typeof x === "number" ? x : x?.id)).filter((n: any) => Number.isInteger(n))
        : []

      setSelectedSectorIds(new Set(ids))
    } catch (e: any) {
      setError(e?.message ?? "Error cargando sectores del moderador")
      setSelectedSectorIds(new Set())
    } finally {
      setLoadingModerator(false)
    }
  }

  useEffect(() => {
    loadBase()
  }, [API_BASE_URL, token])

  useEffect(() => {
    if (selectedModeratorId) loadModeratorSectors(selectedModeratorId)
  }, [selectedModeratorId])

  async function save() {
    if (!token || !selectedModeratorId) return
    try {
      setSaving(true)
      setError(null)
      const sectorIds = Array.from(selectedSectorIds)

      const res = await fetch(`${API_BASE_URL}/moderadores/${selectedModeratorId}/sectores`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sectorIds }),
      })
      if (!res.ok) {
        const msg = (await res.json().catch(() => null))?.message ?? "No se pudieron guardar las asignaciones"
        throw new Error(msg)
      }
    } catch (e: any) {
      setError(e?.message ?? "Error guardando asignaciones")
    } finally {
      setSaving(false)
    }
  }

  function selectAllFiltered() {
    const filtered = sectors.filter(s => s.nombre.toLowerCase().includes(filter.trim().toLowerCase()))
    setSelectedSectorIds(prev => {
      const next = new Set(prev)
      filtered.forEach(s => next.add(s.id))
      return next
    })
  }
  function clearAll() {
    setSelectedSectorIds(new Set())
  }

  const filteredSectors = sectors.filter(s => s.nombre.toLowerCase().includes(filter.trim().toLowerCase()))
  const selectedModerator = moderators.find(m => m.id === selectedModeratorId) ?? null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold text-gray-800">Asignar moderadores a sectores</h1>
        <div className="w-10" />
      </div>

      <div className="px-6 py-6 grid lg:grid-cols-3 gap-6">
        {/* Moderadores */}
        <div className="lg:col-span-1 bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Users2 className="w-4 h-4" /> Moderadores
            </h3>
            <Button variant="outline" size="sm" onClick={loadBase}>
              <RefreshCw className="w-4 h-4 mr-1" /> Refrescar
            </Button>
          </div>
          {loading ? (
            <p className="text-sm text-gray-500">Cargando…</p>
          ) : moderators.length === 0 ? (
            <p className="text-sm text-gray-500">No hay moderadores.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {moderators.map(m => (
                <li
                  key={m.id}
                  className={`py-2 px-2 rounded-md cursor-pointer ${
                    selectedModeratorId === m.id ? "bg-teal-50" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedModeratorId(m.id)}
                >
                  <p className="font-medium text-gray-800">{m.nombre}</p>
                  <p className="text-xs text-gray-600">{m.email}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Sectores */}
        <div className="lg:col-span-2 bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold text-gray-800">Sectores</h3>
              {selectedModerator && (
                <p className="text-xs text-gray-500">Asignando a: <span className="font-medium">{selectedModerator.nombre}</span></p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={selectAllFiltered} disabled={!selectedModeratorId || filteredSectors.length === 0}>
                <CheckSquare className="w-4 h-4 mr-1" /> Marcar todos
              </Button>
              <Button variant="outline" size="sm" onClick={clearAll} disabled={!selectedModeratorId || selectedSectorIds.size === 0}>
                <Square className="w-4 h-4 mr-1" /> Limpiar
              </Button>
            </div>
          </div>

          {error && <p className="text-sm text-red-600 mb-2">{error}</p>}

          <div className="mb-3">
            <Input
              placeholder="Filtrar sectores…"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-gray-50 border-gray-200"
            />
          </div>

          {!selectedModeratorId ? (
            <p className="text-sm text-gray-500">Selecciona un moderador para ver sus sectores.</p>
          ) : loadingModerator ? (
            <p className="text-sm text-gray-500">Cargando sectores del moderador…</p>
          ) : sectors.length === 0 ? (
            <p className="text-sm text-gray-500">No hay sectores configurados.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {filteredSectors.map(s => {
                const checked = isSelected(s.id)
                return (
                  <label key={s.id} className={`flex items-center gap-2 p-2 rounded border ${checked ? "border-teal-400 bg-teal-50" : "border-gray-200 hover:bg-gray-50"}`}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleId(s.id)}
                      className="accent-teal-600"
                    />
                    <span className="text-sm text-gray-800">{s.nombre}</span>
                  </label>
                )
              })}
            </div>
          )}

          <div className="mt-4 flex items-center gap-2">
            <Button
              onClick={save}
              disabled={!selectedModeratorId || saving}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              {saving ? "Guardando…" : "Guardar asignaciones"}
            </Button>
            {selectedModeratorId && (
              <span className="text-xs text-gray-500">
                Seleccionados: <b>{selectedSectorIds.size}</b>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
