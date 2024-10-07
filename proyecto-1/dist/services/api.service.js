const apiURL = "https://rickandmortyapi.com/api/character";
// Función para manejar respuestas y errores del fetch
const handleFetchResponse = async (response) => {
    if (!response.ok) {
        throw new Error(`HTTP error, status: ${response.status}`);
    }
    return await response.json();
};
// Función para obtener personajes con paginación y opcionalmente filtrar por estado y nombre
const fetchCharacters = async (page, filters = {}) => {
    try {
        let url = `${apiURL}?page=${page}`;
        if (filters.status) {
            url += `&status=${filters.status}`;
        }
        if (filters.name) {
            url += `&name=${filters.name}`;
        }
        const response = await fetch(url);
        return handleFetchResponse(response);
    }
    catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
// Función para obtener todos los personajes
const fetchAllCharacters = async () => {
    try {
        const response = await fetch(apiURL);
        return handleFetchResponse(response);
    }
    catch (error) {
        console.error("Error fetching all characters:", error);
        throw error;
    }
};
export { fetchCharacters, fetchAllCharacters, apiURL };
