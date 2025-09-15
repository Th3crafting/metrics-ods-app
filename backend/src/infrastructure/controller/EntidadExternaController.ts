import { Request, Response } from "express";

import { EntidadExternaApplication } from "../../application/EntidadExternaApplication";
import { EntidadExterna } from "../../domain/entidadExterna/EntidadExterna";

export class EntidadExternaController {
    private app: EntidadExternaApplication;

    constructor(app: EntidadExternaApplication) {
        this.app = app;
    }

    async createEntidadExterna(req: Request, res: Response): Promise<Response> {
        try {
            const { nombre, contacto,telefono } = req.body;

            if (!nombre || !contacto) {
                return res.status(400).json({ message: "Faltan campos obligatorios" });
            }

            const entidad: Omit<EntidadExterna, "id"> = { nombre, contacto,telefono };
            const id = await this.app.createEntidadExterna(entidad);

            return res.status(201).json({ message: "Entidad externa creada", id });
        } catch (error) {
            return res.status(500).json({ message: "Error en el servidor", error });
        }
    }

    async updateEntidadExterna(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

            const updated = await this.app.updateEntidadExterna(id, req.body);
            if (!updated) return res.status(404).json({ message: "Entidad externa no encontrada" });

            return res.status(200).json({ message: "Entidad externa actualizada" });
        } catch (error) {
            return res.status(500).json({ message: "Error en el servidor", error });
        }
    }

    async deleteEntidadExterna(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

            const deleted = await this.app.deleteEntidadExterna(id);
            if (!deleted) return res.status(404).json({ message: "Entidad externa no encontrada" });

            return res.status(200).json({ message: "Entidad externa eliminada" });
        } catch (error) {
            return res.status(500).json({ message: "Error en el servidor", error });
        }
    }

    async getAllEntidadesExternas(req: Request, res: Response): Promise<Response> {
        try {
            const entidades = await this.app.getAllEntidadesExternas();
            return res.status(200).json(entidades);
        } catch (error) {
            return res.status(500).json({ message: "Error en el servidor", error });
        }
    }

    async getEntidadExternaById(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

            const entidad = await this.app.getEntidadExternaById(id);
            if (!entidad) return res.status(404).json({ message: "Entidad externa no encontrada" });

            return res.status(200).json(entidad);
        } catch (error) {
            return res.status(500).json({ message: "Error en el servidor", error });
        }
    }
}