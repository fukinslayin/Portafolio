import { Character } from './character.interface';

export interface ApiResponse {
  count: number;
  results: Character[];
}
