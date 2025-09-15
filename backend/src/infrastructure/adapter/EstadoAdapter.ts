import { Repository } from "typeorm";
import { Estados } from "../../domain/estados/Estados";
import { EstadosPort } from "../../domain/estados/EstadosPort";
import { EstadoEntity } from "../entities/EstadosEntity";
import { AppDataSource } from "../config/con_data_base";

export class EstadoAdapter implements EstadosPort {
  private estadoRepository: Repository<EstadoEntity>;

  constructor() {
    this.estadoRepository = AppDataSource.getRepository(EstadoEntity);
  }

  private toDomain(estado: EstadoEntity): Estados {
    return { id: estado.id, nombre: estado.nombre };
  }

  private toEntity(estado: Omit<Estados, "id">): EstadoEntity {
    const estadoEntity = new EstadoEntity();
    estadoEntity.nombre = estado.nombre;
    return estadoEntity;
  }

  async createEstado(estado: Omit<Estados, "id">): Promise<number> {
    const saved = await this.estadoRepository.save(this.toEntity(estado));
    return saved.id;
  }

  async updateEstado(id: number, estado: Partial<Estados>): Promise<boolean> {
    const existing = await this.estadoRepository.findOne({ where: { id } });
    if (!existing) return false;
    Object.assign(existing, estado);
    await this.estadoRepository.save(existing);
    return true;
  }

  async deleteEstado(id: number): Promise<boolean> {
    const existing = await this.estadoRepository.findOne({ where: { id } });
    if (!existing) return false;
    await this.estadoRepository.remove(existing);
    return true;
  }

  async getAllEstados(): Promise<Estados[]> {
    const estados = await this.estadoRepository.find();
    return estados.map(this.toDomain);
  }

  async getEstadoById(id: number): Promise<Estados | null> {
    const estado = await this.estadoRepository.findOne({ where: { id } });
    return estado ? this.toDomain(estado) : null;
  }

  
}