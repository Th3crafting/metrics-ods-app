import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { UsuarioEntity } from "./UsuarioEntity";
import { TipoReporteEntity } from "./TipoReporteEntity";
import { SectorEntity } from "./SectorEntity";

@Entity("reportes")
export class ReporteEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  descripcion!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  fecha!: Date;

  @Column({ nullable: true })
  direccion!: string;

  @Column("decimal", { precision: 10, scale: 6, nullable: true })
  lat!: number;

  @Column("decimal", { precision: 10, scale: 6, nullable: true })
  lng!: number;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.reportes)
  usuario!: UsuarioEntity;

  @ManyToOne(() => TipoReporteEntity, (tipo) => tipo.reportes)
  tipo!: TipoReporteEntity;

  @ManyToOne(() => SectorEntity, (sector) => sector.reportes)
  sector!: SectorEntity;
}
