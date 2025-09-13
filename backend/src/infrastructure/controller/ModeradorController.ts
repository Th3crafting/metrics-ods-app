import { Request, Response } from "express";

import { ModeradorApplication } from "../../application/ModeradorApplication";
import { Moderador } from "../../domain/moderador/Moderador";

export class ModeradorController {
    private app: ModeradorApplication;

    constructor(app: ModeradorApplication) {
        this.app = app;
    }

    async createModerador(req: Request, res: Response): Promise<Response> {
        try {
            const { nombre, email, password } = req.body;

            if (!nombre || !email || !password) {
                return res.status(400).json({ message: "Faltan campos obligatorios" });
            }

            const moderador: Omit<Moderador, "id"> = { nombre, email, password };
            const id = await this.app.createModerador(moderador);

            return res.status(201).json({ message: "Moderador creado", id });
        } catch (error) {
            return res.status(500).json({ message: "Error en el servidor", error });
        }
    }

    async updateModerador(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

            const updated = await this.app.updateModerador(id, req.body);
            if (!updated) return res.status(404).json({ message: "Moderador no encontrado" });

            return res.status(200).json({ message: "Moderador actualizado" });
        } catch (error) {
            return res.status(500).json({ message: "Error en el servidor", error });
        }
    }

    async deleteModerador(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

            const deleted = await this.app.deleteModerador(id);
            if (!deleted) return res.status(404).json({ message: "Moderador no encontrado" });

            return res.status(200).json({ message: "Moderador eliminado" });
        } catch (error) {
            return res.status(500).json({ message: "Error en el servidor", error });
        }
    }

    async getAllModeradores(req: Request, res: Response): Promise<Response> {
        try {
            const moderadores = await this.app.getAllModeradores();
            return res.status(200).json(moderadores);
        } catch (error) {
            return res.status(500).json({ message: "Error en el servidor", error });
        }
    }

    async getModeradorById(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

            const moderador = await this.app.getModeradorById(id);
            if (!moderador) return res.status(404).json({ message: "Moderador no encontrado" });

            return res.status(200).json(moderador);
        } catch (error) {
            return res.status(500).json({ message: "Error en el servidor", error });
        }
    }
}