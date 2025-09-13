"use client"

import { RegisterScreen } from "@/components/register-screen"

export default function RegisterPage() {
  const handleRegister = () => {
    console.log("Usuario registrado")
    // aquí puedes hacer navegación con router.push("/login") o lo que necesites
  }

  const handleSwitchToLogin = () => {
    console.log("Ir a login")
    // router.push("/login")
  }

  return (
    <RegisterScreen
      onRegister={handleRegister}
      onSwitchToLogin={handleSwitchToLogin}
    />
  )
}
