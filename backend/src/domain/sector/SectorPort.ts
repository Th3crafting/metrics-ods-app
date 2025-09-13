import { Sector } from "./Sector";

export interface SectorPort {
    createSector(sector: Omit<Sector,"id">): Promise<number>;         
    updateSector(id:number, sector:Partial<Sector>):Promise<boolean>; 
    deleteSector(id:number):Promise<boolean>;
    getAllSectores():Promise<Sector[]>;
    getSectorById(id:number):Promise<Sector | null>;
    getSectoresByLocalidad(localidadId:number):Promise<Sector[]>;
}