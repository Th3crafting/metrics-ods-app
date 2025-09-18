import { Request, Response } from "express";

import { SectorApplication } from "../../application/SectorApplication";

export class SectorController {
    private sectorApp: SectorApplication;

    constructor(sectorApp: SectorApplication) {
        this.sectorApp = sectorApp;
    }

    async createSector(req: Request, res: Response): Promise<void> {
        try {
            const id = await this.sectorApp.createSector(req.body);
            res.status(201).json({ message: "Sector creado con éxito", id });
        } catch (error) {
            console.error("Error creando sector:", error);
            res.status(500).json({ message: "Error creando sector" });
        }
    }

    async updateSector(req: Request, res: Response): Promise<void> {
        try {
            const updated = await this.sectorApp.updateSector(Number(req.params.id), req.body);
            if (!updated) {
                res.status(404).json({ message: "Sector no encontrado" });
                return;
            }
            res.json({ message: "Sector actualizado con éxito" });
        } catch (error) {
            console.error("Error actualizando sector:", error);
            res.status(500).json({ message: "Error actualizando sector" });
        }
    }

    async deleteSector(req: Request, res: Response): Promise<void> {
        try {
            const deleted = await this.sectorApp.deleteSector(Number(req.params.id));
            if (!deleted) {
                res.status(404).json({ message: "Sector no encontrado" });
                return;
            }
            res.json({ message: "Sector eliminado con éxito" });
        } catch (error) {
            console.error("Error eliminando sector:", error);
            res.status(500).json({ message: "Error eliminando sector" });
        }
    }

    async getAllSectores(req: Request, res: Response): Promise<void> {
        try {
            const sectores = await this.sectorApp.getAllSectores();
            res.json(sectores);
        } catch (error) {
            console.error("Error obteniendo sectores:", error);
            res.status(500).json({ message: "Error obteniendo sectores" });
        }
    }

    async getSectorById(req: Request, res: Response): Promise<void> {
        try {
            const sector = await this.sectorApp.getSectorById(Number(req.params.id));
            if (!sector) {
                res.status(404).json({ message: "Sector no encontrado" });
                return;
            }
            res.json(sector);
        } catch (error) {
            console.error("Error obteniendo sector:", error);
            res.status(500).json({ message: "Error obteniendo sector" });
        }
    }
}