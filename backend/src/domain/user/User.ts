import { Localidad } from "../localidad/Localidad";

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    direccion:string;
    Localidad:Localidad;
}