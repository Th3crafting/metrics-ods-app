import { Localidad } from "../domain/localidad/Localidad";
import { LocalidadPort } from "../domain/localidad/LocalidadPort";

export class LocalidadApplication {
    private port: LocalidadPort;

    constructor(port: LocalidadPort) {
        this.port = port;
    }

    async createLocalidad(localidad: Omit<Localidad, "id">): Promise<number> {
        const existing = await this.port.getAllLocalidades();
        if (existing) {
            throw new Error("La localidad ya existe");
        }
        return await this.port.createLocalidad(localidad);
    }

    async updateLocalidad(id: number, localidad: Partial<Localidad>): Promise<boolean> {
        const existing = await this.port.getLocalidadById(id);
        if (!existing) {
            throw new Error("La localidad no existe");
        }

        if (localidad.nombre) {
            const todas = await this.port.getAllLocalidades();
            const nombreTaken = todas.find(l => l.nombre === localidad.nombre);
            if (nombreTaken && nombreTaken.id !== id) {
                throw new Error("El nombre de localidad ya está en uso");
            }
        }
        return await this.port.updateLocalidad(id, localidad);
    }

    async deleteLocalidad(id: number): Promise<boolean> {
        const existing = await this.port.getLocalidadById(id);
        if (!existing) {
            throw new Error("No se encontró la localidad");
        }
        return await this.port.deleteLocalidad(id);
    }

    async getLocalidadById(id: number): Promise<Localidad | null> {
        return await this.port.getLocalidadById(id);
    }

    async getAllLocalidades(): Promise<Localidad[]> {
        return await this.port.getAllLocalidades();
    }
}