import bcrypt from "bcryptjs";

import { Moderador } from "../domain/moderador/Moderador";
import { ModeradorPort } from "../domain/moderador/ModeradorPort";
import { AuthApplication } from "./AuthApplication";
import { AdminAuthApplication } from "./AdminAuthApplication";

export class ModeradorApplication {
    private port: ModeradorPort;

    constructor(port: ModeradorPort) {
        this.port = port;
    }

    async login(email: string, password: string): Promise<string> {
        const moderador = await this.port.getModeradorByEmail(email);
        if (!moderador) throw new Error("Credenciales inválidas");

        const match = await bcrypt.compare(password, moderador.password);
        if (!match) throw new Error("Credenciales inválidas");

        const payload = {
            sub: moderador.id,
            email: moderador.email,
            is_admin: !!moderador.isAdmin,
        }

        if (moderador.isAdmin) {
            return (
                AdminAuthApplication.generateToken(payload)
            );
        } else {
            return (
                AuthApplication.generateToken(payload)
            );
        }
    }

    async createModerador(moderador: Omit<Moderador, "id">): Promise<number> {
        const existing = await this.port.getModeradorByEmail(moderador.email);
        if (existing) throw new Error("El email ya está en uso");

        moderador.password = await bcrypt.hash(moderador.password, 12);
        return await this.port.createModerador(moderador);
    }

    async updateModerador(id: number, moderador: Partial<Moderador>): Promise<boolean> {
        const existingModerador = await this.port.getModeradorById(id);
        if(!existingModerador) {
            throw new Error("El usuario no existe");
        }

        if(moderador.email) {
            const emailTaken = await this.port.getModeradorByEmail(moderador.email);
            if(emailTaken && emailTaken.id !== id) {
                throw new Error("Error en actualizar el email ¡NO DISPONIBLE!");
            }
        }
        
        if("password" in moderador) {
            const pwd = (moderador.password ?? "").trim();
            if (!pwd) {
                delete moderador.password;
            } else {
                const hashedPass = await bcrypt.hash(pwd, 12);
                moderador.password = hashedPass;
            }
        }
        return await this.port.updateModerador(id,moderador);
    }

    async deleteModerador(id: number): Promise<boolean> {
        const existing = await this.port.getModeradorById(id);
        if (!existing) throw new Error("Moderador no encontrado");
        return await this.port.deleteModerador(id);
    }

    async getAllModeradores(): Promise<Moderador[]> {
        return await this.port.getAllModeradores();
    }

    async getModeradorById(id: number): Promise<Moderador | null> {
        return await this.port.getModeradorById(id);
    }

    async getSectoresIds(moderadorId: number) {
        return this.port.getSectoresIds(moderadorId);
    }

    async setSectores(moderadorId: number, sectorIds: number[]): Promise<boolean> {
        return this.port.setSectores(moderadorId, sectorIds);
    }
}