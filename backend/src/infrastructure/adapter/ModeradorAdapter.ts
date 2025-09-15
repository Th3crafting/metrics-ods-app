import { Repository } from "typeorm";

import { Moderador } from "../../domain/moderador/Moderador";
import { ModeradorPort } from "../../domain/moderador/ModeradorPort";
import { ModeradorEntity } from "../entities/ModeradorEntity";
import { AppDataSource } from "../config/con_data_base";

export class ModeradorAdapter implements ModeradorPort {
    private moderadorRepository: Repository<ModeradorEntity>;

    constructor() {
        this.moderadorRepository = AppDataSource.getRepository(ModeradorEntity);
    }

    private toDomain(m: ModeradorEntity): Moderador {
        return {
            id: m.id,
            nombre: m.nombre,
            email: m.email,
            password: m.password
        };
    }

    private toEntity(m: Omit<Moderador, "id">): ModeradorEntity {
        const moderadorEntity = new ModeradorEntity();
        moderadorEntity.nombre = m.nombre;
        moderadorEntity.email = m.email;
        moderadorEntity.password = m.password;
        return moderadorEntity;
    }

    async createModerador(m: Omit<Moderador, "id">): Promise<number> {
        const newModerador = this.toEntity(m);
        const savedModerador = await this.moderadorRepository.save(newModerador);
        return savedModerador.id;
    }

    async updateModerador(id: number, m: Partial<Moderador>): Promise<boolean> {
        const existing = await this.moderadorRepository.findOne({ where: { id } });
        if (!existing) return false;
        Object.assign(existing, m);
        await this.moderadorRepository.save(existing);
        return true;
    }

    async deleteModerador(id: number): Promise<boolean> {
        const existing = await this.moderadorRepository.findOne({ where: { id } });
        if (!existing) return false;
        await this.moderadorRepository.remove(existing);
        return true;
    }

    async getAllModeradores(): Promise<Moderador[]> {
        const moderadores = await this.moderadorRepository.find();
        return moderadores.map(this.toDomain);
    }

    async getModeradorById(id: number): Promise<Moderador | null> {
        const moderador = await this.moderadorRepository.findOne({ where: { id } });
        return moderador ? this.toDomain(moderador) : null;
    }

    async getModeradorByEmail(email: string): Promise<Moderador | null> {
        const moderador = await this.moderadorRepository.findOne({ where: { email } });
        return moderador ? this.toDomain(moderador) : null;
    }
}