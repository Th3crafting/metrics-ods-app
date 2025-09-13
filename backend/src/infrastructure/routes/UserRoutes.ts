import { Router } from "express";

import { UsuarioAdapter } from "../adapter/UsuarioAdapter";
import { UserApplication } from "../../application/UserApplication";
import { UserController } from "../controller/UserController";
import { authenticateToken } from "../web/authMiddleware";

const router = Router();

const userAdapter = new UsuarioAdapter();
const userApp = new UserApplication(userAdapter);
const userController = new UserController(userApp);

router.post("/login", async(request, response) => {
    await userController.login(request, response)
});


router.post("/register", async (request, response) => {
    try {
        await userController.registerUser(request, response);
    } catch (error) {
        console.error("Error en usuario:", error);
        response.status(400).json({message: "Error en la creación del usuario"});
    }
});

router.get("/users", authenticateToken, async (request, response) => {
    try {
        await userController.allUsers(request, response);
    } catch (error) {
        console.error("Error en usuarios:", error);
        response.status(400).json({message: "Error en usuarios"});
    }
});

router.get("/users/:id", authenticateToken, async (request, response) => {
    try {
        await userController.searchById(request, response);
    } catch (error) {
        console.error("El usuario no existe:", error);
        response.status(400).json({message: "El usuario no existe"});
    }
});

router.get("/users/email/:email", authenticateToken, async (request, response) => {
    try {
        await userController.searchByEmail(request, response);
    } catch (error) {
        console.error("El usuario no existe:", error);
        response.status(400).json({message: "El usuario no existe"});
    }
});

router.put("/users/:id", authenticateToken, async (request, response) => {
    try {
        await userController.updateUser(request, response);
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        response.status(400).json({message: "Error al actualizar el usuario"});
    }
});

router.delete("/users/:id", authenticateToken, async (request, response) => {
    try {
        await userController.downUser(request, response);
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        response.status(400).json({message: "Error al eliminar el usuario"});
    }
});


export default router;