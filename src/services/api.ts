import { API_BASE_URL } from '@/constants/pokemon';
import type { Pokemon, PokemonDetails, PokemonSpecies, PokemonTypes } from '@/types/pokemon';

export async function fetchPokemonData(offset: number): Promise<Pokemon> {
  const response = await $fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
  return response as Pokemon;
}

export async function fetchPokemonDetails(url: string): Promise<PokemonDetails> {
  const response = await $fetch(url);
  return response as PokemonDetails;
}

export async function fetchPokemonSpeciesData(id: number): Promise<PokemonSpecies> {
  const response = await $fetch(`${API_BASE_URL.SPECIES}${id}`);
  return response as PokemonSpecies;
}

export async function fetchPokemonTypeData(id: number): Promise<PokemonTypes> {
  const response = await $fetch(`${API_BASE_URL.TYPE}${id}`);
  return response as PokemonTypes;
}
