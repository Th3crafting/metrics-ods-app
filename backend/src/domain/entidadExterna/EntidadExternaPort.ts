import { EntidadExterna } from "./EntidadExterna";

export interface EntidadExternaPort {
    createEntidadExterna(entidad: Omit<EntidadExterna, "id">): Promise<number>;
    updateEntidadExterna(id: number, entidad: Partial<EntidadExterna>): Promise<boolean>;
    deleteEntidadExterna(id: number): Promise<boolean>;
    getAllEntidadesExternas(): Promise<EntidadExterna[]>;
    getEntidadExternaById(id: number): Promise<EntidadExterna | null>;
}