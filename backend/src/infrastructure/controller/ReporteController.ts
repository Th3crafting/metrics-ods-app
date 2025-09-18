import { Request, Response } from "express";

import { ReporteApplication } from "../../application/ReporteApplication";
import { NewReporte, Reporte } from "../../domain/reporte/Reporte";
import { AppDataSource } from "../config/con_data_base";
import { ReporteEntity } from "../entities/ReporteEntity";
import { ESTADOS } from "../constants/estados";
import { DashboardResponse, DashboardReportItem } from "../interfaces/MyDashboard";

type RequestWithUser = Request & { user?: { id: number; email?: string } };

export class ReporteController {
    private app: ReporteApplication;

    constructor(app: ReporteApplication) {
        this.app = app;
    }

    createReporte = async (req: RequestWithUser, res: Response) => {
        try {
            if (!req.user?.id) {
            return res.status(401).json({ message: "No autorizado" });
            }

            const userId = Number(req.user.id);
            if (!Number.isInteger(userId) || userId <= 0) {
            return res.status(400).json({ message: "ID inválido" });
            }

            const { titulo, descripcion, direccion, tipoReporteId, sectorId, nivelIncidenciaId } = req.body ?? {};

            if (!titulo || typeof titulo !== "string") {
            return res.status(400).json({ message: "El título es obligatorio." });
            }
            if (!Number.isInteger(tipoReporteId) || tipoReporteId <= 0) {
            return res.status(400).json({ message: "tipoReporteId inválido." });
            }
            if (!Number.isInteger(sectorId) || sectorId <= 0) {
            return res.status(400).json({ message: "sectorId inválido." });
            }
            if (!Number.isInteger(nivelIncidenciaId) || nivelIncidenciaId <= 0) {
            return res.status(400).json({ message: "nivelIncidenciaId inválido." });
            }

            const input: NewReporte = {
            titulo: titulo.trim(),
            descripcion: descripcion ?? null,
            direccion: direccion ?? null,
            tipoReporteId,
            sectorId,
            nivelIncidenciaId,
            entidadExternaId: null,
            usuarioId: userId,
            };

            const creado = await this.app.create(input);
            return res.status(201).json(creado);
        } catch (err: any) {
            return res.status(400).json({ message: err?.message ?? "Error creando el reporte" });
        }
    };

    updateReporte = async (req: RequestWithUser, res: Response) => {
        try {
            if (!req.user?.id) return res.status(401).json({ message: "No autorizado" });

            const id = Number(req.params.id);
            if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ message: "Id inválido" });
            }

            const { estadoId, entidadExternaId, ...rest } = req.body ?? {};
            const unknown = Object.keys(rest);
            if (unknown.length > 0) {
            return res.status(400).json({
                message: `Campos no permitidos en update: ${unknown.join(", ")} (solo estadoId, entidadExternaId)`,
            });
            }

            if (estadoId === undefined && entidadExternaId === undefined) {
            return res.status(400).json({ message: "Nada para actualizar (envía estadoId y/o entidadExternaId)" });
            }

            const patch: Partial<Reporte> = {};
            if (estadoId !== undefined) {
            const v = Number(estadoId);
            if (!Number.isInteger(v) || v <= 0) {
                return res.status(400).json({ message: "estadoId inválido" });
            }
            patch.estadoId = v;
            }

            if (entidadExternaId === null) {
            patch.entidadExternaId = null;
            } else if (entidadExternaId !== undefined) {
            const v = Number(entidadExternaId);
            if (!Number.isInteger(v) || v <= 0) {
                return res.status(400).json({ message: "entidadExternaId inválido" });
            }
            patch.entidadExternaId = v;
            }

            const ok = await this.app.update(id, patch);
            if (!ok) return res.status(404).json({ message: "Reporte no encontrado" });

            return res.status(200).json({ message: "Reporte actualizado" });
        } catch (err: any) {
            return res.status(400).json({ message: err?.message ?? "Error actualizando el reporte" });
        }
    };

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
                .leftJoinAndSelect("r.tipoReporte", "tipoReporte")
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

            const toCard = (r: ReporteEntity): DashboardReportItem => ({
                id: r.id,
                titulo: r.titulo ?? "",
                descripcion: r.descripcion ?? null,
                direccion: r.direccion ?? "",
                fecha: r.fecha instanceof Date ? r.fecha.toISOString() : String(r.fecha),
                tipoReporteId: r.tipoReporte?.id ?? 0,
                tipoReporteNombre: r.tipoReporte.nombre ?? "",
            });

            const abiertosDTO   = abiertos.map(toCard);
            const pendientesDTO = pendientes.map(toCard);
            const enRevisionDTO = enRevision.map(toCard);
            const cerradosDTO   = cerrados.map(toCard);
            const rechazadosDTO = rechazados.map(toCard);

            const payload: DashboardResponse = {
                totals: { total, thisMonth},
                byStatus,
                lists: {
                    Abierto: abiertosDTO,
                    Pendiente: pendientesDTO,
                    EnRevision: enRevisionDTO,
                    Cerrado: cerradosDTO,
                    Rechazado: rechazadosDTO,
                },
            };

            return response.json(payload)
        } catch (error) {
            return response.status(500).json({message: "Error obteniendo dashboard"})
        }
    }
}