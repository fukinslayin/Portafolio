//favorites.page.js

import { getFavorites } from "../../data/favorites.data.js";
import { createCharacterElement } from "../../js/common/character.card.js";
import {
  updatePageInfo,
  updateButtons,
} from "../../js/common/buttons.and.pageinfo.js";

const favoritesContainer = document.getElementById("characters");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const pageInfo = document.getElementById("page-info");

let currentPage = 1;
let totalPages = 1;
const charactersPerPage = 6;

const displayFavorites = (page) => {
  const favorites = getFavorites();
  favoritesContainer.innerHTML = "";

  //calcula el total de paginas
  totalPages = Math.ceil(favorites.length / charactersPerPage);
  if (totalPages === 0) {
    favoritesContainer.innerHTML = "<p>No hay personajes favoritos.</p>";
    pageInfo.textContent = "";
    return;
  }

  //calcula el rango de personajes a mostrar
  const start = (page - 1) * charactersPerPage;
  const end = start + charactersPerPage;
  const favoritesToShow = favorites.slice(start, end);

  favoritesToShow.forEach((character) => {
    const characterElement = createCharacterElement(character);
    favoritesContainer.appendChild(characterElement);
  });

  updatePageInfo(currentPage, totalPages, pageInfo);
  updateButtons(currentPage, totalPages, prevButton, nextButton);
};

//manejar la paginación
prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayFavorites(currentPage);
  }
});

nextButton.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    displayFavorites(currentPage);
  }
});

window.addEventListener("reloadFavorites", (e) => {
  e.preventDefault();
  displayFavorites(currentPage);
});

displayFavorites(currentPage);
