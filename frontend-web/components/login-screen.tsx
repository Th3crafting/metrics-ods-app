"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link, Shield } from "lucide-react"

interface LoginScreenProps {
  onLogin: (role?: "user" | "moderator") => void
  onSwitchToRegister: () => void
}

export function LoginScreen({ onLogin, onSwitchToRegister }: LoginScreenProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {}

    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Ingrese un correo válido (ejemplo@dominio.com)"
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/;
    if (!passwordRegex.test(password)) {
      newErrors.password =
        "La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onLogin("user")
    }
  }

  const handleModeratorLogin = () => {
    if (validate()) {
      onLogin("moderator")
    }
  }

  return (
    <div className="max-w-sm mx-auto px-6 py-8 min-h-screen flex flex-col justify-center">
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-xl font-medium text-center mb-8 text-gray-900">
          Iniciar Sesión en NodoVerde
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
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
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div className="text-center mt-4">
            <button
              type="button"
              data-cy="forgot-password"
              className="text-sm text-gray-600 underline"
            >
              ¿Olvidó su contraseña?
            </button>
          </div>

          <Button
            id="login-submit"
            type="submit"
            data-cy="login-submit"
            onClick={handleModeratorLogin}
            className="w-full mt-4 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <Shield className="w-4 h-4" />
            INICIAR SESIÓN
          </Button>
        </form>
          <Link
            href="/register"
            data-cy="login-switch-register"
            className="block w-full mt-4 border-2 border-green-500 text-green-600 hover:bg-green-50 font-medium py-3 rounded-lg bg-transparent text-center"
          >
            CREAR CUENTA NUEVA
          </Link>
      </div>

      {/* Home indicator */}
      <div className="flex justify-center mt-8">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  )
}
