import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ReporteEntity } from "./ReporteEntity";

@Entity("tipos_reportes")
export class TipoReporteEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @OneToMany(() => ReporteEntity, (reporte) => reporte.tipo)
  reportes!: ReporteEntity[];
}
