import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { ReporteEntity } from './ReporteEntity';

@Entity("nivel_incidencia")
export class NivelIncidenciaEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "int" })
  nivel!: number;

  @Column({ type: "character varying", nullable: true })
  descripcion!: string;

  @OneToMany(() => ReporteEntity, (reporte) => reporte.nivelIncidencia)
  reportes!: ReporteEntity[];
}