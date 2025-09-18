import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

import { UsuarioEntity } from "./UsuarioEntity";
import { TipoReporteEntity } from "./TipoReporteEntity";
import { SectorEntity } from "./SectorEntity";
import { EntidadExternaEntity } from "./EntidadExternaEntity";
import { EstadoEntity } from "./EstadosEntity";
import { NivelIncidenciaEntity } from "./NivelIncidenciaEntity";

@Entity("reportes")
export class ReporteEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "character varying", length: 100 })
  titulo!: string;

  @Column({ type: "text", nullable: true })
  descripcion!: string | null;

  @Column({ type: "character varying", nullable: true })
  direccion!: string | null;

  @Column({ type: "timestamp", default: () => "now()" })
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
  
  @ManyToOne(() => EstadoEntity, { nullable: true })
  @JoinColumn({ name: "estadoId" })
  estado!: EstadoEntity;
  
  @ManyToOne(() => NivelIncidenciaEntity, (nivel) => nivel.reportes)
  @JoinColumn({ name: "nivelIncidenciaId" })
  nivelIncidencia!: NivelIncidenciaEntity;

  @ManyToOne(() => EntidadExternaEntity, entidad => entidad.reportes, { nullable: true })
  @JoinColumn({ name: "entidad_externa_id" })
  entidadExterna!: EntidadExternaEntity | null;
}
