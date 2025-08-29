import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SectorEntity } from "./SectorEntity";


@Entity({name:"localidad"})
export class LocalidadEntity {

    @PrimaryGeneratedColumn()
    loc_id!: number;

    @Column({type:"character varying", length:30})
    loc_descripcion!: string;

    @OneToMany(() => SectorEntity, (s) => s.localidad)
    sectores!: SectorEntity[];
}