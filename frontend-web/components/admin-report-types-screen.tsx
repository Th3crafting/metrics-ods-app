"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { API_BASE_URL } from "@/lib/env"
import { ArrowLeft, Plus, Pencil, Trash2, Shapes, RefreshCw } from "lucide-react"

type ReportType = {
  id: number
  nombre: string
  descripcion?: string | null
}

interface AdminReportTypesScreenProps {
  onBack: () => void
}

export function AdminReportTypesScreen({ onBack }: AdminReportTypesScreenProps) {
  const token = useMemo(() => (typeof window !== "undefined" ? localStorage.getItem("auth_token") : null), [])

  const [list, setList] = useState<ReportType[]>([])
  const [filter, setFilter] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [editingId, setEditingId] = useState<number | null>(null)
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")

  const filtered = list.filter(rt => rt.nombre.toLowerCase().includes(filter.trim().toLowerCase()))

  function resetForm() {
    setEditingId(null)
    setNombre("")
    setDescripcion("")
  }

  function startCreate() {
    resetForm()
  }

  function startEdit(rt: ReportType) {
    setEditingId(rt.id)
    setNombre(rt.nombre ?? "")
    setDescripcion(rt.descripcion ?? "")
  }

  async function fetchList() {
    if (!token) {
      setError("Sesión no encontrada")
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      setError(null)

      const res = await fetch(`${API_BASE_URL}/tipos-reporte`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error("No se pudo obtener la lista de tipos de reporte")

      const data = await res.json()
      const mapped: ReportType[] = (data ?? []).map((x: any) => ({
        id: x.id,
        nombre: x.nombre,
        descripcion: x.descripcion ?? null,
      }))
      setList(mapped)
    } catch (e: any) {
      setError(e?.message ?? "Error cargando tipos de reporte")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchList()
  }, [API_BASE_URL, token])

  async function submitForm(e: React.FormEvent) {
    e.preventDefault()
    if (!token) return
    if (!nombre.trim()) {
      setError("El nombre es obligatorio")
      return
    }
    setSaving(true)
    setError(null)
    try {
      const payload = {
        nombre: nombre.trim(),
        ...(descripcion.trim() ? { descripcion: descripcion.trim() } : {}),
      }

      const url = editingId
        ? `${API_BASE_URL}/tipos-reporte/${editingId}`
        : `${API_BASE_URL}/tipos-reporte`
      const method = editingId ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const msg = (await res.json().catch(() => null))?.message ?? "No se pudo guardar el tipo de reporte"
        throw new Error(msg)
      }

      await fetchList()
      resetForm()
    } catch (e: any) {
      setError(e?.message ?? "Error guardando tipo de reporte")
    } finally {
      setSaving(false)
    }
  }

  async function deleteType(id: number) {
    if (!token) return
    if (!confirm("¿Eliminar este tipo de reporte?")) return
    try {
      const res = await fetch(`${API_BASE_URL}/tipos-reporte/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) {
        const msg = (await res.json().catch(() => null))?.message ?? "No se pudo eliminar el tipo de reporte"
        throw new Error(msg)
      }
      await fetchList()
    } catch (e: any) {
      setError(e?.message ?? "Error eliminando tipo de reporte")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold text-gray-800">Tipos de Reporte</h1>
        <div className="w-10" />
      </div>

      <div className="px-6 py-6 grid lg:grid-cols-3 gap-6">
        {/* Listado */}
        <div className="lg:col-span-2 bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center">
                <Shapes className="w-5 h-5 text-amber-600" />
              </span>
              <h3 className="font-semibold text-gray-800">Lista</h3>
            </div>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Filtrar por nombre…"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-gray-50 border-gray-200 w-56"
              />
              <Button variant="outline" size="sm" onClick={fetchList}>
                <RefreshCw className="w-4 h-4 mr-1" /> Refrescar
              </Button>
              <Button size="sm" onClick={startCreate} className="bg-amber-500 hover:bg-amber-600 text-white">
                <Plus className="w-4 h-4 mr-1" /> Nuevo tipo
              </Button>
            </div>
          </div>

          {loading ? (
            <p className="text-sm text-gray-500">Cargando…</p>
          ) : filtered.length === 0 ? (
            <p className="text-sm text-gray-500">No hay tipos de reporte.</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {filtered.map((rt) => (
                <div key={rt.id} className="py-3 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="font-medium text-gray-800 truncate">{rt.nombre}</p>
                    <p className="text-xs text-gray-600 truncate">
                      {rt.descripcion ? rt.descripcion : <span className="text-gray-400">Sin descripción</span>}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => startEdit(rt)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => deleteType(rt.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-3">{editingId ? "Editar tipo de reporte" : "Crear tipo de reporte"}</h3>
          <form className="space-y-3" onSubmit={submitForm}>
            <div>
              <label className="text-sm text-gray-600">Nombre</label>
              <Input value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </div>
            <div>
              <label className="text-sm text-gray-600">Descripción (opcional)</label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full min-h-[90px] rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-300"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Button type="submit" disabled={saving} className="bg-amber-500 hover:bg-amber-600 text-white">
                {saving ? "Guardando…" : editingId ? "Guardar cambios" : "Crear tipo"}
              </Button>
              {editingId !== null && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}