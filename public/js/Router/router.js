import { allRoutes, websiteName } from "./allRoutes.js";
import Route from "./Route.js";

// Route 404
const route404 = new Route("404", "Page introuvable", "/pages/404.html");

// Récupérer la route correspondant à l'URL
const getRouteByUrl = (url) => {
  const route = allRoutes.find(r => r.url === url);
  return route ?? route404;
};

// Fonction pour charger le contenu d'une page
const LoadContentPage = async () => {
  const path = window.location.pathname;
  const actualRoute = getRouteByUrl(path);

  try {
    // Fetch et injection du HTML
    const html = await fetch(actualRoute.pathHtml).then(r => r.text());
    document.getElementById("main-page").innerHTML = html;

    // --- Réinitialisation des composants Bootstrap ---
    // Modals
    const modalElements = document.querySelectorAll('.modal');
    modalElements.forEach(el => new bootstrap.Modal(el));

    // Tooltips
    const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipElements.forEach(el => new bootstrap.Tooltip(el));

    // Dropdowns
    const dropdownElements = document.querySelectorAll('.dropdown-toggle');
    dropdownElements.forEach(el => new bootstrap.Dropdown(el));
    // --------------------------------------------

    // Injection des scripts spécifiques à la page si défini
    if (actualRoute.pathJS) {
      const scriptTag = document.createElement("script");
      scriptTag.src = actualRoute.pathJS;
      scriptTag.type = "module";
      document.body.appendChild(scriptTag);
    }

    // Changement du titre
    document.title = `${actualRoute.title} - ${websiteName}`;

    // Réattacher les listeners sur les liens injectés
    document.querySelectorAll("a[data-link]").forEach(link => {
      link.addEventListener("click", routeEvent);
    });

  } catch (err) {
    console.error("Erreur lors du chargement de la page :", err);
  }
};

// Gestion du clic sur les liens
const routeEvent = (event) => {
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  LoadContentPage();
};

// Gestion du bouton retour/avant navigateur
window.onpopstate = LoadContentPage;

// Initialisation au chargement de la page
LoadContentPage();

// Ajout des listeners sur les liens initiaux
document.querySelectorAll("a[data-link]").forEach(link => {
  link.addEventListener("click", routeEvent);
});