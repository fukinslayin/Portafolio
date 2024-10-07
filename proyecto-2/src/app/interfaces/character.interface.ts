export interface Character {
  id: number;
  name: string;
  mass: string;
  height: string;
  gender: string;
  created: string;
  birth_year: string;
  url: string;
  isFavorite?: boolean;
}

export interface CharacterUrl {
  url: string;
  charactersId?: string;
}
