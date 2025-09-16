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

export interface DashboardResponse {
    totals: { total: number; thisMonth: number };
    byStatus: DashboardByStatus;
    lists: {
        Abierto: any[];
        Pendiente: any[];
        EnRevision: any[];
        Cerrado: any[];
        Rechazado: any[];
    };
}