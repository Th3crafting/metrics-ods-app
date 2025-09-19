"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { API_BASE_URL } from "@/lib/env"
import { ArrowLeft, Plus, Pencil, Trash2, Shield } from "lucide-react"

interface AdminModeratorsScreenProps {
    onBack: () => void
}

type Moderador = {
    id: number
    nombre: string
    email: string
    isAdmin: boolean
}

export function AdminModeratorsScreen({ onBack }: AdminModeratorsScreenProps) {
  const token = useMemo(() => (typeof window !== "undefined" ? localStorage.getItem("auth_token") : null), [])

  const [list, setList] = useState<Moderador[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function fetchList() {
    if (!token) {
      setError("Sesión no encontrada")
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      setError(null)
      const res = await fetch(`${API_BASE_URL}/moderadores`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error("No se pudo obtener la lista de moderadores")
      const data = await res.json()
      const mapped: Moderador[] = (data ?? []).map((m: any) => ({
        id: m.id,
        nombre: m.nombre,
        email: m.email,
        isAdmin: !!(m.isAdmin ?? m.is_admin),
      }))
      setList(mapped)
    } catch (e: any) {
      setError(e?.message ?? "Error cargando moderadores")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchList()
  }, [API_BASE_URL, token])

  function resetForm() {
    setIsEditing(false)
    setEditingId(null)
    setNombre("")
    setEmail("")
    setPassword("")
    setIsAdmin(false)
  }

  function startCreate() {
    resetForm()
    setIsEditing(true)
  }

  function startEdit(m: Moderador) {
    setIsEditing(true)
    setEditingId(m.id)
    setNombre(m.nombre)
    setEmail(m.email)
    setPassword("")
    setIsAdmin(m.isAdmin)
  }

  async function submitForm(e: React.FormEvent) {
    e.preventDefault()
    if (!token) return
    setSubmitting(true)
    setError(null)
    try {
      const body: any = { nombre, email, isAdmin }
      if (!editingId) {
        if (!password.trim()) throw new Error("La contraseña es obligatoria para crear")
        body.password = password
      } else {
        if (password.trim()) body.password = password
      }

      const url = !editingId
        ? `${API_BASE_URL}/moderadores`
        : `${API_BASE_URL}/moderadores/${editingId}`
      const method = !editingId ? "POST" : "PUT"

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const msg = (await res.json().catch(() => null))?.message ?? "Error guardando moderador"
        throw new Error(msg)
      }

      await fetchList()
      resetForm()
    } catch (e: any) {
      setError(e?.message ?? "Error guardando moderador")
    } finally {
      setSubmitting(false)
    }
  }

  async function deleteModerator(id: number) {
    if (!token) return
    if (!confirm("¿Eliminar este moderador?")) return
    try {
      const res = await fetch(`${API_BASE_URL}/moderadores/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) {
        const msg = (await res.json().catch(() => null))?.message ?? "No se pudo eliminar"
        throw new Error(msg)
      }
      await fetchList()
    } catch (e: any) {
      setError(e?.message ?? "Error eliminando moderador")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold text-gray-800">Moderadores</h1>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="px-6 py-6 grid lg:grid-cols-2 gap-6">
        {/* Listado */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Lista</h3>
            <Button size="sm" onClick={startCreate} className="bg-teal-600 hover:bg-teal-700 text-white">
              <Plus className="w-4 h-4 mr-1" /> Nuevo moderador
            </Button>
          </div>
          {loading && <p className="text-sm text-gray-500">Cargando…</p>}
          {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
          {!loading && list.length === 0 && <p className="text-sm text-gray-500">No hay moderadores.</p>}
          <div className="divide-y divide-gray-100">
            {list.map((m) => (
              <div key={m.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">{m.nombre}</p>
                  <p className="text-sm text-gray-600">{m.email}</p>
                  {m.isAdmin && (
                    <span className="inline-flex items-center text-xs mt-1 px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                      <Shield className="w-3 h-3 mr-1" /> Administrador
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => startEdit(m)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => deleteModerator(m.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-3">{editingId ? "Editar moderador" : "Crear moderador"}</h3>
          <form className="space-y-3" onSubmit={submitForm}>
            <div>
              <label className="text-sm text-gray-600">Nombre</label>
              <Input value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </div>
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="text-sm text-gray-600">
                {editingId ? "Contraseña (dejar vacío para no cambiar)" : "Contraseña"}
              </label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} {...(!editingId && { required: true })} />
            </div>
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
              Es administrador
            </label>

            <div className="flex items-center gap-2 pt-2">
              <Button type="submit" disabled={submitting} className="bg-teal-600 hover:bg-teal-700 text-white">
                {submitting ? "Guardando..." : editingId ? "Guardar cambios" : "Crear"}
              </Button>
              {isEditing && (
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