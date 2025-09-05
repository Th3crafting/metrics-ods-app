import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { SectorEntity } from "./SectorEntity";

@Entity("localidades")
export class LocalidadEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @OneToMany(() => SectorEntity, (sector) => sector.localidad)
  sectores!: SectorEntity[];
}
