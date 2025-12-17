import { allRoutes, websiteName } from "./allRoutes.js";

// Création d'une route pour la page 404
const route404 = {
  url: "404",
  title: "Page introuvable",
  pathHtml: "/pages/404.html",
  pathJS: ""
};

// Récupère la route correspondant à une URL
const getRouteByUrl = (url) => {
  const route = allRoutes.find(r => r.url === url);
  return route || route404;
};

// Charge le contenu de la page
const loadContentPage = async () => {
  const path = window.location.pathname;
  const actualRoute = getRouteByUrl(path);

  // Charger le HTML
  const html = await fetch(actualRoute.pathHtml).then(res => res.text());
  const mainPage = document.getElementById("main-page");
  mainPage.innerHTML = html;

  // Supprimer les anciens scripts injectés
  document.querySelectorAll("script[data-route]").forEach(s => s.remove());

  // Charger le JS si nécessaire
  if (actualRoute.pathJS) {
    const scriptTag = document.createElement("script");
    scriptTag.src = actualRoute.pathJS;
    scriptTag.type = "text/javascript";
    scriptTag.setAttribute("data-route", "true"); // marque pour suppression
    document.body.appendChild(scriptTag);
  }

  // Mettre à jour le titre
  document.title = `${actualRoute.title} - ${websiteName}`;
};

// Gérer les clics sur les liens
const routeEvent = (event) => {
  const link = event.target.closest("a[data-link]");
  if (!link) return;

  event.preventDefault();
  const href = link.getAttribute("href");

  window.history.pushState({}, "", href);
  loadContentPage();
};

// Initialisation
window.addEventListener("popstate", loadContentPage);
document.addEventListener("click", routeEvent);
window.addEventListener("DOMContentLoaded", loadContentPage);