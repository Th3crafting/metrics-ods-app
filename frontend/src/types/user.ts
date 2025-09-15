export interface RegisterUserDto {
    nombre: string;
    email: string;
    password: string;
    direccion: string;
    localidadId: number;
}

export interface User {
  id: number;
  nombre: string;
  email: string;
  direccion: string;
  localidadId: number;
}