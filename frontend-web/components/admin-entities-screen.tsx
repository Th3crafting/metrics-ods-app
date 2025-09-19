"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { API_BASE_URL } from "@/lib/env"
import { ArrowLeft, Plus, Pencil, Trash2, Building2, RefreshCw } from "lucide-react"

type ExtEntity = {
  id: number
  nombre: string
  contacto?: string | null
  telefono?: string | null
}

interface AdminEntitiesScreenProps {
  onBack: () => void
}

export function AdminEntitiesScreen({ onBack }: AdminEntitiesScreenProps) {
  const token = useMemo(() => (typeof window !== "undefined" ? localStorage.getItem("auth_token") : null), [])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [list, setList] = useState<ExtEntity[]>([])
  const [filter, setFilter] = useState("")

  const [editingId, setEditingId] = useState<number | null>(null)
  const [nombre, setNombre] = useState("")
  const [contacto, setContacto] = useState("")
  const [telefono, setTelefono] = useState("")

  const filtered = list.filter(e => e.nombre.toLowerCase().includes(filter.trim().toLowerCase()))

  function resetForm() {
    setEditingId(null)
    setNombre("")
    setContacto("")
    setTelefono("")
  }

  function startCreate() {
    resetForm()
  }

  function startEdit(e: ExtEntity) {
    setEditingId(e.id)
    setNombre(e.nombre ?? "")
    setContacto(e.contacto ?? "")
    setTelefono(e.telefono ?? "")
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
      const res = await fetch(`${API_BASE_URL}/entidades-externas`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error("No se pudieron obtener las entidades")
      const data = (await res.json()) as any[]
      const mapped: ExtEntity[] = (data ?? []).map(x => ({
        id: x.id,
        nombre: x.nombre,
        contacto: x.contacto ?? null,
        telefono: x.telefono ?? null,
      }))
      setList(mapped)
    } catch (e: any) {
      setError(e?.message ?? "Error cargando entidades")
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
      const payload: Partial<ExtEntity> = {
        nombre: nombre.trim(),
        contacto: contacto.trim() || undefined,
        telefono: telefono.trim() || undefined,
      }

      const url = editingId
        ? `${API_BASE_URL}/entidades-externas/${editingId}`
        : `${API_BASE_URL}/entidades-externas`
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
        const msg = (await res.json().catch(() => null))?.message ?? "No se pudo guardar la entidad"
        throw new Error(msg)
      }

      await fetchList()
      resetForm()
    } catch (e: any) {
      setError(e?.message ?? "Error guardando entidad")
    } finally {
      setSaving(false)
    }
  }

  async function deleteEntity(id: number) {
    if (!token) return
    if (!confirm("¿Eliminar esta entidad externa?")) return
    try {
      const res = await fetch(`${API_BASE_URL}/entidades-externas/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) {
        const msg = (await res.json().catch(() => null))?.message ?? "No se pudo eliminar la entidad"
        throw new Error(msg)
      }
      await fetchList()
    } catch (e: any) {
      setError(e?.message ?? "Error eliminando entidad")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold text-gray-800">Entidades Externas</h1>
        <div className="w-10" />
      </div>

      <div className="px-6 py-6 grid lg:grid-cols-3 gap-6">
        {/* Listado */}
        <div className="lg:col-span-2 bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-emerald-600" />
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
              <Button size="sm" onClick={startCreate} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Plus className="w-4 h-4 mr-1" /> Nueva entidad
              </Button>
            </div>
          </div>

          {loading ? (
            <p className="text-sm text-gray-500">Cargando…</p>
          ) : filtered.length === 0 ? (
            <p className="text-sm text-gray-500">No hay entidades.</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {filtered.map((e) => (
                <div key={e.id} className="py-3 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="font-medium text-gray-800 truncate">{e.nombre}</p>
                    <p className="text-xs text-gray-600 truncate">
                      {e.contacto ? e.contacto : <span className="text-gray-400">Sin contacto</span>}
                      {e.telefono ? ` · ${e.telefono}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => startEdit(e)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => deleteEntity(e.id)}>
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
          <h3 className="font-semibold text-gray-800 mb-3">{editingId ? "Editar entidad" : "Crear entidad"}</h3>
          <form className="space-y-3" onSubmit={submitForm}>
            <div>
              <label className="text-sm text-gray-600">Nombre</label>
              <Input value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </div>
            <div>
              <label className="text-sm text-gray-600">Contacto (email u otro)</label>
              <Input value={contacto} onChange={(e) => setContacto(e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-gray-600">Teléfono</label>
              <Input value={telefono} onChange={(e) => setTelefono(e.target.value)} />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Button type="submit" disabled={saving} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                {saving ? "Guardando…" : editingId ? "Guardar cambios" : "Crear entidad"}
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