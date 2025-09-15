import { Request, Response } from "express";
import { EstadoApplication } from "../../application/EstadosApplication";

export class EstadoController {
  private app: EstadoApplication;

  constructor(app: EstadoApplication) {
    this.app = app;
  }

  async createEstado(req: Request, res: Response): Promise<Response> {
    try {
      const { nombre } = req.body;
      if (!nombre) return res.status(400).json({ message: "Nombre requerido" });

      const id = await this.app.createEstado({ nombre });
      return res.status(201).json({ message: "Estado creado", id });
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor", error });
    }
  }

  async getAllEstados(req: Request, res: Response): Promise<Response> {
    try {
      const estados = await this.app.getAllEstados();
      return res.status(200).json(estados);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor", error });
    }
  }

  async getEstadoById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

      const estado = await this.app.getEstadoById(id);
      if (!estado) return res.status(404).json({ message: "Estado no encontrado" });

      return res.status(200).json(estado);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor", error });
    }
  }

  async updateEstado(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const updated = await this.app.updateEstado(id, req.body);
      if (!updated) return res.status(404).json({ message: "Estado no encontrado" });
      return res.status(200).json({ message: "Estado actualizado" });
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor", error });
    }
  }

  async deleteEstado(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.app.deleteEstado(id);
      if (!deleted) return res.status(404).json({ message: "Estado no encontrado" });
      return res.status(200).json({ message: "Estado eliminado" });
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor", error });
    }
  }
}