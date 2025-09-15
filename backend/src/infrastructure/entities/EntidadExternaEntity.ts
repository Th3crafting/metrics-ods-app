import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { ReporteEntity } from "./ReporteEntity";

@Entity("entidades_externas")
export class EntidadExternaEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nombre!: string;

    @Column({ nullable: true })
    contacto!: string;

    @Column({ nullable: true })
    telefono!: string;

    @OneToMany(() => ReporteEntity, reporte => reporte.entidadExterna)
    reportes!: ReporteEntity[];
}