import { Request, Response } from "express";

import { LocalidadApplication } from "../../application/LocalidadApplication";
import { Localidad } from "../../domain/localidad/Localidad";

export class LocalidadController {
  private app: LocalidadApplication;

  constructor(app: LocalidadApplication) {
    this.app = app;
  }

  async createLocalidad(req: Request, res: Response): Promise<Response> {
    try {
      const { nombre } = req.body;

      if (!nombre || nombre.trim().length < 3) {
        return res.status(400).json({ message: "El nombre de la localidad es inválido" });
      }

      const localidad: Omit<Localidad, "id"> = { nombre };
      const id = await this.app.createLocalidad(localidad);

      return res.status(201).json({ message: "Localidad creada exitosamente", id });
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async getLocalidadById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

      const localidad = await this.app.getLocalidadById(id);
      if (!localidad) return res.status(404).json({ message: "Localidad no encontrada" });

      return res.status(200).json(localidad);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async getAllLocalidades(req: Request, res: Response): Promise<Response> {
    try {
      const localidades = await this.app.getAllLocalidades();
      return res.status(200).json(localidades);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async updateLocalidad(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

      const { nombre } = req.body;
      if (nombre && nombre.trim().length < 3) {
        return res.status(400).json({ message: "Nombre inválido" });
      }

      const updated = await this.app.updateLocalidad(id, { nombre });
      if (!updated) return res.status(404).json({ message: "Localidad no encontrada o sin cambios" });

      return res.status(200).json({ message: "Localidad actualizada exitosamente" });
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async deleteLocalidad(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

      const deleted = await this.app.deleteLocalidad(id);
      if (!deleted) return res.status(404).json({ message: "Localidad no encontrada" });

      return res.status(200).json({ message: "Localidad eliminada exitosamente" });
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }
}