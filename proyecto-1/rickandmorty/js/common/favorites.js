import { alertSwal } from "../common/alert.js";
import { getFavorites, favoritesKey } from "../../data/favorites.data.js";

const reloadFavorites = new Event("reloadFavorites");

// Guardar favoritos en localStorage
const saveFavorites = (favorites) => {
  localStorage.setItem(favoritesKey, JSON.stringify(favorites));
};

// Verificar si un personaje ya es favorito
const isFavorite = (character) => {
  const favorites = getFavorites();
  return favorites.some((fav) => fav.id === character.id);
};
// Alternar el estado de favorito para un personaje
const toggleFavorite = (character) => {
  let favorites = getFavorites();

  if (isFavorite(character)) {
    favorites = favorites.filter((fav) => fav.id !== character.id);
  } else {
    favorites.push(character);
  }

  saveFavorites(favorites);
};
const handleFavoriteElement = async (character, favoriteButton) => {
  const isFavoriteCharacter = isFavorite(character);
  const alertMessage = isFavoriteCharacter
    ? "Se ha quitado de Favoritos!"
    : "Se ha agregado a Favoritos!";

  const alert = await alertSwal(alertMessage);

  toggleFavorite(character);
  favoriteButton.classList.toggle("active");

  if (isFavoriteCharacter && alert.isConfirmed) {
    dispatchEvent(reloadFavorites);
  }
};

export { saveFavorites, toggleFavorite, isFavorite, handleFavoriteElement };

//COMMIT: ESTRUCTURACION CARPETA
