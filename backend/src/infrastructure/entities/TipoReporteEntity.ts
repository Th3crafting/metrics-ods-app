import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { ReporteEntity } from "./ReporteEntity";

@Entity("tipos_reportes")
export class TipoReporteEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "character varying" })
  nombre!: string;

  @Column({ type: "character varying", nullable: true })
  descripcion!: string;

  @OneToMany(() => ReporteEntity, (reporte) => reporte.tipoReporte)
  reportes!: ReporteEntity[];
}