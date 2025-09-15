import { Router } from "express";

import EntidadExternaRoutes from "./EntidadExternaRoutes";
import LocalidadRoutes from "./LocalidadRoutes";
import ModeradorRoutes from "./ModeradorRoutes";
import ReporteRoutes from "./ReporteRoutes";
import SectorRoutes from "./SectorRoutes";
import TipoReporteRoutes from "./TipoReporteRoutes";
import UserRoutes from "./UserRoutes";
import NivelIncidenciaRoutes from "./NivelIncidenciaRoutes";
import EstadosRoutes from "./EstadosRoutes";

const router = Router();

router.use(EntidadExternaRoutes);
router.use(LocalidadRoutes);
router.use(ModeradorRoutes);
router.use(ReporteRoutes);
router.use(SectorRoutes);
router.use(TipoReporteRoutes);
router.use(UserRoutes);
router.use(NivelIncidenciaRoutes);
router.use(EstadosRoutes);

export default router;