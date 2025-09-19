import { NextFunction, Request, Response } from "express";

import { AuthApplication } from "../../application/AuthApplication";
import { AdminAuthApplication } from "../../application/AdminAuthApplication";
import { AppDataSource } from "../config/con_data_base";
import { UsuarioEntity } from "../entities/UsuarioEntity";
import { ModeradorEntity } from "../entities/ModeradorEntity";

type Role = "user" | "moderator" | "admin";

declare module "express-serve-static-core" {
    interface Request {
        auth?: { id: number; email: string; role: Role; is_admin?: boolean }
    }
}

export async function authenticateToken(req: Request, res: Response, next: NextFunction) {
    try {
        const header = req.headers["authorization"] || "";
        const [type, token] = header.split(" ");

        if (type !== "Bearer" || !token) {
            return res.status(401).json({message: "Token requerido"})
        }

        try {
            const payload: any = AdminAuthApplication.verifyToken(token)
            const email = (payload?.email ?? "").toString().toLowerCase()
            if (!email) return res.status(400).json({ message: "Email inválido en token" })

            const repoMod = AppDataSource.getRepository(ModeradorEntity)
            const admin = await repoMod.findOne({ where: { email } })
            if (!admin) return res.status(401).json({ message: "Administrador no encontrado" })

            req.auth = { id: admin.id, email: admin.email, role: "admin", is_admin: true }
            return next()
        } catch {}

        let payload: any
        try {
            payload = AuthApplication.verifyToken(token)
        } catch {
            return res.status(401).json({message: "Token inválido"})
        }

        const email = (payload?.email ?? "").toString().toLowerCase()
        if (!email) return res.status(400).json({ message: "Email inválido en token" })

        const repoMod = AppDataSource.getRepository(ModeradorEntity)
        const repoUsr = AppDataSource.getRepository(UsuarioEntity)

        const moderador = await repoMod.findOne({ where: { email } })
        if (moderador) {
        req.auth = { id: moderador.id, email: moderador.email, role: "moderator", is_admin: !!payload?.is_admin }
        return next()
        }

        const user = await repoUsr.findOne({ where: { email } })
        if (user) {
        req.auth = { id: user.id, email: user.email, role: "user" }
        return next()
        }

        return res.status(401).json({ message: "Identidad no encontrada" })
    } catch {
        return res.status(403).json({ message: "Invalid Token" })
    }
}