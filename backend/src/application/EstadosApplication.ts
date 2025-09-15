import { Estados } from "../domain/estados/Estados";
import { EstadosPort } from "../domain/estados/EstadosPort";

export class EstadoApplication {
    private port: EstadosPort;

    constructor(port: EstadosPort) {
        this.port = port;
    }

    async createEstado(estado: Omit<Estados, "id">): Promise<number> {
        return await this.port.createEstado(estado);
    }

    async updateEstado(id: number, estado: Partial<Estados>): Promise<boolean> {
        const existing = await this.port.getEstadoById(id);
        if (!existing) throw new Error("Estado no encontrado");
        return await this.port.updateEstado(id, estado);
    }

    async deleteEstado(id: number): Promise<boolean> {
        const existing = await this.port.getEstadoById(id);
        if (!existing) throw new Error("Estado no encontrado");
        return await this.port.deleteEstado(id);
    }

    async getAllEstados(): Promise<Estados[]> {
        return await this.port.getAllEstados();
    }

    async getEstadoById(id: number): Promise<Estados | null> {
        return await this.port.getEstadoById(id);
    }
}