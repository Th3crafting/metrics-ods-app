import { Localidad } from "./Localidad";

export type LocalidadListDTO = {
    id: number;
    nombre: string;
    sectorId: number;
    sectorNombre: string;
};

export interface LocalidadPort {
    createLocalidad(localidad: Omit<Localidad,"id">): Promise<number>;         
    updateLocalidad(id:number, localidad:Partial<Localidad>):Promise<boolean>; 
    deleteLocalidad(id:number):Promise<boolean>;
    getAllLocalidades():Promise<Localidad[]>;
    getLocalidadById(id:number):Promise<Localidad | null>;
    getAllLocalidadesWithSector(): Promise<LocalidadListDTO[]>;

    findByName(nombre: string): Promise<Localidad | null>;
}