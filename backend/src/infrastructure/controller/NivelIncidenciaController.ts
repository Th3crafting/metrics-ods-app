import { Request, Response } from "express";
import { NivelIncidenciaApplication } from "../../application/NivelIncidenciaApplication";
import { NivelIncidencia } from "../../domain/nivelIncidencia/NivelIncidencia";

export class NivelIncidenciaController {
  private app: NivelIncidenciaApplication;

  constructor(app: NivelIncidenciaApplication) {
    this.app = app;
  }

  async createNivelIncidencia(req: Request, res: Response): Promise<Response> {
        try {
            const { nivel, descripcion } = req.body;

            if (!nivel || !descripcion) {
                return res.status(400).json({ message: "Faltan campos obligatorios" });
            }

            const newNivel: Omit<NivelIncidencia, "id"> = {
    nivel,
    descripcion
};


            const id = await this.app.createNivelIncidencia(newNivel);
            return res.status(201).json({ message: "Nivel de incidencia creado", id });

        } catch (error) {
            return res.status(500).json({ message: "Error en el servidor", error });
        }
  }

  async getAllNivelesIncidencias(req: Request, res: Response): Promise<Response> {
    try {
      const niveles = await this.app.getAllNivelesIncidencia();
      return res.status(200).json(niveles);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor", error });
    }
  }

  async getNivelIncidenciaById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

      const nivel = await this.app.getNivelIncidenciaById(id);
      if (!nivel) return res.status(404).json({ message: "Nivel de incidencia no encontrado" });

      return res.status(200).json(nivel);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor", error });
    }
  }

  async updateNivelIncidencia(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const updated = await this.app.updateNivelIncidencia(id, req.body);
      if (!updated) return res.status(404).json({ message: "Nivel de incidencia no encontrado" });
      return res.status(200).json({ message: "Nivel de incidencia actualizado" });
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor", error });
    }
  }

  async deleteNivelIncidencia(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.app.deleteNivelIncidencia(id);
      if (!deleted) return res.status(404).json({ message: "Nivel de incidencia no encontrado" });
      return res.status(200).json({ message: "Nivel de incidencia eliminado" });
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor", error });
    }
  }
}
