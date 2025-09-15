import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}