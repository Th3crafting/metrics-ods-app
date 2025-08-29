import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TipoReporteEntity } from './TipoReporteEntity';
import { UsuarioEntity } from './UsuarioEntity';

@Entity({name: "reporte"})
export class ReporteEntity {

    @PrimaryGeneratedColumn()
    rep_id!: number;

    @ManyToOne(() => TipoReporteEntity, (t) => t.reportes, {nullable:false})
    @JoinColumn({name:"tip_id"})
    tipo!: TipoReporteEntity;

    @Column({type:"character varying", length:255})
    rep_descripcion!: string;

    @Column({type:"character varying", length:255})
    rep_url_imagen!: string;

    @Column({type:"int"})
    rep_nivel_incidencia!: number;

    @ManyToOne(() => UsuarioEntity, (u) => u.reportes, {nullable:false})
    @JoinColumn({name:"usu_id"})
    usuario!: UsuarioEntity;

    @CreateDateColumn({type:"timestamptz", name:"rep_created_at", default: () => "now()"})
    rep_created_at!: Date;

    @UpdateDateColumn({type:"timestamptz", name:"rep_updated_at", default: () => "now()"})
    rep_updated_at!: Date;

    @Column({type:"date", name:"rep_fecha", default: () => "now()"})
    rep_fecha!: string;
}