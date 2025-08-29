import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ReporteEntity } from "./ReporteEntity";

@Entity({name: "tipo_reporte"})
export class TipoReporteEntity {

    @PrimaryGeneratedColumn()
    tip_id!:number;

    @Column({type: "character varying", length: 100})
    tip_descripcion!:string;

    @OneToMany(() => ReporteEntity, (r) => r.tipo)
    reportes!:ReporteEntity[];
}