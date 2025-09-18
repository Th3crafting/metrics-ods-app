import { Sector } from "../domain/sector/Sector";
import { SectorPort } from "../domain/sector/SectorPort";

export class SectorApplication {
    private sectorPort: SectorPort;

    constructor(sectorPort: SectorPort) {
        this.sectorPort = sectorPort;
    }

    async createSector(sector: Omit<Sector, "id">): Promise<number> {
        return this.sectorPort.createSector(sector);
    }

    async updateSector(id: number, sector: Partial<Sector>): Promise<boolean> {
        return this.sectorPort.updateSector(id, sector);
    }

    async deleteSector(id: number): Promise<boolean> {
        return this.sectorPort.deleteSector(id);
    }

    async getAllSectores(): Promise<Sector[]> {
        return this.sectorPort.getAllSectores();
    }

    async getSectorById(id: number): Promise<Sector | null> {
        return this.sectorPort.getSectorById(id);
    }
}