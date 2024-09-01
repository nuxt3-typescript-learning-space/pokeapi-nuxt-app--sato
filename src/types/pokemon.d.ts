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
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
}

export interface PokemonSpecies {
  name: string;
  names: Names[];
  flavor_text_entries: FlavorTextEntries[];
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
