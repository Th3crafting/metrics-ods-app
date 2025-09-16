import { Request, Response } from "express";

import { ReporteApplication } from "../../application/ReporteApplication";
import { Reporte } from "../../domain/reporte/Reporte";
import { AppDataSource } from "../config/con_data_base";
import { ReporteEntity } from "../entities/ReporteEntity";
import { ESTADOS } from "../constants/estados";
import { DashboardResponse } from "../interfaces/MyDashboard";

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
            const userId = (request as any).user?.id;
            if (!userId) return response.status(401).json({message: "No autorizado"});

            const repo = AppDataSource.getRepository(ReporteEntity);

            const baseQB = repo.createQueryBuilder("r").where("r.usuarioId = :userId", {userId});

            const total = await baseQB.clone().getCount();

            const resueltos = await baseQB.clone()
                .andWhere("r.estadoId = :cerradoId OR r.estadoId = :rechazadoId", {
                    cerradoId: 4,
                    rechazadoId: 5
                })
                .getCount();

            const activos = total - resueltos;

            return response.json({ activos, resueltos });
        } catch (error) {
            return response.status(500).json({message: "Error obteniendo resumen"})
        }
    }

    async myDashboard(request: Request, response: Response): Promise<Response> {
        try {
            const userId = (request as any).user?.id;
            if (!userId) return response.status(401).json({message: "No autorizado"});

            const repo = AppDataSource.getRepository(ReporteEntity);

            const baseQB = repo
                .createQueryBuilder("r")
                .where("r.usuarioId = :userId", {userId});

            const now = new Date();
            const start = new Date(now.getFullYear(), now.getMonth(), 1);
            const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);

            const [total, thisMonth] = await Promise.all([
                baseQB.clone().getCount(),
                baseQB
                    .clone()
                    .andWhere("r.fecha >= :start AND r.fecha < :end", { start, end })
                    .getCount(),
            ]);

            const countsRaw = await baseQB
                .clone()
                .select("r.estadoId", "estadoId")
                .addSelect("COUNT(*)", "count")
                .groupBy("r.estadoId")
                .getRawMany<{ estadoId: number; count: string }>();

            const countOf = (id: number) =>
                Number(countsRaw.find(c => Number(c.estadoId) === id)?.count ?? 0);

            const byStatus = {
                Abierto: countOf(ESTADOS.ABIERTO),
                Pendiente: countOf(ESTADOS.PENDIENTE),
                EnRevision: countOf(ESTADOS.EN_REVISION),
                Cerrado: countOf(ESTADOS.CERRADO),
                Rechazado: countOf(ESTADOS.RECHAZADO),
            };

            const limit = Number(request.query.limit ?? 20);
            const offset = Number(request.query.offset ?? 0);

            const listFor = (estadoId: number) =>
                baseQB
                    .clone()
                    .andWhere("r.estadoId = :estadoId", {estadoId})
                    .orderBy("r.fecha", "DESC")
                    .take(limit)
                    .skip(offset)
                    .getMany();

            const  [abiertos, pendientes, enRevision, cerrados, rechazados] = await Promise.all([
                listFor(ESTADOS.ABIERTO),
                listFor(ESTADOS.PENDIENTE),
                listFor(ESTADOS.EN_REVISION),
                listFor(ESTADOS.CERRADO),
                listFor(ESTADOS.RECHAZADO),
            ]);

            const payload: DashboardResponse = {
                totals: { total, thisMonth},
                byStatus,
                lists: {
                    Abierto: abiertos,
                    Pendiente: pendientes,
                    EnRevision: enRevision,
                    Cerrado: cerrados,
                    Rechazado: rechazados,
                },
            };

            return response.json(payload)
        } catch (error) {
            return response.status(500).json({message: "Error obteniendo dashboard"})
        }
    }
}