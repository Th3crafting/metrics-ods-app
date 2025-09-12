import { Localidad } from "./Localidad";

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    Direccion:string;
    Localidad:Localidad;
}