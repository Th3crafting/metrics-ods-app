import { Repository } from "typeorm";

import { TipoReporte } from "../../domain/tipoReporte/TipoReporte";
import { TipoReportePort } from "../../domain/tipoReporte/TipoReportePort";
import { TipoReporteEntity } from "../entities/TipoReporteEntity";
import { AppDataSource } from "../config/con_data_base";

export class TipoReporteAdapter implements TipoReportePort {
    private tipoReporteRepository: Repository<TipoReporteEntity>;

    constructor() {
        this.tipoReporteRepository = AppDataSource.getRepository(TipoReporteEntity);
    }

    private toDomain(tipo: TipoReporteEntity): TipoReporte {
        return {
            id: tipo.id,
            nombre: tipo.nombre,
            descripcion: tipo.nombre
        };
    }

    private toEntity(tipo: Omit<TipoReporte, "id">): TipoReporteEntity {
        const tipoEntity = new TipoReporteEntity();
        tipoEntity.nombre = tipo.nombre;
        tipoEntity.descripcion = tipo.descripcion;
        return tipoEntity;
    }

    async createTipoReporte(tipo: Omit<TipoReporte, "id">): Promise<number> {
        const newTipo = this.toEntity(tipo);
        const savedTipo = await this.tipoReporteRepository.save(newTipo);
        return savedTipo.id;
    }

    async updateTipoReporte(id: number, tipo: Partial<TipoReporte>): Promise<boolean> {
        const existingTipo = await this.tipoReporteRepository.findOne({ where: { id } });
        if (!existingTipo) return false;
        Object.assign(existingTipo, tipo);
        await this.tipoReporteRepository.save(existingTipo);
        return true;
    }

    async deleteTipoReporte(id: number): Promise<boolean> {
        const existingTipo = await this.tipoReporteRepository.findOne({ where: { id } });
        if (!existingTipo) return false;
        await this.tipoReporteRepository.remove(existingTipo);
        return true;
    }

    async getAllTiposReporte(): Promise<TipoReporte[]> {
        const tipos = await this.tipoReporteRepository.find();
        return tipos.map(this.toDomain);
    }

    async getTipoReporteById(id: number): Promise<TipoReporte | null> {
        const tipo = await this.tipoReporteRepository.findOne({ where: { id } });
        return tipo ? this.toDomain(tipo) : null;
    }
}