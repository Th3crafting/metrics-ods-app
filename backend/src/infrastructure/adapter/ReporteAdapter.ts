import { Repository } from "typeorm";

import { Reporte } from "../../domain/reporte/Reporte";
import { ReportePort } from "../../domain/reporte/ReportePort";
import { ReporteEntity } from "../entities/ReporteEntity";
import { AppDataSource } from "../config/con_data_base";

export class ReporteAdapter implements ReportePort {
    private reporteRepository: Repository<ReporteEntity>;

    constructor() {
        this.reporteRepository = AppDataSource.getRepository(ReporteEntity);
    }

    private toDomain(reporte: ReporteEntity): Reporte {
        return {
            id: reporte.id,
            titulo:reporte.titulo,
            descripcion: reporte.descripcion,
            direccion: reporte.direccion,
            latitud:reporte.latitud,
            longitud: reporte.longitud,
            fecha: reporte.fecha,
            estado:reporte.estado,
            usuarioId: reporte.usuario.id,
            tipoReporteId: reporte.tipoReporte.id,
            sectorId: reporte.sector.id,
            EntidadExternaid: reporte.entidadExterna.id
        };
    }

    private toEntity(reporte: Omit<Reporte, "id">): ReporteEntity {
        const reporteEntity = new ReporteEntity();
        reporteEntity.descripcion = reporte.descripcion;
        reporteEntity.direccion = reporte.direccion;
        reporteEntity.latitud = reporte.latitud;
        reporteEntity.longitud = reporte.longitud;
        reporteEntity.fecha = reporte.fecha;
        return reporteEntity;
    }

    async createReporte(reporte: Omit<Reporte, "id">): Promise<number> {
        const newReporte = this.toEntity(reporte);
        const savedReporte = await this.reporteRepository.save(newReporte);
        return savedReporte.id;
    }

    async updateReporte(id: number, reporte: Partial<Reporte>): Promise<boolean> {
        const existingReporte = await this.reporteRepository.findOne({ where: { id } });
        if (!existingReporte) return false;
        Object.assign(existingReporte, reporte);
        await this.reporteRepository.save(existingReporte);
        return true;
    }

    async deleteReporte(id: number): Promise<boolean> {
        const existingReporte = await this.reporteRepository.findOne({ where: { id } });
        if (!existingReporte) return false;
        await this.reporteRepository.remove(existingReporte);
        return true;
    }

    async getAllReportes(): Promise<Reporte[]> {
        const reportes = await this.reporteRepository.find({ relations: ["usuario", "tipoReporte", "sector"] });
        return reportes.map(this.toDomain);
    }

    async getReporteById(id: number): Promise<Reporte | null> {
        const reporte = await this.reporteRepository.findOne({ where: { id }, relations: ["usuario", "tipoReporte", "sector"] });
        return reporte ? this.toDomain(reporte) : null;
    }

   
    async getReportesByUsuario(usuarioId: number): Promise<Reporte[]> {
        const reportes = await this.reporteRepository.find({
            where: { usuario: { id: usuarioId } },
            relations: ["usuario", "tipoReporte", "sector"],
        });
        return reportes.map((reporte) => ({
            id: reporte.id,
            titulo: reporte.titulo,

            descripcion: reporte.descripcion,
            direccion: reporte.direccion,
            latitud: reporte.latitud,
            longitud: reporte.longitud,
            fecha: reporte.fecha,
            estado: reporte.estado,
            usuarioId: reporte.usuario.id,
            tipoReporteId: reporte.tipoReporte.id,
            sectorId: reporte.sector.id,
            EntidadExternaid: reporte.entidadExterna.id,
        }));
    }
}