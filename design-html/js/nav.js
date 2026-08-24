/**
 * nav.js — Navegación tipo SPA sin framework: muestra/oculta <section>,
 * maneja el sidebar responsive y simula el paso login -> app shell.
 *
 * TODO: el botón "Iniciar sesión con Keycloak" debe iniciar el
 * Authorization Code Flow real (redirect a /realms/{realm}/protocol/openid-connect/auth)
 * vía auth.service.js. Aquí solo se simula la transición visual.
 */

document.addEventListener("DOMContentLoaded", () => {
  const loginScreen = document.getElementById("login-screen");
  const appShell = document.getElementById("app-shell");
  const loginBtn = document.getElementById("btn-keycloak-login");
  const loginLoading = document.getElementById("login-loading");
  const logoutBtn = document.getElementById("btn-logout");

  const sidebar = document.getElementById("sidebar");
  const sidebarScrim = document.getElementById("sidebar-scrim");
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const hamburger = document.getElementById("hamburger-btn");
  const pageTitle = document.getElementById("page-title");

  const navLinks = Array.from(document.querySelectorAll(".nav-link[data-view]"));
  const views = Array.from(document.querySelectorAll(".view"));

  function goToApp() {
    loginScreen.style.display = "none";
    appShell.classList.add("is-active");
    appShell.setAttribute("aria-hidden", "false");
    loginScreen.setAttribute("aria-hidden", "true");
  }

  function goToLogin() {
    appShell.classList.remove("is-active");
    appShell.setAttribute("aria-hidden", "true");
    loginScreen.style.display = "flex";
    loginScreen.setAttribute("aria-hidden", "false");
    loginLoading?.classList.remove("is-active");
    if (loginBtn) loginBtn.disabled = false;
  }

  loginBtn?.addEventListener("click", () => {
    // TODO: reemplazar por auth.service.js -> keycloak.login()
    // (redirect real a la página de login de Keycloak, Authorization Code Flow)
    loginBtn.disabled = true;
    loginLoading?.classList.add("is-active");
    window.setTimeout(goToApp, 700);
  });

  logoutBtn?.addEventListener("click", () => {
    // TODO: reemplazar por auth.service.js -> keycloak.logout()
    goToLogin();
  });

  function setActiveView(viewId) {
    views.forEach((v) => v.classList.toggle("is-active", v.id === viewId));
    navLinks.forEach((link) => {
      const isCurrent = link.dataset.view === viewId;
      if (isCurrent) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
    const activeLink = navLinks.find((l) => l.dataset.view === viewId);
    if (activeLink && pageTitle) {
      pageTitle.textContent = activeLink.dataset.title || activeLink.textContent.trim();
    }
    closeMobileSidebar();
    document.getElementById("content-scroll")?.scrollTo({ top: 0, behavior: "instant" });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => setActiveView(link.dataset.view));
  });

  // permite que "accesos rápidos" del dashboard y otros botones internos
  // naveguen reusando el mismo mecanismo (data-goto-view)
  document.querySelectorAll("[data-goto-view]").forEach((el) => {
    el.addEventListener("click", () => setActiveView(el.dataset.gotoView));
  });

  function openMobileSidebar() {
    sidebar?.classList.add("is-open");
    sidebarScrim?.classList.add("is-visible");
    hamburger?.setAttribute("aria-expanded", "true");
  }

  function closeMobileSidebar() {
    sidebar?.classList.remove("is-open");
    sidebarScrim?.classList.remove("is-visible");
    hamburger?.setAttribute("aria-expanded", "false");
  }

  hamburger?.addEventListener("click", () => {
    const isOpen = sidebar?.classList.contains("is-open");
    if (isOpen) closeMobileSidebar();
    else openMobileSidebar();
  });

  sidebarScrim?.addEventListener("click", closeMobileSidebar);

  // ---- Colapsar / expandir sidebar (escritorio) -----------------------------
  sidebarToggle?.addEventListener("click", () => {
    const collapsed = sidebar?.classList.toggle("is-collapsed");
    sidebarToggle.setAttribute("aria-expanded", String(!collapsed));
    sidebarToggle.setAttribute("aria-label", collapsed ? "Expandir menú" : "Contraer menú");
  });

  // ---- Tabs genéricas (usadas en Inventario/BOM) ---------------------------
  document.querySelectorAll("[data-tabs]").forEach((tabGroup) => {
    const buttons = Array.from(tabGroup.querySelectorAll(".tab-btn"));
    const panelsWrap = document.getElementById(tabGroup.dataset.panelsTarget);
    const panels = panelsWrap ? Array.from(panelsWrap.querySelectorAll(".tab-panel")) : [];

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.setAttribute("aria-selected", String(b === btn)));
        panels.forEach((p) => p.classList.toggle("is-active", p.id === btn.dataset.tabTarget));
      });
    });
  });

  // ---- Modales (vista de diseño, sin envío real) ----------------------------
  function openModal(modal) {
    modal.removeAttribute("hidden");
    modal.querySelector("input, select, textarea, button")?.focus();
  }

  function closeModal(modal) {
    modal.setAttribute("hidden", "");
  }

  document.querySelectorAll("[data-open-modal]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const modal = document.getElementById(trigger.dataset.openModal);
      if (modal) openModal(modal);
    });
  });

  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal(overlay);
    });
    overlay.querySelectorAll("[data-close-modal]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        closeModal(overlay);
      });
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    document.querySelectorAll(".modal-overlay:not([hidden])").forEach(closeModal);
  });

  // ---- Formulario de reporte personalizado (solo visual) -------------------
  const reportForm = document.getElementById("report-form");
  reportForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    // TODO: reemplazar por reports.service.js -> generarReporte(payload)
    const feedback = document.getElementById("report-feedback");
    if (feedback) {
      feedback.textContent = "Vista previa de diseño: aquí se mostraría la confirmación de generación del reporte.";
      feedback.style.display = "block";
    }
  });

  // Estado inicial: login visible
  loginScreen.style.display = "flex";
  appShell.setAttribute("aria-hidden", "true");
});
