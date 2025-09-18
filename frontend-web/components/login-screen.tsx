"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shield } from "lucide-react"
import { API_BASE_URL } from "@/lib/env"

interface LoginScreenProps {
  onLogin: (role?: "user" | "moderator") => void
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [apiError, setApiError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const validateEmail = (email: string) =>
    /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)

  const validatePassword = (password: string) =>
    password.trim().length > 0

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!validateEmail(email)) {
      newErrors.email = "Ingrese un correo válido (ejemplo@dominio.com)"
    }

    if (!validatePassword(password)) {
      newErrors.password = "La contraseña no puede estar vacía"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleModeratorLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setApiError(null)
    if (!validate()) return

    try {
      setLoading(true)
      const res = await fetch(`${API_BASE_URL}/moderadores/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        let message = "No se pudo iniciar sesión"
        try {
          const err = await res.json()
          message = err?.message || message
        } catch {}
        throw new Error(message)
      }

      const data: { token: string } = await res.json()
      localStorage.setItem("auth_token", data.token)
      onLogin("moderator")
    } catch (err: any) {
      setApiError(err?.message ?? "Error inesperado")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto px-6 py-8 min-h-screen flex flex-col justify-center">
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-xl font-medium text-center mb-8 text-gray-900">
          Iniciar Sesión en NodoVerde
        </h1>

        <form onSubmit={handleModeratorLogin} className="space-y-4">
          <div>
            <Input
              id="login-email"
              type="email"
              placeholder="CORREO"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-cy="email"
              className="w-full px-4 py-3 border-2 border-teal-500 rounded-lg bg-white text-sm placeholder:text-gray-500 placeholder:text-xs placeholder:font-medium"
              required
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <Input
              id="login-password"
              type="password"
              placeholder="CONTRASEÑA"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-cy="password"
              className="w-full px-4 py-3 border-2 border-teal-500 rounded-lg bg-white text-sm placeholder:text-gray-500 placeholder:text-xs placeholder:font-medium"
              required
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {apiError && <p className="text-red-500 text-xs">{apiError}</p>}

          <Button
            id="login-submit"
            type="submit"
            data-cy="login-submit"
            disabled={loading}
            className="w-full mt-4 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <Shield className="w-4 h-4" />
            {loading ? "Entrando..." : "INICIAR SESIÓN"}
          </Button>
        </form>
      </div>
    </div>
  )
}