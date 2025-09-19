"use client"

import { useState } from "react"
import { LoginScreen } from "@/components/login-screen"
import { ModeratorWelcomeScreen } from "@/components/moderator-welcome-screen"
import { ModeratorCasesScreen } from "@/components/moderator-cases-screen"
import { CaseReviewScreen } from "@/components/case-review-screen"
import { EntitySelectionScreen } from "@/components/entity-selection-screen"
import { AdminToolsScreen } from "@/components/admin-tools-screen"
import { AdminModeratorsScreen } from "@/components/admin-moderators-screen"
import { AdminAssignScreen } from "@/components/admin-assign-screen"
import { AdminEntitiesScreen } from "@/components/admin-entities-screen"
import { AdminReportTypesScreen } from "@/components/admin-report-types-screen"
import type { CaseDTO } from "@/components/case-review-screen"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<
    | "login"
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
    | "admin-tools"
    | "admin-moderators"
    | "admin-assign"
    | "admin-entities"
    | "admin-report-types"
  >("login")

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeCase, setActiveCase] = useState<CaseDTO | null>(null)

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentScreen("login")
  }

  const handleViewCase = (caseData: CaseDTO) => {
    setActiveCase(caseData)
    setCurrentScreen("case-review")
  }

  const handleAssignToEntity = (caseId: number) => {
    setCurrentScreen("entity-selection")
  }

  const handleEntityAssigned = (entityName: string) => {
    setActiveCase((prev) =>
      prev ? { ...prev, entityName, status: "en_revision" } : prev
    )
    setCurrentScreen("case-review")
  }

  const handleViewCases = () => {
    setCurrentScreen("moderator-cases")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentScreen === "login" && (
        <LoginScreen
          onLogin={() => setCurrentScreen("moderator-welcome")}
        />
      )}
      {currentScreen === "moderator-welcome" && (
        <ModeratorWelcomeScreen
          onBack={handleLogout}
          onViewCases={handleViewCases}
          onDashboard={() => console.log("Dashboard")}
          onAdminTools={() => setCurrentScreen("admin-tools")}
        />
      )}
      {currentScreen === "moderator-cases" && (
        <ModeratorCasesScreen onBack={() => setCurrentScreen("moderator-welcome")} onViewCase={handleViewCase} />
      )}
      {currentScreen === "case-review" && (
        <CaseReviewScreen caseData={activeCase ?? undefined} onBack={() => setCurrentScreen("moderator-cases")} onAssignToEntity={handleAssignToEntity} />
      )}
      {currentScreen === "entity-selection" && (
        <EntitySelectionScreen
          onBack={() => setCurrentScreen("case-review")}
          onEntityAssigned={handleEntityAssigned}
          caseId={activeCase?.id ?? 0}
        />
      )}
      {currentScreen === "admin-tools" && (
        <AdminToolsScreen
          onBack={() => setCurrentScreen("moderator-welcome")}
          onManageModerators={() => setCurrentScreen("admin-moderators")}
          onAssignModerators={() => setCurrentScreen("admin-assign")}
          onManageEntities={() => setCurrentScreen("admin-entities")}
          onManageReportTypes={() => setCurrentScreen("admin-report-types")}
        />
      )}
      {currentScreen === "admin-moderators" && (
        <AdminModeratorsScreen onBack={() => setCurrentScreen("admin-tools")} />
      )}
      {currentScreen === "admin-assign" && (
        <AdminAssignScreen onBack={() => setCurrentScreen("admin-tools")} />
      )}
      {currentScreen === "admin-entities" && (
        <AdminEntitiesScreen onBack={() => setCurrentScreen("admin-tools")} />
      )}
      {currentScreen === "admin-report-types" && (
        <AdminReportTypesScreen onBack={() => setCurrentScreen("admin-tools")} />
      )}
    </div>
  )
}
