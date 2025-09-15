import { api } from "./api";
import type { RegisterUserDto, User } from "../types/user";

export const usersService = {
    register: (dto: RegisterUserDto) => api<User | { id: number }>("/register", {
        method: "POST",
        body: dto,
    }),
};