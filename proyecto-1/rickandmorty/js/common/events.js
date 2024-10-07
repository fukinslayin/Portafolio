import { toggleFavorite, isFavorite } from "../common/favorites.js";

const addFavoriteButtonEvents = (characters) => {
  characters.forEach((character) => {
    const button = document.querySelector(
      `.favorite-button[data-id="${character.id}"]`
    );
    if (button) {
      updateFavoriteButtonState(character, button);
      button.addEventListener("click", () => {
        toggleFavorite(character);
        updateFavoriteButtonState(character, button);
      });
    }
  });
};

// Actualizar el estado del botón de favoritos
const updateFavoriteButtonState = (character, button) => {
  if (isFavorite(character)) {
    button.classList.add("active");
  } else {
    button.classList.remove("active");
  }
};

export { addFavoriteButtonEvents, updateFavoriteButtonState };
