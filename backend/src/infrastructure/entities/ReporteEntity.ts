import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

import { UsuarioEntity } from "./UsuarioEntity";
import { TipoReporteEntity } from "./TipoReporteEntity";
import { SectorEntity } from "./SectorEntity";
import { EntidadExternaEntity } from "./EntidadExternaEntity";
import { EstadoEntity } from "./EstadosEntity";
import { NivelIncidenciaEntity } from "./NivelIncidenciaEntity";

@Entity("reportes")
export class ReporteEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  titulo!: string;

  @Column({ type: "text" })
  descripcion!: string;

  @Column({ nullable: true })
  direccion!: string;

  @Column("decimal", { precision: 10, scale: 6, nullable: true })
  latitud!: number;

  @Column("decimal", { precision: 10, scale: 6, nullable: true })
  longitud!: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  fecha!: Date;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.reportes, { eager: true })
  @JoinColumn({ name: "usuarioId" })
  usuario!: UsuarioEntity;

  @ManyToOne(() => TipoReporteEntity, (tipoReporte) => tipoReporte.reportes, { eager: true })
  @JoinColumn({ name: "tipoReporteId" })
  tipoReporte!: TipoReporteEntity;

  @ManyToOne(() => SectorEntity, (sector) => sector.reportes, { eager: true })
  @JoinColumn({ name: "sectorId" })
  sector!: SectorEntity;

  @ManyToOne(() => EntidadExternaEntity, entidad => entidad.reportes, { nullable: true })
  @JoinColumn({ name: "entidad_externa_id" })
  entidadExterna!: EntidadExternaEntity ;

  @ManyToOne(() => EstadoEntity, { nullable: true })
  @JoinColumn({ name: "estadoId" })
  estado!: EstadoEntity;

  @ManyToOne(() => NivelIncidenciaEntity, (nivel) => nivel.reportes)
  @JoinColumn({ name: "nivelIncidenciaId" })
  nivelIncidencia!: NivelIncidenciaEntity;
}
