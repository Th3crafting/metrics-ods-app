import { TipoReporte } from "../domain/tipoReporte/TipoReporte";
import { TipoReportePort } from "../domain/tipoReporte/TipoReportePort";

export class TipoReporteApplication {
    private port: TipoReportePort;

    constructor(port: TipoReportePort) {
        this.port = port;
    }

    async createTipoReporte(tipo: Omit<TipoReporte, "id">): Promise<number> {
        return await this.port.createTipoReporte(tipo);
    }

    async updateTipoReporte(id: number, tipo: Partial<TipoReporte>): Promise<boolean> {
        const existing = await this.port.getTipoReporteById(id);
        if (!existing) {
            throw new Error("El tipo de reporte no existe");
        }
        return await this.port.updateTipoReporte(id, tipo);
    }

    async deleteTipoReporte(id: number): Promise<boolean> {
        const existing = await this.port.getTipoReporteById(id);
        if (!existing) {
            throw new Error("El tipo de reporte no existe");
        }
        return await this.port.deleteTipoReporte(id);
    }

    async getAllTiposReporte(): Promise<TipoReporte[]> {
        return await this.port.getAllTiposReporte();
    }

    async getTipoReporteById(id: number): Promise<TipoReporte | null> {
        return await this.port.getTipoReporteById(id);
    }
}