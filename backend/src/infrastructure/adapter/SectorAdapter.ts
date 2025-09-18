import { Repository } from "typeorm";

import { Sector } from "../../domain/sector/Sector";
import { SectorPort } from "../../domain/sector/SectorPort";
import { SectorEntity } from "../entities/SectorEntity";
import { AppDataSource } from "../config/con_data_base";

export class SectorAdapter implements SectorPort {
    private sectorRepository: Repository<SectorEntity>;

    constructor() {
        this.sectorRepository = AppDataSource.getRepository(SectorEntity);
    }

    private toDomain(sector: SectorEntity): Sector {
        return {
            id: sector.id,
            nombre: sector.nombre,
        };
    }

    private toEntity(sector: Omit<Sector, "id">): SectorEntity {
        const sectorEntity = new SectorEntity();
        sectorEntity.nombre = sector.nombre;
        return sectorEntity;
    }

    async createSector(sector: Omit<Sector, "id">): Promise<number> {
        const newSector = this.toEntity(sector);
        const savedSector = await this.sectorRepository.save(newSector);
        return savedSector.id;
    }

    async updateSector(id: number, sector: Partial<Sector>): Promise<boolean> {
        const existingSector = await this.sectorRepository.findOne({ where: { id } });
        if (!existingSector) return false;
        Object.assign(existingSector, sector);
        await this.sectorRepository.save(existingSector);
        return true;
    }

    async deleteSector(id: number): Promise<boolean> {
        const existingSector = await this.sectorRepository.findOne({ where: { id } });
        if (!existingSector) return false;
        await this.sectorRepository.remove(existingSector);
        return true;
    }

    async getAllSectores(): Promise<Sector[]> {
        const sectores = await this.sectorRepository.find({ relations: ["localidades"] });
        return sectores.map(this.toDomain);
    }

    async getSectorById(id: number): Promise<Sector | null> {
        const sector = await this.sectorRepository.findOne({ where: { id }, relations: ["localidades"] });
        return sector ? this.toDomain(sector) : null;
    }
}