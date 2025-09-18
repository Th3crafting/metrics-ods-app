import { Repository, ILike } from "typeorm";

import { NewReporte, Reporte } from "../../domain/reporte/Reporte";
import { ReportePort } from "../../domain/reporte/ReportePort";
import { ReporteEntity } from "../entities/ReporteEntity";
import { AppDataSource } from "../config/con_data_base";
import { UsuarioEntity } from "../entities/UsuarioEntity";
import { TipoReporteEntity } from "../entities/TipoReporteEntity";
import { SectorEntity } from "../entities/SectorEntity";
import { EstadoEntity } from '../entities/EstadosEntity';
import { NivelIncidenciaEntity } from "../entities/NivelIncidenciaEntity";
import { EntidadExternaEntity } from "../entities/EntidadExternaEntity";

export class ReporteAdapter implements ReportePort {
  private reporteRepository: Repository<ReporteEntity>;

  constructor() {
    this.reporteRepository = AppDataSource.getRepository(ReporteEntity);
  }

  private toDomain(reporte: ReporteEntity): Reporte {
    return {
      id: reporte.id,
      titulo: reporte.titulo,
      descripcion: reporte.descripcion,
      direccion: reporte.direccion,
      fecha: reporte.fecha,
      usuarioId: reporte.usuario?.id,
      tipoReporteId: reporte.tipoReporte?.id,
      sectorId: reporte.sector?.id,
      entidadExternaId: reporte.entidadExterna?.id,
      estadoId: reporte.estado?.id,
      nivelIncidenciaId: reporte.nivelIncidencia?.id,
    };
  }

  private toEntity(reporte: Omit<Reporte, "id">): ReporteEntity {
    const reporteEntity = new ReporteEntity();
    reporteEntity.titulo = reporte.titulo;
    reporteEntity.descripcion = reporte.descripcion ?? null;
    reporteEntity.direccion = reporte.direccion ?? null;
    reporteEntity.usuario = { id: reporte.usuarioId } as UsuarioEntity;
    reporteEntity.tipoReporte = { id: reporte.tipoReporteId } as TipoReporteEntity;
    reporteEntity.sector = { id: reporte.sectorId } as SectorEntity;
    reporteEntity.estado = { id: reporte.estadoId } as EstadoEntity;
    reporteEntity.nivelIncidencia = { id: reporte.nivelIncidenciaId } as NivelIncidenciaEntity;
    if (reporte.entidadExternaId) reporteEntity.entidadExterna = { id: reporte.entidadExternaId } as any | null;
    return reporteEntity;
  }

  async existsUsuario(id: number): Promise<boolean> {
    return AppDataSource.getRepository(UsuarioEntity).exists({ where: { id } });
  }

  async existsTipoReporte(id: number): Promise<boolean> {
    return AppDataSource.getRepository(TipoReporteEntity).exists({ where: { id } });
  }

  async existsSector(id: number): Promise<boolean> {
    return AppDataSource.getRepository(SectorEntity).exists({ where: { id } });
  }

  async existsNivelIncidencia(id: number): Promise<boolean> {
    return AppDataSource.getRepository(NivelIncidenciaEntity).exists({ where: { id } });
  }

  async existsEntidadExterna(id: number): Promise<boolean> {
    return AppDataSource.getRepository(EntidadExternaEntity).exists({ where: { id } });
  }

  async getEstadoAbierto(): Promise<number> {
    const repo = AppDataSource.getRepository(EstadoEntity);
    const estado = await repo.findOne({ where: { nombre: ILike("Abierto") } });
    if (!estado) throw new Error('No se encontró el estado "Abierto".');
    return estado.id;
  }

  async createReporte(input: NewReporte, estadoId: number): Promise<Reporte> {
    const entity = this.reporteRepository.create({
      titulo: input.titulo,
      descripcion: input.descripcion ?? null,
      direccion: input.direccion ?? null,
      usuario: { id: input.usuarioId } as UsuarioEntity,
      tipoReporte: { id: input.tipoReporteId } as TipoReporteEntity,
      sector: { id: input.sectorId } as SectorEntity,
      estado: { id: estadoId } as EstadoEntity,
      nivelIncidencia: { id: input.nivelIncidenciaId } as NivelIncidenciaEntity,
      entidadExterna: null,
    });

    const saved = await this.reporteRepository.save(entity);

    const reloaded = await this.reporteRepository.findOne({
      where: { id: saved.id },
      relations: ["usuario", "tipoReporte", "sector", "entidadExterna", "estado", "nivelIncidencia"],
    });
    if (!reloaded) throw new Error("No se pudo recargar el reporte creado.");

    return this.toDomain(reloaded);
  }

  async updateReporte(id: number, reporte: Partial<Reporte>): Promise<boolean> {
    const repo = this.reporteRepository;

    const existing = await repo.findOne({
      where: { id },
      relations: ["entidadExterna", "estado"],
    });
    if (!existing) return false;

    if (reporte.estadoId !== undefined) {
      existing.estado = { id: reporte.estadoId } as EstadoEntity;
    }

    if (reporte.entidadExternaId === null) {
      existing.entidadExterna = null;
    } else if (typeof reporte.entidadExternaId === "number") {
      existing.entidadExterna = { id: reporte.entidadExternaId } as EntidadExternaEntity;
    }

    await repo.save(existing);
    return true;
  }

  async deleteReporte(id: number): Promise<boolean> {
    const existingReporte = await this.reporteRepository.findOne({ where: { id } });
    if (!existingReporte) return false;
    await this.reporteRepository.remove(existingReporte);
    return true;
  }

  async getAllReportes(): Promise<Reporte[]> {
    const reportes = await this.reporteRepository.find({
      relations: ["usuario", "tipoReporte", "sector", "entidadExterna", "estado", "nivelIncidencia"],
    });
    return reportes.map((r) => this.toDomain(r));
  }

  async getReporteById(id: number): Promise<Reporte | null> {
    const reporte = await this.reporteRepository.findOne({
      where: { id },
      relations: ["usuario", "tipoReporte", "sector", "entidadExterna", "estado", "nivelIncidencia"],
    });
    return reporte ? this.toDomain(reporte) : null;
  }

  async getReportesByUsuario(usuarioId: number): Promise<Reporte[]> {
    const reportes = await this.reporteRepository.find({
      where: { usuario: { id: usuarioId } },
      relations: ["usuario", "tipoReporte", "sector", "entidadExterna", "estado", "nivelIncidencia"],
    });
    return reportes.map((r) => this.toDomain(r));
  }
}