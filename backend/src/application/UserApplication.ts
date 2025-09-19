import bcrypt from "bcryptjs";

import { User } from "../domain/user/User";
import { UserPort } from "../domain/user/UserPort";
import { AuthApplication } from "./AuthApplication";

export class UserApplication {
    private port: UserPort;

    constructor(port: UserPort) {
        this.port = port;
    }

    async login(email:string, password:string):Promise<string> {
        const existingUser = await this.port.getUserByEmail(email);
        if(!existingUser) {
            throw new Error("Invalid Credentials");
        }
        const passwordMath = await bcrypt.compare(password, existingUser.password);
        if(!passwordMath) {
            throw new Error("Invalid Credentials");
        }
        const token = AuthApplication.generateToken({
            id: existingUser.id,
            email: existingUser.email
        });
        return token;
    }

    async createUser(user:Omit<User,"id">):Promise<number> {
        const existingUser = await this.port.getUserByEmail(user.email);
        if(!existingUser){
            const hashedPass = await bcrypt.hash(user.password, 12);
            user.password = hashedPass;
            return await this.port.createUser(user);
        }
        throw new Error("El usuario ya existe");
    }

    async updateUser(id:number, user:Partial<User>):Promise<boolean> {
        const existingUser = await this.port.getUserById(id);
        if(!existingUser) {
            throw new Error("El usuario no existe");
        }

        if(user.email) {
            const emailTaken = await this.port.getUserByEmail(user.email);
            if(emailTaken && emailTaken.id !== id) {
                throw new Error("Error en actualizar el email ¡NO DISPONIBLE!");
            }
        }
        
        if("password" in user) {
            const pwd = (user.password ?? "").trim();
            if (!pwd) {
                delete user.password;
            } else {
                const hashedPass = await bcrypt.hash(pwd, 12);
                user.password = hashedPass;
            }
        }
        return await this.port.updateUser(id,user);
    }

    async deleteUser(id:number):Promise<boolean> {
        const existingUser = await this.port.getUserById(id);
        if(!existingUser) {
            throw new Error("No se encontro el usuario");
        }
        return await this.port.deleteUser(id);
    }

    async getUserById(id:number):Promise<User | null> {
        return await this.port.getUserById(id);
    }

    async getUserByEmail(email:string):Promise<User | null> {
        return await this.port.getUserByEmail(email);
    }

    async getAllUsers():Promise<User[]> {
        return await this.port.getAllUsers();
    }
}