import { Request, Response } from "express";

import { ReporteApplication } from "../../application/ReporteApplication";
import { Reporte } from "../../domain/reporte/Reporte";
import { AppDataSource } from "../config/con_data_base";
import { ReporteEntity } from "../entities/ReporteEntity";

export class ReporteController {
    private app: ReporteApplication;

    constructor(app: ReporteApplication) {
        this.app = app;
    }

    async createReporte(req: Request, res: Response): Promise<Response> {
        try {
            const { titulo, descripcion, direccion, latitud, longitud, fecha, estado, usuarioId, tipoReporteId, sectorId,EntidadExternaid } = req.body;

            if (!titulo || !descripcion || !direccion || !usuarioId || !tipoReporteId || !sectorId) {
                return res.status(400).json({ message: "Faltan campos obligatorios" });
            }

            const reporte: Omit<Reporte, "id"> = {
                titulo,
                descripcion,
                direccion,
                latitud,
                longitud,
                fecha: fecha ? new Date(fecha) : new Date(),
                estadoId: estado || "pendiente",
                usuarioId,
                tipoReporteId,
                sectorId,
                EntidadExternaid
            };

            const id = await this.app.createReporte(reporte);
            return res.status(201).json({ message: "Reporte creado", id });

        } catch (error) {
            return res.status(500).json({ message: "Error en el servidor", error });
        }
    }

    async updateReporte(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

            const updated = await this.app.updateReporte(id, req.body);
            if (!updated) return res.status(404).json({ message: "Reporte no encontrado" });

            return res.status(200).json({ message: "Reporte actualizado" });

        } catch (error) {
            return res.status(500).json({ message: "Error en el servidor", error });
        }
    }

    async deleteReporte(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

            const deleted = await this.app.deleteReporte(id);
            if (!deleted) return res.status(404).json({ message: "Reporte no encontrado" });

            return res.status(200).json({ message: "Reporte eliminado" });

        } catch (error) {
            return res.status(500).json({ message: "Error en el servidor", error });
        }
    }

    async getAllReportes(req: Request, res: Response): Promise<Response> {
        try {
            const reportes = await this.app.getAllReportes();
            return res.status(200).json(reportes);
        } catch (error) {
            return res.status(500).json({ message: "Error en el servidor", error });
        }
    }

    async getReporteById(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

            const reporte = await this.app.getReporteById(id);
            if (!reporte) return res.status(404).json({ message: "Reporte no encontrado" });

            return res.status(200).json(reporte);

        } catch (error) {
            return res.status(500).json({ message: "Error en el servidor", error });
        }
    }

    async summary(request: Request, response: Response): Promise<Response> {
        try {
            const repo = AppDataSource.getRepository(ReporteEntity);
            const total = await repo.createQueryBuilder("r").getCount();
            const resueltos = await repo.createQueryBuilder("r")
                .where("r.estadoId = :cerradoId", {cerradoId: 4})
                .getCount();
            const activos = total - resueltos;
            return response.json({ activos, resueltos});
        } catch (error) {
            return response.status(500).json({message: "Error obteniendo resumen"})
        }
    }
}