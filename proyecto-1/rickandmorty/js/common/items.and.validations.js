import {
  fetchCharacters,
  fetchAllCharacters,
} from "../../../dist/services/api.service.js";
import { displayCharacters } from "./character.card.js";
import { addFavoriteButtonEvents } from "../common/events.js";
import {
  updateButtons,
  updatePageInfo,
} from "../common/buttons.and.pageinfo.js";

const pageInfo = document.getElementById("page-info");
const charactersDiv = document.getElementById("characters");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

let currentPage = 1;
let totalPages = 1;
let currentStatus = ""; //declarar variables globales para almacenar el estado del filtro
let currentQuery = "";

const loadCharacters = async (page, filters = {}) => {
  try {
    const data = await fetchCharacters(page, filters);
    displayCharacters(data.results, charactersDiv);
    addFavoriteButtonEvents(data.results);
    currentPage = page;
    totalPages = data.info.pages;
    updateButtons(currentPage, totalPages, prevButton, nextButton);
    updatePageInfo(currentPage, totalPages, pageInfo);
  } catch (error) {
    console.error("Characters Loading Error", error);
  }
};
const loadAllCharacters = async () => {
  try {
    const data = await fetchAllCharacters();
    displayCharacters(data.results, charactersDiv);
    addFavoriteButtonEvents(data.results);
    currentPage = 1;
    totalPages = data.info.pages;
    updateButtons(currentPage, totalPages, prevButton, nextButton);
    updatePageInfo(currentPage, totalPages, pageInfo);
  } catch (error) {
    console.error("Error loading all characters:", error);
  }
};

const filterCharacters = (query, status) => {
  currentQuery = query;
  currentStatus = status;
  loadCharacters(currentPage, { status, name: currentQuery });
};

const getCurrentPage = () => currentPage;
const getTotalPages = () => totalPages;

export {
  loadCharacters,
  loadAllCharacters,
  filterCharacters,
  getCurrentPage,
  getTotalPages,
};
