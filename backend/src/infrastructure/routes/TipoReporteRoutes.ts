import { Router } from "express";

import { TipoReporteAdapter } from "../adapter/TipoReporte";
import { TipoReporteApplication } from "../../application/TipoReporteApplication";
import { TipoReporteController } from "../controller/TipoReporteController";
import { authenticateToken } from "../web/authMiddleware";

const router = Router();

const tipoReporteAdapter = new TipoReporteAdapter();
const tipoReporteApp = new TipoReporteApplication(tipoReporteAdapter);
const tipoReporteController = new TipoReporteController(tipoReporteApp);

router.post("/tipos-reporte", authenticateToken, (req, res) => tipoReporteController.createTipoReporte(req, res));
router.put("/tipos-reporte/:id", authenticateToken, (req, res) => tipoReporteController.updateTipoReporte(req, res));
router.delete("/tipos-reporte/:id", authenticateToken, (req, res) => tipoReporteController.deleteTipoReporte(req, res));
router.get("/tipos-reporte", authenticateToken, (req, res) => tipoReporteController.getAllTiposReporte(req, res));
router.get("/tipos-reporte/:id", authenticateToken, (req, res) => tipoReporteController.getTipoReporteById(req, res));

export default router;
