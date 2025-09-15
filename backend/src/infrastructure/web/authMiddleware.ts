import { NextFunction, Request, Response } from "express";

import { AuthApplication } from "../../application/AuthApplication";
import { AppDataSource } from "../config/con_data_base";
import { UsuarioEntity } from "../entities/UsuarioEntity";

export async function authenticateToken(request: Request, response: Response, next: NextFunction) {
    try {
        const header = request.headers["authorization"];
        if (!header) return response.status(401).json({message: "Token requerido"});

        const [type, token] = header.split(" ");
        if (type !== "Bearer" || !token) return response.status(401).json({message: "Formato de token inválido"});

        const payload: any = AuthApplication.verifyToken(token);

        const email = payload?.email ?? payload;

        if(!email) return response.status(400).json({message: "Email inválido en token"});

        const repo = AppDataSource.getRepository(UsuarioEntity);
        const user = await repo.findOne({where: {email}});
        if(!user) return response.status(401).json({message: "Usuario no encontrado"});

        (request as any).user = {id: user.id, email: user.email};
        next();
    } catch (error) {
        return response.status(403).json({message: "Invalid Token"});
    }
}