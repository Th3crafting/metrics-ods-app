import { Repository } from "typeorm";

import { NivelIncidencia } from "../../domain/nivelIncidencia/NivelIncidencia";
import { NivelIncidenciaPort } from "../../domain/nivelIncidencia/NivelIncidenciaPort";
import { NivelIncidenciaEntity } from "../entities/NivelIncidenciaEntity";
import { AppDataSource } from "../config/con_data_base";

export class NivelIncidenciaAdapter implements NivelIncidenciaPort {
  private nivelRepository: Repository<NivelIncidenciaEntity>;

  constructor() {
    this.nivelRepository = AppDataSource.getRepository(NivelIncidenciaEntity);
  }

  private toDomain(nivel: NivelIncidenciaEntity): NivelIncidencia {
    return { id: nivel.id, nivel: nivel.nivel, descripcion: nivel.descripcion  };
  }

  private toEntity(nivel: Omit<NivelIncidencia, "id">): NivelIncidenciaEntity {
    const nivelEntity = new NivelIncidenciaEntity();
    nivelEntity.nivel = nivel.nivel;
    return nivelEntity;
  }

  async createNivelIncidencia(nivel: Omit<NivelIncidencia, "id">): Promise<number> {
    const saved = await this.nivelRepository.save(this.toEntity(nivel));
    return saved.id;
  }

  async updateNivelIncidencia(id: number, nivel: Partial<NivelIncidencia>): Promise<boolean> {
    const existing = await this.nivelRepository.findOne({ where: { id } });
    if (!existing) return false;
    Object.assign(existing, nivel);
    await this.nivelRepository.save(existing);
    return true;
  }

  async deleteNivelIncidencia(id: number): Promise<boolean> {
    const existing = await this.nivelRepository.findOne({ where: { id } });
    if (!existing) return false;
    await this.nivelRepository.remove(existing);
    return true;
  }

  async getAllNivelesIncidencia(): Promise<NivelIncidencia[]> {
    const niveles = await this.nivelRepository.find();
    return niveles.map(this.toDomain);
  }

  async getNivelIncidenciaById(id: number): Promise<NivelIncidencia | null> {
    const nivel = await this.nivelRepository.findOne({ where: { id } });
    return nivel ? this.toDomain(nivel) : null;
  }
}