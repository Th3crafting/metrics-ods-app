import { api } from "./api";
import type { Localidad } from "../types/localidad";

export const localidadesService = {
    list: () => api<Localidad[]>("/localidades"),
};