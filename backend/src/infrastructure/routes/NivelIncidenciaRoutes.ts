import { Router } from "express";

import { NivelIncidenciaAdapter } from '../adapter/NivelIncidenciaAdapter';
import { NivelIncidenciaApplication } from "../../application/NivelIncidenciaApplication";
import { NivelIncidenciaController } from "../controller/NivelIncidenciaController";
import { authenticateToken } from "../web/authMiddleware";

const router = Router();

const nivelIncidenciaAdapter = new NivelIncidenciaAdapter();
const nivelIncidenciaApp = new NivelIncidenciaApplication(nivelIncidenciaAdapter);
const nivelIncidenciaController = new NivelIncidenciaController(nivelIncidenciaApp);

router.post("/niveles", authenticateToken, async (req, res) => nivelIncidenciaController.createNivelIncidencia(req, res));
router.get("/niveles", authenticateToken, async (req, res) => nivelIncidenciaController.getAllNivelesIncidencias(req, res));
router.get("/niveles/:id", authenticateToken, async (req, res) => nivelIncidenciaController.getNivelIncidenciaById(req, res));
router.put("/niveles/:id", authenticateToken, async (req, res) => nivelIncidenciaController.updateNivelIncidencia(req, res));
router.delete("/niveles/:id", authenticateToken, async (req, res) => nivelIncidenciaController.deleteNivelIncidencia(req, res));

export default router;
