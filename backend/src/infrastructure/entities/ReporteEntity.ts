import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { UsuarioEntity } from "./UsuarioEntity";
import { TipoReporteEntity } from "./TipoReporteEntity";
import { SectorEntity } from "./SectorEntity";

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

  @Column({ default: "pendiente" }) 
  estado!: string;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.reportes, { eager: true })
  usuario!: UsuarioEntity;

  @ManyToOne(() => TipoReporteEntity, (tipoReporte) => tipoReporte.reportes, { eager: true })
  tipoReporte!: TipoReporteEntity;

  @ManyToOne(() => SectorEntity, (sector) => sector.reportes, { eager: true })
  sector!: SectorEntity;
}
