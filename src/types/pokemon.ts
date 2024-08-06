export interface PokemonDataResponse {
  count: number;
  next: string;
  previous: string;
  results: PokemonResults[];
}

export interface PokemonResults {
  name: string;
  url: string;
}
