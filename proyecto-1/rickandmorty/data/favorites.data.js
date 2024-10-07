export const favoritesKey = "favorites";

//obtener personajes de favoritos
export const getFavorites = () => {
  return JSON.parse(localStorage.getItem(favoritesKey)) || [];
};
