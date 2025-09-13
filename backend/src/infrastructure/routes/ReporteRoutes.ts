import { Router } from "express";

import { ReporteApplication } from "../../application/ReporteApplication";
import { ReporteController } from "../controller/ReporteController";
import { ReporteAdapter } from "../adapter/ReporteAdapter"; 
import { authenticateToken } from "../web/authMiddleware";

const router = Router();

const reporteAdapter = new ReporteAdapter();
const reporteApp = new ReporteApplication(reporteAdapter);
const reporteController = new ReporteController(reporteApp);

router.post("/reportes", authenticateToken, async (req, res) => reporteController.createReporte(req, res));
router.get("/reportes", authenticateToken, async (req, res) => reporteController.getAllReportes(req, res));
router.get("/reportes/:id", authenticateToken, async (req, res) => reporteController.getReporteById(req, res));
router.put("/reportes/:id", authenticateToken, async (req, res) => reporteController.updateReporte(req, res));
router.delete("/reportes/:id", authenticateToken, async (req, res) => reporteController.deleteReporte(req, res));

export default router;
