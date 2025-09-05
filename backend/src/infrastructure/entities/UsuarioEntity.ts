import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ReporteEntity } from "./ReporteEntity";

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
}
