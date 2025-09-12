import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ReporteEntity } from "./ReporteEntity";

@Entity("tipos_reportes")
export class TipoReporteEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

   @Column()
  Descripcion!: string;


  @OneToMany(() => ReporteEntity, (reporte) => reporte.tipoReporte)
  reportes!: ReporteEntity[];
}
