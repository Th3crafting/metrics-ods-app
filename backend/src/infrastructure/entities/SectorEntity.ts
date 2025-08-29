import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LocalidadEntity } from "./LocalidadEntity";
import { UsuarioEntity } from "./UsuarioEntity";


@Entity({name:"sector"})
export class SectorEntity {
    
    @PrimaryGeneratedColumn()
    sec_id!: number;

    @ManyToOne(() => LocalidadEntity, (l) => l.sectores, {nullable:false})
    @JoinColumn({name:"loc_id"})
    localidad!: LocalidadEntity;

    @Column({type:"character varying", length:255})
    sec_direccion!: string;

    @OneToMany(() => UsuarioEntity, (u) => u.sector)
    usuarios!: UsuarioEntity[];
}