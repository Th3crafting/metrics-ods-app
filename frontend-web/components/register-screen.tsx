"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

interface RegisterScreenProps {
  onRegister: () => void
  onSwitchToLogin: () => void
}

export function RegisterScreen({ onRegister, onSwitchToLogin }: RegisterScreenProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }
    if (!acceptTerms) {
      alert("Debes aceptar los términos y condiciones")
      return
    }
    onRegister()
  }

  return (
    <div className="max-w-sm mx-auto px-6 py-8 min-h-screen flex flex-col justify-center">

      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-8">
          <h1 className="text-xl font-medium text-gray-900 mb-2">¡Únete a NodoVerde!</h1>
          <p className="text-sm text-gray-600">Sé parte del cambio en tu comunidad.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              id="register-email"
              data-cy="register-email"
              type="email"
              placeholder="CORREO"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-teal-500 rounded-lg bg-white text-sm placeholder:text-gray-500 placeholder:text-xs placeholder:font-medium"
              required
            />
          </div>

          <div className="relative">
            <Input
              id="register-password"
  data-cy="register-password"
              type="password"
              placeholder="CONTRASEÑA"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-teal-500 rounded-lg bg-white text-sm placeholder:text-gray-500 placeholder:text-xs placeholder:font-medium"
              required
             
            />
          </div>

          <div>
            <Input
            id="register-confirm-password"
              data-cy="register-confirm-password"
              type="password"
              placeholder="CONFIRMAR CONTRASEÑA"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-teal-500 rounded-lg bg-white text-sm placeholder:text-gray-500 placeholder:text-xs placeholder:font-medium"
              required
            />
          </div>

          <Button
          id="register-submit"
  data-cy="register-submit"
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 rounded-lg mt-6"
          >
            REGISTRARSE
          </Button>
        </form>

        <div className="flex items-start gap-3 mt-4 text-xs text-gray-600">
          <Checkbox
           id="register-terms"
            data-cy="register-terms"
            checked={acceptTerms}
            onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            className="mt-0.5 border-green-500 data-[state=checked]:bg-green-500"
          />
          <label htmlFor="terms" className="leading-relaxed">
            Acepto los <span className="text-teal-600 underline cursor-pointer">Condiciones del servicio</span>, los{" "}
            <span className="text-teal-600 underline cursor-pointer">Términos y condiciones generales</span> y la{" "}
            <span className="text-teal-600 underline cursor-pointer">Política de privacidad</span>.
          </label>
        </div>
      </div>

      {/* Home indicator */}
      <div className="flex justify-center mt-8">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  )
}
