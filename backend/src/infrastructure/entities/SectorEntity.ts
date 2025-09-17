import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";

import { ReporteEntity } from "./ReporteEntity";
import { LocalidadEntity } from "./LocalidadEntity";

@Entity("sectores")
export class SectorEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "character varying" })
  nombre!: string;

  @ManyToOne(() => LocalidadEntity, (localidad) => localidad.sectores)
  localidad!: LocalidadEntity;

  @OneToMany(() => ReporteEntity, (reporte) => reporte.sector)
  reportes!: ReporteEntity[];
}
