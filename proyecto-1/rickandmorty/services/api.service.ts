const apiURL = "https://rickandmortyapi.com/api/character";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

interface ApiResponse {
  info: Info;
  results: Character[];
}

interface FetchFilters {
  status?: string;
  name?: string;
}
// Función para manejar respuestas y errores del fetch
const handleFetchResponse = async (
  response: Response
): Promise<ApiResponse> => {
  if (!response.ok) {
    throw new Error(`HTTP error, status: ${response.status}`);
  }
  return await response.json();
};

// Función para obtener personajes con paginación y opcionalmente filtrar por estado y nombre
const fetchCharacters = async (
  page: number,
  filters: FetchFilters = {}
): Promise<ApiResponse> => {
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
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Función para obtener todos los personajes
const fetchAllCharacters = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch(apiURL);
    return handleFetchResponse(response);
  } catch (error) {
    console.error("Error fetching all characters:", error);
    throw error;
  }
};

export { fetchCharacters, fetchAllCharacters, apiURL };
