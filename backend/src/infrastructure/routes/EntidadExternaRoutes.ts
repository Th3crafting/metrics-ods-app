import { Router } from "express";

import { EntidadExternaApplication } from "../../application/EntidadExternaApplication";
import { EntidadExternaController } from "../controller/EntidadExternaController";
import { EntidadExternaAdapter } from "../adapter/EntidadExternaAdapter";
import { authenticateToken } from "../web/authMiddleware";

const router = Router();

const entidadAdapter = new EntidadExternaAdapter();
const entidadApp = new EntidadExternaApplication(entidadAdapter);
const entidadController = new EntidadExternaController(entidadApp);

router.post("/entidades-externas", authenticateToken, async (req, res) => entidadController.createEntidadExterna(req, res));
router.get("/entidades-externas", authenticateToken, async (req, res) => entidadController.getAllEntidadesExternas(req, res));
router.get("/entidades-externas/:id", authenticateToken, async (req, res) => entidadController.getEntidadExternaById(req, res));
router.put("/entidades-externas/:id", authenticateToken, async (req, res) => entidadController.updateEntidadExterna(req, res));
router.delete("/entidades-externas/:id", authenticateToken, async (req, res) => entidadController.deleteEntidadExterna(req, res));

export default router;