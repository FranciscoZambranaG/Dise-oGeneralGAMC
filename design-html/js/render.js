/**
 * render.js — Pinta las tablas y grids de cada pantalla a partir de GIS_DATA
 * (data.js). Solo diseño: no hay llamadas de red ni persistencia real.
 */

function badge(estado) {
  const label = STATE_LABELS[estado] || estado;
  const cls = STATE_BADGE_CLASS[estado] || "badge-neutral";
  return `<span class="badge ${cls}">${label}</span>`;
}

function fmtFecha(iso) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function renderOrdersTable(rows) {
  const tbody = document.getElementById("orders-tbody");
  if (!tbody) return;
  tbody.innerHTML = rows
    .map(
      (o) => `
    <tr>
      <td class="cell-strong">${o.codigo}</td>
      <td>${o.descripcion}</td>
      <td class="cell-muted">${o.solicitante}</td>
      <td class="cell-muted">${fmtFecha(o.fecha)}</td>
      <td class="cell-muted">${o.cantidad}</td>
      <td>${badge(o.estado)}</td>
    </tr>`
    )
    .join("");
}

function renderInventoryTable() {
  const tbody = document.getElementById("inventory-tbody");
  if (!tbody) return;
  tbody.innerHTML = GIS_DATA.inventory
    .map((i) => {
      const rowClass = i.estado === "critico" ? "row-alert" : i.estado === "bajo" ? "row-warning" : "";
      return `
    <tr class="${rowClass}">
      <td class="cell-strong">${i.sku}</td>
      <td>${i.item}</td>
      <td class="cell-muted">${i.categoria}</td>
      <td class="cell-muted">${i.stockActual} ${i.unidad}</td>
      <td class="cell-muted">${i.stockMinimo} ${i.unidad}</td>
      <td>${badge(i.estado)}</td>
    </tr>`;
    })
    .join("");
}

function renderMaterialRequestsTable() {
  const tbody = document.getElementById("requests-tbody");
  if (!tbody) return;
  tbody.innerHTML = GIS_DATA.materialRequests
    .map(
      (r) => `
    <tr>
      <td class="cell-strong">${r.codigo}</td>
      <td>${r.item}</td>
      <td class="cell-muted">${r.cantidad}</td>
      <td class="cell-muted">${r.solicitante}</td>
      <td>${badge(r.estado)}</td>
    </tr>`
    )
    .join("");
}

function renderBomTable() {
  const tbody = document.getElementById("bom-tbody");
  if (!tbody) return;
  tbody.innerHTML = GIS_DATA.bom
    .map(
      (b) => `
    <tr>
      <td class="cell-strong">${b.producto}</td>
      <td>${b.componente}</td>
      <td class="cell-muted">${b.cantidad}</td>
      <td class="cell-muted">${b.unidad}</td>
    </tr>`
    )
    .join("");
}

function renderMachines() {
  const grid = document.getElementById("machines-grid");
  if (!grid) return;
  grid.innerHTML = GIS_DATA.machines
    .map((m) => {
      const barClass = m.rendimiento >= 85 ? "" : m.rendimiento >= 50 ? "warning" : "danger";
      return `
    <article class="machine-card glass-soft">
      <div class="machine-card-top">
        <div>
          <div class="machine-name">${m.nombre}</div>
          <div class="machine-meta">${m.linea}</div>
        </div>
        ${badge(m.estado)}
      </div>
      <div>
        <div class="machine-progress-row">
          <span>Rendimiento</span>
          <span class="cell-strong">${m.rendimiento}%</span>
        </div>
        <div class="progress" role="progressbar" aria-valuenow="${m.rendimiento}" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar ${barClass}" style="width:${m.rendimiento}%"></div>
        </div>
      </div>
      <div class="machine-meta">Turno: ${m.turno} · Operador: ${m.operador}</div>
    </article>`;
    })
    .join("");
}

function renderUsersTable() {
  const tbody = document.getElementById("users-tbody");
  if (!tbody) return;
  tbody.innerHTML = GIS_DATA.users
    .map(
      (u) => `
    <tr>
      <td class="cell-strong">${u.usuario}</td>
      <td class="cell-muted">${u.correo}</td>
      <td><span class="badge badge-info">${u.rol}</span></td>
      <td>${badge(u.estado)}</td>
      <td class="cell-muted">${u.ultimoAcceso}</td>
    </tr>`
    )
    .join("");
}

function renderProfile() {
  const u = GIS_DATA.currentUser;
  const nameEls = document.querySelectorAll("[data-user-name]");
  const emailEls = document.querySelectorAll("[data-user-email]");
  const roleEls = document.querySelectorAll("[data-user-role]");
  const deptEls = document.querySelectorAll("[data-user-dept]");
  nameEls.forEach((el) => (el.textContent = u.nombre));
  emailEls.forEach((el) => (el.textContent = u.correo));
  roleEls.forEach((el) => (el.textContent = u.rol));
  deptEls.forEach((el) => (el.textContent = u.departamento));
}

document.addEventListener("DOMContentLoaded", () => {
  renderOrdersTable(GIS_DATA.orders);
  renderInventoryTable();
  renderMaterialRequestsTable();
  renderBomTable();
  renderMachines();
  renderUsersTable();
  renderProfile();

  // Filtro de estado + búsqueda en Órdenes (solo filtra el arreglo local, sin backend)
  const searchInput = document.getElementById("orders-search");
  const statusFilter = document.getElementById("orders-status-filter");

  function applyOrdersFilter() {
    const term = (searchInput?.value || "").toLowerCase().trim();
    const status = statusFilter?.value || "todos";
    const filtered = GIS_DATA.orders.filter((o) => {
      const matchesTerm =
        !term ||
        o.codigo.toLowerCase().includes(term) ||
        o.descripcion.toLowerCase().includes(term) ||
        o.solicitante.toLowerCase().includes(term);
      const matchesStatus = status === "todos" || o.estado === status;
      return matchesTerm && matchesStatus;
    });
    renderOrdersTable(filtered);
  }

  searchInput?.addEventListener("input", applyOrdersFilter);
  statusFilter?.addEventListener("change", applyOrdersFilter);
});
