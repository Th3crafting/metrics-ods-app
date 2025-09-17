import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { ReporteEntity } from "./ReporteEntity";

@Entity("entidades_externas")
export class EntidadExternaEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    id!: number;

    @Column({ type: "character varying" })
    nombre!: string;

    @Column({ type: "character varying", nullable: true })
    contacto!: string;

    @Column({ type: "character varying", nullable: true })
    telefono!: string;

    @OneToMany(() => ReporteEntity, reporte => reporte.entidadExterna)
    reportes!: ReporteEntity[];
}