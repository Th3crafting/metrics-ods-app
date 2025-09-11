"use client"

import { useState } from "react"
import { LoginScreen } from "@/components/login-screen"
import { RegisterScreen } from "@/components/register-screen"
import { ModeratorWelcomeScreen } from "@/components/moderator-welcome-screen"
import { ModeratorCasesScreen } from "@/components/moderator-cases-screen"
import { CaseReviewScreen } from "@/components/case-review-screen"
import { EntitySelectionScreen } from "@/components/entity-selection-screen"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<
    | "login"
    | "register"
    | "main"
    | "welcome"
    | "report-details"
    | "report-success"
    | "report-history"
    | "settings"
    | "moderator-welcome"
    | "moderator-cases"
    | "case-review"
    | "entity-selection"
  >("login")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<"user" | "moderator">("user")
  const [reportData, setReportData] = useState<any>(null)
  const [currentCaseData, setCurrentCaseData] = useState<any>(null)

  const handleLogin = (role: "user" | "moderator" = "user") => {
    setIsAuthenticated(true)
    setUserRole(role)
    if (role === "moderator") {
      setCurrentScreen("moderator-welcome")
    } else {
      setCurrentScreen("main")
    }
  }

  const handleRegister = () => {
    setIsAuthenticated(true)
    setCurrentScreen("moderator-welcome")
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentScreen("login")
  }


  const handleViewReports = () => {
    setCurrentScreen("report-history")
  }

  const handleSettings = () => {
    setCurrentScreen("settings")
  }

  const handleContinueReport = (data: any) => {
    setReportData(data)
    setCurrentScreen("report-details")
  }

  const handleSubmitReport = (detailsData: any) => {
    console.log("Reporte enviado:", detailsData)
    setReportData(null)
    setCurrentScreen("report-success")
  }

  const handleViewCases = () => {
    setCurrentScreen("moderator-cases")
  }

  const handleViewCase = (caseId: string) => {
    console.log("Ver caso:", caseId)
    setCurrentCaseData({
      id: caseId,
      type: "Basura",
      description: "Acumulación de basura cerca al restaurante El Buen Sabor.",
      location: "Calle 45 #23-67, Barrio Centro",
      department: "Cundinamarca",
      municipality: "Bogotá",
      locality: "Chapinero",
      urgency: "Alto",
      reportedBy: "María González",
      reportedAt: "2024-01-15 14:30",
    })
    setCurrentScreen("case-review")
  }

  const handleAssignToEntity = () => {
    setCurrentScreen("entity-selection")
  }

  const handleEntityAssigned = () => {
    setCurrentScreen("case-review")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        {currentScreen === "login" && (
          <LoginScreen onLogin={handleLogin} onSwitchToRegister={() => setCurrentScreen("register")} />
        )}
        {currentScreen === "register" && (
          <RegisterScreen onRegister={handleRegister} onSwitchToLogin={() => setCurrentScreen("login")} />
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentScreen === "moderator-welcome" && (
        <ModeratorWelcomeScreen
          onBack={handleLogout}
          onViewCases={handleViewCases}
          onDashboard={() => console.log("Dashboard")}
        />
      )}
      {currentScreen === "moderator-cases" && (
        <ModeratorCasesScreen onBack={() => setCurrentScreen("moderator-welcome")} onViewCase={handleViewCase} />
      )}
      {currentScreen === "case-review" && (
        <CaseReviewScreen onBack={() => setCurrentScreen("moderator-cases")} onAssignToEntity={handleAssignToEntity} />
      )}
      {currentScreen === "entity-selection" && (
        <EntitySelectionScreen
          onBack={() => setCurrentScreen("case-review")}
          onEntityAssigned={handleEntityAssigned}
          caseData={currentCaseData}
        />
      )}
    </div>
  )
}
