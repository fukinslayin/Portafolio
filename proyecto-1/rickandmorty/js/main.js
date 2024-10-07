import {
  loadCharacters,
  loadAllCharacters,
  filterCharacters,
  getCurrentPage,
  getTotalPages,
} from "./common/items.and.validations.js";

const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const searchBox = document.getElementById("search-box");
const filterStatus = document.querySelector("#status");

let currentStatus = "";
let currentQuery = "";

// Evento para el campo de búsqueda
searchBox.addEventListener("input", () => {
  currentQuery = searchBox.value;
  filterCharacters(currentQuery, currentStatus);
});

// Evento para el filtro de estado
filterStatus.addEventListener("change", () => {
  currentStatus = filterStatus.value;
  filterCharacters(currentQuery, currentStatus);
});

// Evento para el botón de siguiente página
nextButton.addEventListener("click", () => {
  if (getCurrentPage() < getTotalPages()) {
    loadCharacters(getCurrentPage() + 1, {
      status: currentStatus,
      name: currentQuery,
    });
  }
});

// Evento para el botón de página anterior
prevButton.addEventListener("click", () => {
  if (getCurrentPage() > 1) {
    loadCharacters(getCurrentPage() - 1, {
      status: currentStatus,
      name: currentQuery,
    });
  }
});

(async () => {
  await loadAllCharacters(); // Espera a que se carguen todos los personajes
  loadCharacters(getCurrentPage(), {
    status: currentStatus,
    name: currentQuery,
  }); // Luego, carga la primera página de personajes
})();
