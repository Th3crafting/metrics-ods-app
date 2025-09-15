import { Reporte } from "../domain/reporte/Reporte";
import { ReportePort } from "../domain/reporte/ReportePort";

export class ReporteApplication {
    private port: ReportePort;

    constructor(port: ReportePort) {
        this.port = port;
    }

    async createReporte(reporte: Omit<Reporte, "id">): Promise<number> {
        return await this.port.createReporte(reporte);
    }

    async updateReporte(id: number, reporte: Partial<Reporte>): Promise<boolean> {
        const existing = await this.port.getReporteById(id);
        if (!existing) throw new Error("El reporte no existe");
        return await this.port.updateReporte(id, reporte);
    }

    async deleteReporte(id: number): Promise<boolean> {
        const existing = await this.port.getReporteById(id);
        if (!existing) throw new Error("El reporte no existe");
        return await this.port.deleteReporte(id);
    }

    async getAllReportes(): Promise<Reporte[]> {
        return await this.port.getAllReportes();
    }

    async getReporteById(id: number): Promise<Reporte | null> {
        return await this.port.getReporteById(id);
    }
}