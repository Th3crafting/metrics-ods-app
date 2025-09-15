import { Router } from "express";

import { LocalidadController } from "../controller/LocalidadController";
import { LocalidadApplication } from "../../application/LocalidadApplication";
import { LocalidadAdapter } from "../adapter/LocalidadAdapter";
import { authenticateToken } from "../web/authMiddleware";

const router = Router();

const localidadAdapter = new LocalidadAdapter();
const localidadApp = new LocalidadApplication(localidadAdapter);
const localidadController = new LocalidadController(localidadApp);

router.post("/localidades", authenticateToken, (req, res) => localidadController.createLocalidad(req, res));
router.put("/localidades/:id", authenticateToken, (req, res) => localidadController.updateLocalidad(req, res));
router.delete("/localidades/:id", authenticateToken, (req, res) => localidadController.deleteLocalidad(req, res));
router.get("/localidades", (req, res) => localidadController.getAllLocalidades(req, res));
router.get("/localidades/:id", authenticateToken, (req, res) => localidadController.getLocalidadById(req, res));

export default router;