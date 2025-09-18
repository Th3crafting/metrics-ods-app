import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";

import { SectorEntity } from "./SectorEntity";

@Entity("moderadores")
export class ModeradorEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nombre!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @ManyToMany(() => SectorEntity, (sector) => sector.moderadores, {
        cascade: false,
        eager: false,
    })
    @JoinTable({
        name: "moderador_sector",
        joinColumn: { name: "moderador_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "sector_id", referencedColumnName: "id" },
    })
    sectores!: SectorEntity[];

    @Column({ default: false })
    isAdmin!: boolean;
}