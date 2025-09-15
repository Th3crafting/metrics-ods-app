import { EntidadExterna } from "../domain/entidadExterna/EntidadExterna";
import { EntidadExternaPort } from "../domain/entidadExterna/EntidadExternaPort";

export class EntidadExternaApplication {
    private port: EntidadExternaPort;

    constructor(port: EntidadExternaPort) {
        this.port = port;
    }

    async createEntidadExterna(entidad: Omit<EntidadExterna, "id">): Promise<number> {
        return await this.port.createEntidadExterna(entidad);
    }

    async updateEntidadExterna(id: number, entidad: Partial<EntidadExterna>): Promise<boolean> {
        const existing = await this.port.getEntidadExternaById(id);
        if (!existing) throw new Error("Entidad no encontrada");
        return await this.port.updateEntidadExterna(id, entidad);
    }

    async deleteEntidadExterna(id: number): Promise<boolean> {
        const existing = await this.port.getEntidadExternaById(id);
        if (!existing) throw new Error("Entidad no encontrada");
        return await this.port.deleteEntidadExterna(id);
    }

    async getAllEntidadesExternas(): Promise<EntidadExterna[]> {
        return await this.port.getAllEntidadesExternas();
    }

    async getEntidadExternaById(id: number): Promise<EntidadExterna | null> {
        return await this.port.getEntidadExternaById(id);
    }
}