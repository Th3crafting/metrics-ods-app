import { Request, Response } from "express";

import { TipoReporteApplication } from "../../application/TipoReporteApplication";

export class TipoReporteController {
    private app: TipoReporteApplication;

    constructor(app: TipoReporteApplication) {
        this.app = app;
    }

    async createTipoReporte(req: Request, res: Response) {
        try {
            const id = await this.app.createTipoReporte(req.body);
            res.status(201).json({ id });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateTipoReporte(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const ok = await this.app.updateTipoReporte(id, req.body);
            res.json({ success: ok });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteTipoReporte(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const ok = await this.app.deleteTipoReporte(id);
            res.json({ success: ok });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllTiposReporte(req: Request, res: Response) {
        try {
            const tipos = await this.app.getAllTiposReporte();
            res.json(tipos);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getTipoReporteById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const tipo = await this.app.getTipoReporteById(id);
            if (!tipo) {
                return res.status(404).json({ message: "No encontrado" });
            }
            res.json(tipo);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}