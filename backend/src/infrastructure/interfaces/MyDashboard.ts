export interface DashboardTotals {
    total: number;
    thisMonth: number;
}

export interface DashboardByStatus {
    Abierto: number;
    Pendiente: number;
    EnRevision: number;
    Cerrado: number;
    Rechazado: number;
}

export interface DashboardReportItem {
    id: number;
    titulo: string;
    descripcion: string | null;
    direccion: string;
    fecha: string;
    tipoReporteId: number;
    tipoReporteNombre: string;
    urgency: "baja" | "media" | "alta"
    reporter: string
}

export interface DashboardResponse {
    totals: { total: number; thisMonth: number };
    byStatus: DashboardByStatus;
    lists: {
        Abierto: DashboardReportItem[];
        Pendiente: DashboardReportItem[];
        EnRevision: DashboardReportItem[];
        Cerrado: DashboardReportItem[];
        Rechazado: DashboardReportItem[];
    };
}