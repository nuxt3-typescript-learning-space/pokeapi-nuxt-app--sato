export interface PokemonData {
  count: number;
  next?: string;
  previous?: string;
  results: PokemonResults[];
}

export interface PokemonResults {
  name: string;
  url: string;
}

export interface PokemonDetailData {
  id: number;
  height: number;
  weight: number;
  cries: Cries;
  species: Species;
  sprites: Sprites;
}

export interface Cries {
  latest: string;
  legacy: string;
}

export interface Species {
  name: string;
  url: string;
}

export interface Sprites {
  front_default: string;
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
}

export interface PokemonJapaneseData {
  flavor_text_entries: FlavorTextEntry[];
  genera: Genera[];
  names: Name[];
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: Language;
}

export interface Genera {
  genus: string;
  language: Language;
}

export interface Name {
  language: Language;
  name: string;
}

export interface Language {
  name: string;
}
