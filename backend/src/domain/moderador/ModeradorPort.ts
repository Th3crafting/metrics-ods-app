import { Moderador } from "./Moderador";

export interface ModeradorPort {
    createModerador(moderador: Omit<Moderador, "id">): Promise<number>;
    updateModerador(id: number, moderador: Partial<Moderador>): Promise<boolean>;
    deleteModerador(id: number): Promise<boolean>;
    getAllModeradores(): Promise<Moderador[]>;
    getModeradorById(id: number): Promise<Moderador | null>;
    getModeradorByEmail(email: string): Promise<Moderador | null>;

    getSectoresIds(moderadorId: number): Promise<number[]>;
    setSectores(moderadorId: number, sectorIds: number[]): Promise<boolean>;
}