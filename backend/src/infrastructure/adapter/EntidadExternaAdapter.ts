import { Repository } from "typeorm";

import { EntidadExterna } from "../../domain/entidadExterna/EntidadExterna";
import { EntidadExternaPort } from "../../domain/entidadExterna/EntidadExternaPort";
import { EntidadExternaEntity } from "../entities/EntidadExternaEntity";
import { AppDataSource } from "../config/con_data_base";

export class EntidadExternaAdapter implements EntidadExternaPort {
    private entidadRepository: Repository<EntidadExternaEntity>;

    constructor() {
        this.entidadRepository = AppDataSource.getRepository(EntidadExternaEntity);
    }

    private toDomain(e: EntidadExternaEntity): EntidadExterna {
        return {
            id: e.id,
            nombre: e.nombre,
            contacto: e.contacto,
            telefono: e.telefono
        };
    }

    private toEntity(e: Omit<EntidadExterna, "id">): EntidadExternaEntity {
        const entidadEntity = new EntidadExternaEntity();
        entidadEntity.nombre = e.nombre;
        entidadEntity.contacto = e.contacto;
        return entidadEntity;
    }

    async createEntidadExterna(e: Omit<EntidadExterna, "id">): Promise<number> {
        const newEntidad = this.toEntity(e);
        const savedEntidad = await this.entidadRepository.save(newEntidad);
        return savedEntidad.id;
    }

    async updateEntidadExterna(id: number, e: Partial<EntidadExterna>): Promise<boolean> {
        const existing = await this.entidadRepository.findOne({ where: { id } });
        if (!existing) return false;
        Object.assign(existing, e);
        await this.entidadRepository.save(existing);
        return true;
    }

    async deleteEntidadExterna(id: number): Promise<boolean> {
        const existing = await this.entidadRepository.findOne({ where: { id } });
        if (!existing) return false;
        await this.entidadRepository.remove(existing);
        return true;
    }

    async getAllEntidadesExternas(): Promise<EntidadExterna[]> {
        const entidades = await this.entidadRepository.find();
        return entidades.map(this.toDomain);
    }

    async getEntidadExternaById(id: number): Promise<EntidadExterna | null> {
        const entidad = await this.entidadRepository.findOne({ where: { id } });
        return entidad ? this.toDomain(entidad) : null;
    }
}