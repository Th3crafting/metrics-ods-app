import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { ReporteEntity } from './ReporteEntity';

@Entity("estados")
export class EstadoEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @OneToMany(() => ReporteEntity, (reporte) => reporte.estado)
reportes!: ReporteEntity[];

}
