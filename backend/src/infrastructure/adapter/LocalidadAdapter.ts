import { ILike, Repository } from "typeorm";

import { Localidad } from "../../domain/localidad/Localidad";
import { LocalidadPort, LocalidadListDTO } from "../../domain/localidad/LocalidadPort";
import { LocalidadEntity } from "../entities/LocalidadEntity";
import { AppDataSource } from "../config/con_data_base";

export class LocalidadAdapter implements LocalidadPort {
    private localidadRepository: Repository<LocalidadEntity>;

    constructor() {
        this.localidadRepository = AppDataSource.getRepository(LocalidadEntity);
    }

    private toDomain(localidad: LocalidadEntity): Localidad {
        return { id: localidad.id, nombre: localidad.nombre };
    }

    private toEntity(localidad: Omit<Localidad, "id">): LocalidadEntity {
        const localidadEntity = new LocalidadEntity();
        localidadEntity.nombre = localidad.nombre;
        return localidadEntity;
    }

    async createLocalidad(localidad: Omit<Localidad, "id">): Promise<number> {
        const newLocalidad = this.toEntity(localidad);
        const savedLocalidad = await this.localidadRepository.save(newLocalidad);
        return savedLocalidad.id;
    }

    async updateLocalidad(id: number, localidad: Partial<Localidad>): Promise<boolean> {
        const existingLocalidad = await this.localidadRepository.findOne({ where: { id } });
        if (!existingLocalidad) return false;
        Object.assign(existingLocalidad, localidad);
        await this.localidadRepository.save(existingLocalidad);
        return true;
    }

    async deleteLocalidad(id: number): Promise<boolean> {
        const existingLocalidad = await this.localidadRepository.findOne({ where: { id } });
        if (!existingLocalidad) return false;
        await this.localidadRepository.remove(existingLocalidad);
        return true;
    }

    async getAllLocalidades(): Promise<Localidad[]> {
        const localidades = await this.localidadRepository.find();
        return localidades.map(this.toDomain);
    }

    async getLocalidadById(id: number): Promise<Localidad | null> {
        const localidades =   await this.localidadRepository.findOne({ where: { id }, relations: ["usuarios", "sector"] });
        return localidades ? this.toDomain(localidades) : null;
    }

    async getAllLocalidadesWithSector(): Promise<LocalidadListDTO[]> {
        const localidades = await this.localidadRepository.find({
            relations: ["sector"],
        });

        return localidades.map((l) => ({
            id: l.id,
            nombre: l.nombre,
            sectorId: l.sector?.id ?? 0,
            sectorNombre: l.sector?.nombre ?? "",
        }));
    }

    async findByName(nombre: string): Promise<Localidad | null> {
        const localidad = await this.localidadRepository.findOne({ where: { nombre: ILike(nombre.trim()) }, });
        return localidad ? this.toDomain(localidad) : null;
    }
}