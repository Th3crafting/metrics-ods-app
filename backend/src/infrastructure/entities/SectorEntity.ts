import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from "typeorm";

import { ReporteEntity } from "./ReporteEntity";
import { LocalidadEntity } from "./LocalidadEntity";
import { ModeradorEntity } from "./ModeradorEntity";

@Entity("sectores")
export class SectorEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "character varying", name: "nombre"})
  nombre!: string;

  @OneToMany(() => LocalidadEntity, (localidad) => localidad.sector)
  localidades!: LocalidadEntity[];

  @OneToMany(() => ReporteEntity, (reporte) => reporte.sector)
  reportes!: ReporteEntity[];

  @ManyToMany(() => ModeradorEntity, (moderador) => moderador.sectores)
  moderadores!: ModeradorEntity[];
}
