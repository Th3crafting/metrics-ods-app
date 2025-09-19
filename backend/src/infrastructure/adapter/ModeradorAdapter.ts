import { Repository, In } from "typeorm";

import { Moderador } from "../../domain/moderador/Moderador";
import { ModeradorPort } from "../../domain/moderador/ModeradorPort";
import { ModeradorEntity } from "../entities/ModeradorEntity";
import { AppDataSource } from "../config/con_data_base";
import { SectorEntity } from "../entities/SectorEntity";

export class ModeradorAdapter implements ModeradorPort {
    private moderadorRepository: Repository<ModeradorEntity>;
    private sectorRepository: Repository<SectorEntity>;

    constructor() {
        this.moderadorRepository = AppDataSource.getRepository(ModeradorEntity);
        this.sectorRepository = AppDataSource.getRepository(SectorEntity);
    }

    private toDomain(m: ModeradorEntity): Moderador {
        return {
            id: m.id,
            nombre: m.nombre,
            email: m.email,
            password: m.password,
            isAdmin: m.isAdmin,
        };
    }

    private toEntity(m: Omit<Moderador, "id">): ModeradorEntity {
        const moderadorEntity = new ModeradorEntity();
        moderadorEntity.nombre = m.nombre;
        moderadorEntity.email = m.email;
        moderadorEntity.password = m.password;
        moderadorEntity.isAdmin = m.isAdmin;
        return moderadorEntity;
    }

    async createModerador(m: Omit<Moderador, "id">): Promise<number> {
        const entity = this.moderadorRepository.create({
            nombre: m.nombre,
            email: m.email,
            password: m.password,
            isAdmin: false,
        });

        const savedModerador = await this.moderadorRepository.save(entity);
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

    async getSectoresIds(moderadorid: number): Promise<number[]> {
        const mod = await this.moderadorRepository.findOne({
            where: { id: moderadorid },
            relations: ["sectores"],
            select: { id: true, sectores: { id: true } as any },
        });
        if (!mod) return [];
        return (mod.sectores ?? []).map(s => Number(s.id));
    }

    async setSectores(moderadorId: number, sectorIds: number[]): Promise<boolean> {
        const mod = await this.moderadorRepository.findOne({
            where: { id: moderadorId },
            relations: ["sectores"],
        });
        if (!mod) return false;

        const cleanIds = Array.from(
            new Set(sectorIds.map(Number).filter(n => Number.isInteger(n) && n > 0))
        );

        const sectors = cleanIds.length
            ? await this.sectorRepository.findBy({ id: In(cleanIds) })
            : [];

        if (sectors.length !== cleanIds.length) {
            throw new Error("Uno o más sectores no existen");
        }

        mod.sectores = sectors;
        await this.moderadorRepository.save(mod);
        return true;
    }
}