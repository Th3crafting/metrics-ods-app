import { NivelIncidencia } from "./NivelIncidencia";

export interface NivelIncidenciaPort {
    createNivelIncidencia(nivel: Omit<NivelIncidencia, "id">): Promise<number>;
    updateNivelIncidencia(id: number, nivel: Partial<NivelIncidencia>): Promise<boolean>;
    deleteNivelIncidencia(id: number): Promise<boolean>;
    getAllNivelesIncidencia(): Promise<NivelIncidencia[]>;
    getNivelIncidenciaById(id: number): Promise<NivelIncidencia | null>;
    //getNivelIncidenciaByNivel(nivel: number): Promise<NivelIncidencia | null>;
}