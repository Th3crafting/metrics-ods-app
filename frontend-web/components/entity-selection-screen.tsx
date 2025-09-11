"use client"

import { ArrowLeft, Building2, Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface EntitySelectionScreenProps {
  onBack: () => void
  onEntityAssigned: () => void
  caseData: any
}

export function EntitySelectionScreen({ onBack, onEntityAssigned, caseData }: EntitySelectionScreenProps) {
  const [selectedEntity, setSelectedEntity] = useState<string>("")
  const [showNotification, setShowNotification] = useState(false)

  const entities = [
    { id: "secretaria-ambiente", name: "Secretaría de Ambiente", type: "Ambiental" },
    { id: "acueducto", name: "Empresa de Acueducto", type: "Servicios Públicos" },
    { id: "policia-ambiental", name: "Policía Ambiental", type: "Seguridad" },
    { id: "alcaldia-local", name: "Alcaldía Local", type: "Gobierno" },
    { id: "bomberos", name: "Cuerpo de Bomberos", type: "Emergencias" },
    { id: "defensa-civil", name: "Defensa Civil", type: "Emergencias" },
  ]

  const handleSendToEntity = () => {
    if (!selectedEntity) return

    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
      onEntityAssigned()
    }, 2000)
  }

  const getEntityColor = (type: string) => {
    switch (type) {
      case "Ambiental":
        return "bg-green-100 text-green-800 border-green-200"
      case "Servicios Públicos":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Seguridad":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Gobierno":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Emergencias":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 py-2 text-sm font-medium bg-white">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-black rounded-full"></div>
            <div className="w-1 h-3 bg-black rounded-full"></div>
            <div className="w-1 h-3 bg-black rounded-full"></div>
            <div className="w-1 h-3 bg-gray-300 rounded-full"></div>
          </div>
          <div className="w-6 h-3 border border-black rounded-sm">
            <div className="w-4 h-2 bg-black rounded-sm m-0.5"></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold text-gray-800">Asignar Entidad</h1>
        <div className="w-10"></div>
      </div>

      {/* Notification */}
      {showNotification && (
        <div className="mx-6 mt-4 p-3 bg-green-100 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-800">Caso enviado exitosamente a la entidad</span>
          </div>
        </div>
      )}

      <div className="px-6 py-4">
        {/* Case Summary */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">ID: {caseData.id}</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm font-medium text-orange-600">{caseData.type}</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-2">{caseData.location}</p>
          <div className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-lg text-xs font-medium inline-block">
            Estado: Pendiente
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">Instrucciones</h3>
          <p className="text-sm text-blue-700">
            Selecciona la entidad más apropiada para manejar este caso según el tipo de problema reportado. Una vez
            asignado, el caso quedará en seguimiento y podrás marcarlo como realizado cuando sea resuelto.
          </p>
        </div>

        {/* Entity Selection */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">Seleccionar Entidad Responsable</h3>
          <div className="space-y-3">
            {entities.map((entity) => (
              <div
                key={entity.id}
                onClick={() => setSelectedEntity(entity.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedEntity === entity.id
                    ? "border-teal-500 bg-teal-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-gray-600" />
                    <div>
                      <h4 className="font-medium text-gray-800">{entity.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full border ${getEntityColor(entity.type)}`}>
                        {entity.type}
                      </span>
                    </div>
                  </div>
                  {selectedEntity === entity.id && <CheckCircle className="w-5 h-5 text-teal-500" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Send Button */}
        <Button
          onClick={handleSendToEntity}
          disabled={!selectedEntity}
          className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-gray-300 text-white py-3 rounded-lg flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          Enviar Caso a Entidad
        </Button>
      </div>

      {/* Bottom Indicator */}
      <div className="flex justify-center py-4">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  )
}
