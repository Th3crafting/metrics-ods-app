import { Localidad } from "./Localidad";

export interface LocalidadPort {
    createLocalidad(localidad: Omit<Localidad,"id">): Promise<number>;         
    updateLocalidad(id:number, localidad:Partial<Localidad>):Promise<boolean>; 
    deleteLocalidad(id:number):Promise<boolean>;
    getAllLocalidades():Promise<Localidad[]>;
    getLocalidadById(id:number):Promise<Localidad | null>;
}