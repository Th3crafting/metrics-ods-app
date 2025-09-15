import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { ReporteEntity } from './ReporteEntity';

@Entity("nivel_incidencia")
export class NivelIncidenciaEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nivel!: number;

  @Column()
  descripcion!: string;

  @OneToMany(() => ReporteEntity, (reporte) => reporte.nivelIncidencia)
  reportes!: ReporteEntity[];
}