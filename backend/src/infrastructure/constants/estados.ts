export const ESTADOS = {
    ABIERTO: 1,
    PENDIENTE: 2,
    EN_REVISION: 3,
    CERRADO: 4,
    RECHAZADO: 5,
} as const;

export const NOMBRE_ESTADO: Record<number, string> = {
    1: "Abierto",
    2: "Pendiente",
    3: "En Revisión",
    4: "Cerrado",
    5: "Rechazado",
};