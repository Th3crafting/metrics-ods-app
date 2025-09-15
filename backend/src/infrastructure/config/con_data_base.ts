import { DataSource } from 'typeorm';

import envs from "./environment-vars";

import { EntidadExternaEntity } from '../entities/EntidadExternaEntity';
import { LocalidadEntity } from '../entities/LocalidadEntity';
import { ModeradorEntity } from '../entities/ModeradorEntity';
import { ReporteEntity } from '../entities/ReporteEntity';
import { SectorEntity } from '../entities/SectorEntity';
import { TipoReporteEntity } from '../entities/TipoReporteEntity';
import { UsuarioEntity } from '../entities/UsuarioEntity';
import { NivelIncidenciaEntity } from '../entities/NivelIncidenciaEntity';
import { EstadoEntity } from '../entities/EstadosEntity';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: envs.DB_HOST,
    port: Number(envs.DB_PORT),
    username: envs.DB_USER,
    password: envs.DB_PASSWORD,
    database: envs.DB_NAME,
    schema: envs.DB_SCHEMA,
    synchronize: true,
    logging: true,
    entities:[
        EntidadExternaEntity,
        LocalidadEntity,
        ModeradorEntity,
        ReporteEntity,
        SectorEntity,
        TipoReporteEntity,
        UsuarioEntity,
        NivelIncidenciaEntity,
        EstadoEntity
    ],
});

export const connectDB = async() => {
    try {
        await AppDataSource.initialize();
        console.log("Database connected");
    } catch (error) {
        console.error("Error connecting to the DB:", error);
        process.exit(1);
    }
}