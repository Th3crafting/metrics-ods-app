export interface Reporte {
    id: number;
    titulo: string;
    descripcion: string;
    direccion: string;
    latitud: number;
    longitud: number;
    fecha: Date;
    estado: string; 
    usuarioId: number;
    tipoReporteId: number;
    sectorId: number;
    EntidadExternaid: number;
}