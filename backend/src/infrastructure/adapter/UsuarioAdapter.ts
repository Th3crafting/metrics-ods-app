import { Repository } from "typeorm";

import { User } from "../../domain/user/User";
import { UserPort } from "../../domain/user/UserPort";
import { UsuarioEntity } from "../entities/UsuarioEntity";
import { AppDataSource } from "../config/con_data_base";

export class UsuarioAdapter implements UserPort {
    private userRepository: Repository<UsuarioEntity>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(UsuarioEntity);
    }

    private toDomain(user: UsuarioEntity): User{
        return {
            id: user.id,
            name: user.nombre,
            email: user.email,
            password: user.password,
            direccion: user.direccion,
            Localidad: user.localidad
    
        };
    }

    private toEntity(user: Omit<User, "id">): UsuarioEntity {
        const userEntity = new UsuarioEntity();
        userEntity.nombre = user.name;
        userEntity.email = user.email;
        userEntity.password = user.password;
        userEntity.direccion= user.direccion;
        return userEntity;
    }

    async createUser(user: Omit<User, "id">): Promise<number> {
        const newUser = this.toEntity(user);
        const savedUser = await this.userRepository.save(newUser);
        return savedUser.id;
    }

    async updateUser(id: number, user: Partial<User>): Promise<boolean> {
        const existingUser = await this.userRepository.findOne({ where: { id } });
        if (!existingUser) return false;
        Object.assign(existingUser, {
            nombre: user.name ?? existingUser.nombre,
            email: user.email ?? existingUser.email,
            password: user.password ?? existingUser.password,
            direccion: user.direccion ?? existingUser.direccion,
            localidad: user.Localidad ?? existingUser.localidad
        });
        await this.userRepository.save(existingUser);
        return true;
    }

    async deleteUser(id: number): Promise<boolean> {
        const existingUser = await this.userRepository.findOne({ where: { id } });
        if (!existingUser) return false;
        await this.userRepository.remove(existingUser);
        return true;
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.userRepository.find();
        return users.map(this.toDomain);
    }

    async getUserById(id: number): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { id } });
        return user ? this.toDomain(user) : null;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { email } });
        return user ? this.toDomain(user) : null;
    }
}