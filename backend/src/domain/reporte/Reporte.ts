export interface NewReporte {
    titulo: string;
    descripcion?: string | null;
    direccion?: string | null;

    tipoReporteId: number;
    sectorId: number;
    nivelIncidenciaId: number;
    entidadExternaId?: number | null;

    usuarioId: number;
}

export interface Reporte extends NewReporte {
    id: number;
    fecha: Date;
    estadoId: number;
}