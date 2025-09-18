import { Router } from "express";

import { ModeradorApplication } from "../../application/ModeradorApplication";
import { ModeradorController } from "../controller/ModeradorController";
import { ModeradorAdapter } from "../adapter/ModeradorAdapter"; 
import { authenticateToken } from "../web/authMiddleware";

const router = Router();

const moderadorAdapter = new ModeradorAdapter();
const moderadorApp = new ModeradorApplication(moderadorAdapter);
const moderadorController = new ModeradorController(moderadorApp);

router.post("/moderadores/login", async(request, response) => {
    await moderadorController.login(request, response)
});

router.post("/moderadores", authenticateToken, async (req, res) => moderadorController.createModerador(req, res));
router.get("/moderadores", authenticateToken, async (req, res) => moderadorController.getAllModeradores(req, res));
router.get("/moderadores/:id", authenticateToken, async (req, res) => moderadorController.getModeradorById(req, res));
router.put("/moderadores/:id", authenticateToken, async (req, res) => moderadorController.updateModerador(req, res));
router.delete("/moderadores/:id", authenticateToken, async (req, res) => moderadorController.deleteModerador(req, res));

export default router;
