import { NewReporte, Reporte } from "../domain/reporte/Reporte";
import { ReportePort } from "../domain/reporte/ReportePort";

export class ReporteApplication {
    private port: ReportePort;

    constructor(port: ReportePort) {
        this.port = port;
    }

    async create(input: NewReporte): Promise<Reporte> {
        const titulo = input.titulo?.trim();
        if (!titulo) {
            throw new Error("El título es obligatorio.");
        }
        if (titulo.length > 100) {
            throw new Error("El título no puede superar 100 caracteres");
        }

        if (
            !Number.isInteger(input.nivelIncidenciaId) ||
            (input.nivelIncidenciaId as number) <= 0
        ) {
            throw new Error("nivelIncidenciaId inválido.");
        }

        const [hasUser, hasTipo, hasSector, hasNivel] = await Promise.all([
            this.port.existsUsuario(input.usuarioId),
            this.port.existsTipoReporte(input.tipoReporteId),
            this.port.existsSector(input.sectorId),
            this.port.existsNivelIncidencia(input.nivelIncidenciaId as number),
        ]);

        if (!hasUser) throw new Error("El usuario no existe.");
        if (!hasTipo) throw new Error("El tipo de reporte no existe.");
        if (!hasSector) throw new Error("El sector no existe.");
        if (!hasNivel) throw new Error("El nivel de incidencia no existe.");

        if (input.entidadExternaId != null) {
            const hasEntidad = await this.port.existsEntidadExterna(
                input.entidadExternaId
            );
            if (!hasEntidad) throw new Error("La entidad externa no existe.");
        }

        const estadoAbiertoId = await this.port.getEstadoAbierto();

        const payload: NewReporte = {
            ...input,
            titulo,
            entidadExternaId: null,
        };

        return await this.port.createReporte(payload, estadoAbiertoId);
    }

    async update(id: number, patch: Partial<Reporte>): Promise<boolean> {
        if (!Number.isInteger(id) || id <= 0) throw new Error("Id inválido.");

        const updates: Partial<Reporte> = {};
        if (patch.estadoId !== undefined) {
            if (!Number.isInteger(patch.estadoId) || (patch.estadoId as number) <= 0) {
            throw new Error("estadoId inválido.");
            }
            updates.estadoId = patch.estadoId;
        }

        if (patch.entidadExternaId === null) {
            updates.entidadExternaId = null;
        } else if (patch.entidadExternaId !== undefined) {
            if (!Number.isInteger(patch.entidadExternaId) || (patch.entidadExternaId as number) <= 0) {
            throw new Error("entidadExternaId inválido.");
            }
            const exists = await this.port.existsEntidadExterna(patch.entidadExternaId as number);
            if (!exists) throw new Error("La entidad externa no existe.");
            updates.entidadExternaId = patch.entidadExternaId;
        }

        if (Object.keys(updates).length === 0) {
            throw new Error("Nada para actualizar.");
        }

        return this.port.updateReporte(id, updates);
    }

    async updateReporte(id: number, reporte: Partial<Reporte>): Promise<boolean> {
        const existing = await this.port.getReporteById(id);
        if (!existing) throw new Error("El reporte no existe");
        return await this.port.updateReporte(id, reporte);
    }

    async deleteReporte(id: number): Promise<boolean> {
        const existing = await this.port.getReporteById(id);
        if (!existing) throw new Error("El reporte no existe");
        return await this.port.deleteReporte(id);
    }

    async getAllReportes(): Promise<Reporte[]> {
        return await this.port.getAllReportes();
    }

    async getReporteById(id: number): Promise<Reporte | null> {
        return await this.port.getReporteById(id);
    }
}