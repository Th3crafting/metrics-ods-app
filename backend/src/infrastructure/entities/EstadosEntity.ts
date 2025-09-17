import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { ReporteEntity } from './ReporteEntity';

@Entity("estados")
export class EstadoEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "character varying" })
  nombre!: string;

  @OneToMany(() => ReporteEntity, (reporte) => reporte.estado)
reportes!: ReporteEntity[];

}
