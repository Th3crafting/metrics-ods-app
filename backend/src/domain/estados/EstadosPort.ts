import { Estados } from "./Estados";

export interface EstadosPort {
    createEstado(estado: Omit<Estados, "id">): Promise<number>;
    updateEstado(id: number, estado: Partial<Estados>): Promise<boolean>;
    deleteEstado(id: number): Promise<boolean>;
    getAllEstados(): Promise<Estados[]>;
    getEstadoById(id: number): Promise<Estados | null>;
    //getEstadoByNombre(nombre: string): Promise<Estados | null>;
}
