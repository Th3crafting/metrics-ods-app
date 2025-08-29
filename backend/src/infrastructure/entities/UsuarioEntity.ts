import { Check, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SectorEntity } from "./SectorEntity";
import { ReporteEntity } from "./ReporteEntity";

@Check("chk_usuario_status", "usu_status IN ('active','inactive','deleted')")
@Check("chk_usuario_correo_format", "usu_correo ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$'")
@Entity({name:"usuario"})
export class UsuarioEntity {

    @PrimaryGeneratedColumn()
    usu_id!: number;

    @Column({type:"character varying", length:50})
    usu_nombre!: string;

    @Column({type:"character varying", length:50})
    usu_apellido!: string;

    @ManyToOne(() => SectorEntity, (s) => s.usuarios, {nullable:false})
    @JoinColumn({name:"sec_id"})
    sector!: SectorEntity;

    @Index("uq_usuario_correo", {unique:true})
    @Column({type:"character varying", length:80})
    usu_correo!: string;

    @Column({type:"character varying", length:20, default: () => "'active'"})
    usu_status!: string;

    @OneToMany(() => ReporteEntity, (r) => r.usuario)
    reportes!: ReporteEntity[];
}