import { request, response, Router } from "express";

import { ModeradorApplication } from "../../application/ModeradorApplication";
import { ModeradorController } from "../controller/ModeradorController";
import { ModeradorAdapter } from "../adapter/ModeradorAdapter"; 
import { authenticateToken } from "../web/authMiddleware";

const router = Router();

const moderadorAdapter = new ModeradorAdapter();
const moderadorApp = new ModeradorApplication(moderadorAdapter);
const moderadorController = new ModeradorController(moderadorApp);

router.get("/moderadores/me", authenticateToken, async (request, response) => {
    try {
        await moderadorController.infoModerator(request, response);
    } catch (error) {
        console.error("Error al intentar obtener la información del moderador", error);
        response.status(400).json({message: "Error al obtener la información del moderador"});
    }
});

router.post("/moderadores/login", async(request, response) => {
    await moderadorController.login(request, response)
});

router.get("/moderadores/:id/sectores", authenticateToken, async (request, response) => {
    try {
        await moderadorController.getSectores(request, response);
    } catch (error) {
        console.error("Error al intentar obtener los sectores del moderador/admin", error);
        response.status(400).json({message: "Error al obtener los sectores del moderador/admin"});
    }
});

router.put("/moderadores/:id/sectores", authenticateToken, async (request, response) => {
    try {
        await moderadorController.setSectores(request, response);
    } catch (error) {
        console.error("Error al intentar actualizar los sectores del moderador/admin", error);
        response.status(400).json({message: "Error al aztualizar los sectores del moderador/admin"});
    }
});

router.post("/moderadores", authenticateToken, async (req, res) => moderadorController.createModerador(req, res));
router.get("/moderadores", authenticateToken, async (req, res) => moderadorController.getAllModeradores(req, res));
router.get("/moderadores/:id", authenticateToken, async (req, res) => moderadorController.getModeradorById(req, res));
router.put("/moderadores/:id", authenticateToken, async (req, res) => moderadorController.updateModerador(req, res));
router.delete("/moderadores/:id", authenticateToken, async (req, res) => moderadorController.deleteModerador(req, res));

export default router;
