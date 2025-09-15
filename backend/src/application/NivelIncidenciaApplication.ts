import { NivelIncidencia } from "../domain/nivelIncidencia/NivelIncidencia";
import { NivelIncidenciaPort } from "../domain/nivelIncidencia/NivelIncidenciaPort";

export class NivelIncidenciaApplication {
    private port: NivelIncidenciaPort;

    constructor(port: NivelIncidenciaPort) {
        this.port = port;
    }

    async createNivelIncidencia(nivel: Omit<NivelIncidencia, "id">): Promise<number> {
        return await this.port.createNivelIncidencia(nivel);
    }

    async updateNivelIncidencia(id: number, nivel: Partial<NivelIncidencia>): Promise<boolean> {
        const existing = await this.port.getNivelIncidenciaById(id);
        if (!existing) throw new Error("Nivel de incidencia no encontrado");
        return await this.port.updateNivelIncidencia(id, nivel);
    }

    async deleteNivelIncidencia(id: number): Promise<boolean> {
        const existing = await this.port.getNivelIncidenciaById(id);
        if (!existing) throw new Error("Nivel de incidencia no encontrado");
        return await this.port.deleteNivelIncidencia(id);
    }

    async getAllNivelesIncidencia(): Promise<NivelIncidencia[]> {
        return await this.port.getAllNivelesIncidencia();
    }

    async getNivelIncidenciaById(id: number): Promise<NivelIncidencia | null> {
        return await this.port.getNivelIncidenciaById(id);
    }
}