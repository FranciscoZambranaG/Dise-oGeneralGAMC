/**
 * data.js — Datos de ejemplo para el diseño estático del Ecosistema
 * Herramienta GIS (GAMC). No representan datos reales.
 *
 * TODO: reemplazar cada colección por la respuesta real de su endpoint:
 *   ORDERS     -> GET /api/ordenes            (orders.service.js)
 *   INVENTORY  -> GET /api/inventario/stock    (inventory.service.js)
 *   MATERIAL_REQUESTS -> GET /api/inventario/solicitudes
 *   BOM        -> GET /api/inventario/bom
 *   MACHINES   -> GET /api/produccion/maquinas
 *   USERS      -> GET /api/usuarios  (solo lectura, fuente real: Keycloak)
 */

const GIS_DATA = {
  currentUser: {
    nombre: "Andrés Aliaga",
    correo: "andres.aliaga@cochabamba.bo",
    rol: "Administrador GIS",
    departamento: "Dirección de Tecnología",
    // TODO: reemplazar por claims reales del id_token vía auth.service.js
  },

  kpis: {
    ordenesActivas: { valor: 128, trend: "up", detalle: "+12 esta semana" },
    solicitudesPendientes: { valor: 34, trend: "down", detalle: "-5 vs. ayer" },
    maquinasOperativas: { valor: "18/21", trend: "flat", detalle: "3 en mantenimiento" },
    alertasSistema: { valor: 6, trend: "up", detalle: "2 críticas" },
  },

  orders: [
    { codigo: "ORD-2026-0142", descripcion: "Señalética vial Av. Blanco Galindo", solicitante: "D. Vialidad", fecha: "2026-08-20", cantidad: 40, estado: "pendiente" },
    { codigo: "ORD-2026-0141", descripcion: "Mobiliario urbano Parque Kanata", solicitante: "D. Espacios Públicos", fecha: "2026-08-19", cantidad: 12, estado: "en_proceso" },
    { codigo: "ORD-2026-0140", descripcion: "Levantamiento catastral Zona Sur", solicitante: "D. Catastro", fecha: "2026-08-18", cantidad: 1, estado: "completada" },
    { codigo: "ORD-2026-0139", descripcion: "Repuestos maquinaria pesada", solicitante: "D. Maquinaria", fecha: "2026-08-17", cantidad: 8, estado: "rechazada" },
    { codigo: "ORD-2026-0138", descripcion: "Impresión planos regulatorios", solicitante: "D. Planificación", fecha: "2026-08-16", cantidad: 25, estado: "completada" },
    { codigo: "ORD-2026-0137", descripcion: "Insumos mantenimiento vial", solicitante: "D. Vialidad", fecha: "2026-08-15", cantidad: 60, estado: "en_proceso" },
    { codigo: "ORD-2026-0136", descripcion: "Placas identificación predial", solicitante: "D. Catastro", fecha: "2026-08-14", cantidad: 150, estado: "pendiente" },
    { codigo: "ORD-2026-0135", descripcion: "Equipamiento topografía GPS", solicitante: "D. Catastro", fecha: "2026-08-12", cantidad: 3, estado: "completada" },
  ],

  inventory: [
    { sku: "MAT-0021", item: "Pintura vial termoplástica", categoria: "Señalética", stockActual: 340, stockMinimo: 150, unidad: "kg", estado: "ok" },
    { sku: "MAT-0034", item: "Placas de aluminio reflectivo", categoria: "Señalética", stockActual: 42, stockMinimo: 80, unidad: "und", estado: "bajo" },
    { sku: "MAT-0058", item: "Cemento Portland IP-30", categoria: "Construcción", stockActual: 12, stockMinimo: 50, unidad: "bolsa", estado: "critico" },
    { sku: "MAT-0067", item: "Postes metálicos galvanizados", categoria: "Mobiliario", stockActual: 96, stockMinimo: 40, unidad: "und", estado: "ok" },
    { sku: "MAT-0075", item: "Cable eléctrico THHN 12 AWG", categoria: "Electricidad", stockActual: 210, stockMinimo: 100, unidad: "m", estado: "ok" },
    { sku: "MAT-0089", item: "Filtro hidráulico maquinaria", categoria: "Repuestos", stockActual: 18, stockMinimo: 20, unidad: "und", estado: "bajo" },
    { sku: "MAT-0093", item: "Papel bond A1 planos", categoria: "Insumos oficina", stockActual: 5, stockMinimo: 15, unidad: "resma", estado: "critico" },
  ],

  materialRequests: [
    { codigo: "SOL-0512", item: "Placas de aluminio reflectivo", cantidad: 60, solicitante: "T. Señalética", estado: "pendiente" },
    { codigo: "SOL-0511", item: "Cemento Portland IP-30", cantidad: 80, solicitante: "T. Obras Civiles", estado: "aprobada" },
    { codigo: "SOL-0510", item: "Filtro hidráulico maquinaria", cantidad: 10, solicitante: "T. Mantenimiento", estado: "pendiente" },
    { codigo: "SOL-0509", item: "Papel bond A1 planos", cantidad: 20, solicitante: "D. Planificación", estado: "rechazada" },
  ],

  bom: [
    { producto: "Señal vertical tipo SR-1", componente: "Placa aluminio reflectivo", cantidad: 1, unidad: "und" },
    { producto: "Señal vertical tipo SR-1", componente: "Poste metálico galvanizado", cantidad: 1, unidad: "und" },
    { producto: "Señal vertical tipo SR-1", componente: "Pernos de fijación M10", cantidad: 4, unidad: "und" },
    { producto: "Base mobiliario urbano", componente: "Cemento Portland IP-30", cantidad: 2, unidad: "bolsa" },
    { producto: "Base mobiliario urbano", componente: "Malla electrosoldada", cantidad: 1, unidad: "m2" },
  ],

  productionKpis: {
    oeePromedio: { valor: "78%", detalle: "Meta: 85%" },
    produccionDia: { valor: "1,240", detalle: "unidades" },
    paradasRegistradas: { valor: 4, detalle: "1 crítica" },
    turnoActual: { valor: "Turno B", detalle: "14:00 – 22:00" },
  },

  machines: [
    { nombre: "Línea de corte CNC-1", linea: "Señalética", estado: "operativa", rendimiento: 92, turno: "Turno B", operador: "J. Mamani" },
    { nombre: "Prensa hidráulica H-3", linea: "Mobiliario urbano", estado: "operativa", rendimiento: 87, turno: "Turno B", operador: "R. Quispe" },
    { nombre: "Dobladora de placas D-2", linea: "Señalética", estado: "mantenimiento", rendimiento: 0, turno: "—", operador: "—" },
    { nombre: "Soldadora robótica SR-5", linea: "Estructuras", estado: "operativa", rendimiento: 74, turno: "Turno B", operador: "M. Fernández" },
    { nombre: "Compresor industrial C-1", linea: "Servicios auxiliares", estado: "detenida", rendimiento: 0, turno: "—", operador: "—" },
    { nombre: "Línea de pintura P-4", linea: "Señalética", estado: "operativa", rendimiento: 95, turno: "Turno B", operador: "L. Torrico" },
  ],

  users: [
    { usuario: "aaliaga", correo: "andres.aliaga@cochabamba.bo", rol: "Administrador GIS", estado: "activo", ultimoAcceso: "2026-08-24 08:12" },
    { usuario: "jmamani", correo: "j.mamani@cochabamba.bo", rol: "Operador Producción", estado: "activo", ultimoAcceso: "2026-08-24 07:45" },
    { usuario: "rquispe", correo: "r.quispe@cochabamba.bo", rol: "Operador Producción", estado: "activo", ultimoAcceso: "2026-08-23 19:30" },
    { usuario: "mfernandez", correo: "m.fernandez@cochabamba.bo", rol: "Supervisor Inventario", estado: "activo", ultimoAcceso: "2026-08-23 16:05" },
    { usuario: "ltorrico", correo: "l.torrico@cochabamba.bo", rol: "Analista Reportes", estado: "inactivo", ultimoAcceso: "2026-07-30 11:20" },
    { usuario: "pvargas", correo: "p.vargas@cochabamba.bo", rol: "Solicitante", estado: "activo", ultimoAcceso: "2026-08-22 09:50" },
  ],

  reportModules: [
    { modulo: "Producción", desc: "OEE, paradas, rendimiento por línea y turno." },
    { modulo: "Inventario", desc: "Stock, movimientos y solicitudes de materiales." },
    { modulo: "Órdenes", desc: "Órdenes por estado, solicitante y tiempos de atención." },
  ],
};

// Etiquetas legibles para estados usados en badges
const STATE_LABELS = {
  pendiente: "Pendiente",
  en_proceso: "En proceso",
  completada: "Completada",
  rechazada: "Rechazada",
  aprobada: "Aprobada",
  ok: "Normal",
  bajo: "Bajo stock",
  critico: "Crítico",
  operativa: "Operativa",
  mantenimiento: "Mantenimiento",
  detenida: "Detenida",
  activo: "Activo",
  inactivo: "Inactivo",
};

const STATE_BADGE_CLASS = {
  pendiente: "badge-warning",
  en_proceso: "badge-info",
  completada: "badge-success",
  rechazada: "badge-danger",
  aprobada: "badge-success",
  ok: "badge-success",
  bajo: "badge-warning",
  critico: "badge-danger",
  operativa: "badge-success",
  mantenimiento: "badge-warning",
  detenida: "badge-danger",
  activo: "badge-success",
  inactivo: "badge-neutral",
};
