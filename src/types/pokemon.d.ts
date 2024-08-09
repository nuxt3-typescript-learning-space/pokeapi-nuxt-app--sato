import type { types } from 'util';

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
  species: species;
  names: names[];
  sprites: sprites;
  types: types[];
}

export interface PokemonJapanese {
  name: string;
  names: names[];
}

export interface species {
  name: string;
  url: string;
}

export interface names {
  language: {
    name: string;
    url: string;
  };
  name: string;
}

export interface sprites {
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
}

export interface types {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}
