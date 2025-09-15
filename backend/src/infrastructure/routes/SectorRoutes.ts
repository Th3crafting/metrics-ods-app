import { Router } from "express";

import { SectorController } from "../controller/SectorController";
import { SectorApplication } from "../../application/SectorApplication";
import { SectorAdapter } from "../adapter/SectorAdapter";
import { authenticateToken } from "../web/authMiddleware";

const router = Router();

const sectorAdapter = new SectorAdapter();
const sectorApp = new SectorApplication(sectorAdapter);
const sectorController = new SectorController(sectorApp);

router.post("/sectores", authenticateToken, (req, res) => sectorController.createSector(req, res));
router.put("/sectores/:id", authenticateToken, (req, res) => sectorController.updateSector(req, res));
router.delete("/sectores/:id", authenticateToken, (req, res) => sectorController.deleteSector(req, res));
router.get("/sectores", authenticateToken, (req, res) => sectorController.getAllSectores(req, res));
router.get("/sectores/:id", authenticateToken, (req, res) => sectorController.getSectorById(req, res));
router.get("/sectores/localidad/:localidadId", authenticateToken, (req, res) => sectorController.getSectoresByLocalidad(req, res));

export default router;
