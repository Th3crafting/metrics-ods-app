import { TipoReporte } from "./TipoReporte";

export interface TipoReportePort {
    createTipoReporte(tipo: Omit<TipoReporte,"id">): Promise<number>;         
    updateTipoReporte(id:number, tipo:Partial<TipoReporte>):Promise<boolean>; 
    deleteTipoReporte(id:number):Promise<boolean>;
    getAllTiposReporte():Promise<TipoReporte[]>;
    getTipoReporteById(id:number):Promise<TipoReporte | null>;
}