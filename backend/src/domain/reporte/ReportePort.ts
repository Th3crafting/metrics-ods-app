import { NewReporte, Reporte } from "./Reporte";

export interface ReportePort {
    existsUsuario(id: number): Promise<boolean>;
    existsTipoReporte(id: number): Promise<boolean>;
    existsSector(id: number): Promise<boolean>;
    existsNivelIncidencia(id: number): Promise<boolean>;
    existsEntidadExterna(id: number): Promise<boolean>;

    getEstadoAbierto(): Promise<number>;

    createReporte(input: NewReporte, estadoId: number): Promise<Reporte>;

    updateReporte(id:number, reporte:Partial<Reporte>):Promise<boolean>; 
    deleteReporte(id:number):Promise<boolean>;
    getAllReportes():Promise<Reporte[]>;
    getReporteById(id:number):Promise<Reporte | null>;
    getReportesByUsuario(userId:number):Promise<Reporte[]>;
}