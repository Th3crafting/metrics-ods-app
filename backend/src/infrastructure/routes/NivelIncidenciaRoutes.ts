import { Router } from "express";
import { EstadoAdapter } from "../adapter/EstadoAdapter";
import { EstadoApplication } from "../../application/EstadosApplication";
import { EstadoController } from "../controller/EstadosController";
import { authenticateToken } from "../web/authMiddleware";

const router = Router();

const estadoAdapter = new EstadoAdapter();
const estadoApp = new EstadoApplication(estadoAdapter);
const estadoController = new EstadoController(estadoApp);

router.post("/estados", authenticateToken, async (req, res) => estadoController.createEstado(req, res));
router.get("/estados", authenticateToken, async (req, res) => estadoController.getAllEstados(req, res));
router.get("/estados/:id", authenticateToken, async (req, res) => estadoController.getEstadoById(req, res));
router.put("/estados/:id", authenticateToken, async (req, res) => estadoController.updateEstado(req, res));
router.delete("/estados/:id", authenticateToken, async (req, res) => estadoController.deleteEstado(req, res));

export default router;
