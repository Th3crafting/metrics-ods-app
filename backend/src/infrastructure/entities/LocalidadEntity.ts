import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { SectorEntity } from "./SectorEntity";
import { UsuarioEntity } from "./UsuarioEntity";

@Entity("localidades")
export class LocalidadEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @OneToMany(() => SectorEntity, (sector) => sector.localidad)
  sectores!: SectorEntity[];

   @OneToMany(() => UsuarioEntity, (usuario) => usuario.localidad)
  usuarios!: UsuarioEntity[];
}
