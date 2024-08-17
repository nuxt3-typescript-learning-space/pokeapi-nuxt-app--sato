export interface Pokemon {
  count: number;
  next: string;
  previous: string;
  results: PokemonResults[];
}

export interface PokemonResults {
  id: number;
  name: string;
  url: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  url: string;
  species: Species;
  names: names[];
  sprites: Sprites;
  types: PokemonTypes[];
}

export interface PokemonJapanese {
  name: string;
  names: Names[];
}

export interface Species {
  name: string;
  url: string;
}

export interface Names {
  language: {
    name: string;
    url: string;
  };
  name: string;
}

export interface Sprites {
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
}

export interface PokemonTypes {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}
