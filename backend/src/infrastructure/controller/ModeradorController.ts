import { Request, Response } from "express";

import { ModeradorApplication } from "../../application/ModeradorApplication";
import { Moderador } from "../../domain/moderador/Moderador";
import { Validators } from "../config/validations";

export class ModeradorController {
    private app: ModeradorApplication;

    constructor(app: ModeradorApplication) {
        this.app = app;
    }

    async login(req: Request, res: Response): Promise<string | Response> {
        try {
            const { email, password } = req.body;
            if (!email || !password)
            return res.status(400).json({ message: "Email y contraseña son requeridos" });

            if (!Validators.email(email))
            return res.status(400).json({ message: "Correo electrónico no válido" });

            if (!Validators.password(password))
            return res.status(400).json({
            message:
                "La contraseña debe tener al menos 6 caracteres y máximo 25, incluyendo al menos una letra y un número",
            });

            const token = await this.app.login(email, password);
            return res.status(200).json({ token });
        } catch (error) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }
    }

    async createModerador(req: Request, res: Response): Promise<Response> {
        try {
            const { nombre, email, password } = req.body;

            if (!nombre || !email || !password) {
                return res.status(400).json({ message: "Faltan campos obligatorios" });
            }

            const moderador: Omit<Moderador, "id"> = {
                nombre,
                email,
                password,
                isAdmin: false,
            };

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