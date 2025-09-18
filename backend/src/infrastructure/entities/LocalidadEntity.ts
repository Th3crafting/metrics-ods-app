import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";

import { SectorEntity } from "./SectorEntity";
import { UsuarioEntity } from "./UsuarioEntity";

@Entity("localidades")
export class LocalidadEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @ManyToOne(() => SectorEntity, (sector) => sector.localidades, { eager: true })
  @JoinColumn({ name: "sector_id" })
  sector!: SectorEntity;

  @OneToMany(() => UsuarioEntity, (usuario) => usuario.localidad)
  usuarios!: UsuarioEntity[];
}
