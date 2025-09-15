import { Request, Response } from "express";

import { UserApplication } from "../../application/UserApplication";
import { User } from "../../domain/user/User";
import { Validators } from "../config/validations";
import { AppDataSource } from "../config/con_data_base";
import { UsuarioEntity } from "../entities/UsuarioEntity";

export class UserController{
    private app: UserApplication;
    constructor(app: UserApplication){
        this.app = app;
    }

    async login(req: Request, res: Response): Promise<string | Response>{
        try {
            const { email, password } = req.body;
            if (!email || !password)
            return res.status(400).json({ message: "Email y contraseña son requeridos" });

            if (!Validators.email(email))
            return res.status(400).json({ message: "Correo electrónico no válido" });

            if (!Validators.password(password))
            return res.status(400).json({
            message:
                "La contraseña debe tener al menos 6 caracteres y máximo 25, incluyendo al menos una letra y un número",
            });

            const token = await this.app.login(email, password);
            return res.status(200).json({ token });

        } catch (error) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }
    }

    async registerUser(request: Request, response: Response): Promise<Response> {
        const { name, email, password, direccion, localidadId } = request.body;

        try {
            if (!Validators.name(name))
            return response.status(400).json({ message: "Nombre inválido" });

            if (!Validators.email(email))
            return response.status(400).json({ message: "Correo inválido" });

            if (!Validators.password(password))
            return response.status(400).json({
                message: "La contraseña debe tener entre 8 y 25 caracteres, incluyendo al menos una letra mayúscula, una minúscula, un caracter especial y un número"
            });

            const user: Omit<User, "id"> = { name, email, password, direccion, localidadId};
            const userId = await this.app.createUser(user);

            return response.status(201).json({ message: "Usuario creado exitosamente", userId });

        } catch (error) {
            return response.status(500).json({ message: "Error en el servidor" });
        }
    }


    async searchById (request: Request, response: Response): Promise<Response>{
        try {
            const userId = parseInt(request.params.id);
            if(isNaN(userId)) return response.status(400).json({message:"Error en parámetro"});
            const user = await this.app.getUserById(userId);
            if(!user) return response.status(404).json({message:"Usuario no encontrado"});

            return response.status(200).json(user);

        } catch (error) {
            if(error instanceof Error){
                return response.status(500).json({message:"Error en el servidor"});
            }
        }
        return response.status(400).json({message:"Error en la petición"});
    }

    async searchByEmail (request: Request, response: Response): Promise<Response>{
        try {
            const {email}= (request.params);
            if(!Validators.email(email))
            return response.status(400).json({ error: "Correo electrónico no válido" });

            const user = await this.app.getUserByEmail(email);
            if(!user) return response.status(404).json({message:"Usuario no encontrado"});

            return response.status(200).json(user);

        } catch (error) {
            if(error instanceof Error){
                return response.status(500).json({message:"Error en el servidor"});
            }
        }
        return response.status(400).json({message:"Error en la petición"});
    }

    async allUsers (request: Request, response: Response): Promise<Response>{
        try {
            const users = await this.app.getAllUsers();
            return response.status(200).json(users)
        } catch (error){
            if(error instanceof Error){
                return response.status(500).json({message:"Error en el servidor"});
            }
        }
        return response.status(400).json({message:"Error en la petición"});
    }

    async downUser(request: Request, response: Response): Promise<Response>{
        try {
            const userId = parseInt(request.params.id);
            if(isNaN(userId)) return response.status(400).json({message:"Error en parámetro"});
            const user = await this.app.deleteUser(userId);
            if(!user) return response.status(404).json({message:"Usuario no encontrado"});

            return response.status(200).json(user);

        } catch (error) {
            if(error instanceof Error){
                return response.status(500).json({message:"Error en el servidor"});
            }
        }
        return response.status(400).json({message:"Error en la petición"});
    }

    async updateUser(request: Request, response: Response): Promise<Response>{
        try{
            const userId = parseInt(request.params.id);
            if(isNaN(userId)) return response.status(400).json({message:"Error en parámetro"});

            let { name, email, password, status } = request.body;

            if (name && !Validators.name(name)) 
            return response.status(400).json({message:"El nombre debe tener al menos 3 caracteresponse y solo contener letras",});

            if (email && !Validators.email(email))
            return response.status(400).json({ error: "Correo electrónico no válido" });

            if (password && !Validators.password(password))
            return response.status(400).json({message:"La contraseña debe tener al menos 6 caracteres, incluyendo al menos una letra y un número"});

            const updated = await this.app.updateUser(userId,{name, email, password });
            if(!updated) return response.status(404).json({message: "Usuario no encontrado o sin cambios"});

            return response.status(200).json({message:"Usuaurio actualizaco exitosamente"})

        }catch(error){
            if(error instanceof Error){
                return response.status(500).json({message:"Error en el servidor"});
            }
        }
        return response.status(400).json({message:"Error en la petición"});
    }

    async infoUser(request: Request, response: Response): Promise<Response>{
        try {
            const userId = (request as any).user.id;
            if (!userId) return response.status(401).json({message: "No autorizado"});

            const repo = AppDataSource.getRepository(UsuarioEntity);
            const user = await repo.findOne({where: {id: userId}});
            if (!user) return response.status(404).json({message: "Usuario no encontrado"});

            return response.json({id: user.id, name: user.nombre, email: user.email});
        } catch (e) {
            return response.status(500).json({message: "Error obteniendo usuario"});
        }
    }
}