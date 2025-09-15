import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";

import { ReporteEntity } from "./ReporteEntity";
import { LocalidadEntity } from "./LocalidadEntity";

@Entity("usuarios")
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => ReporteEntity, (reporte) => reporte.usuario)
  reportes!: ReporteEntity[];

  @Column()
  direccion!: string;

  @ManyToOne(() => LocalidadEntity, (localidad) => localidad.usuarios, { eager: true })
  @JoinColumn({ name: "localidad_id" })
  localidad!: LocalidadEntity;
}
