import { API_BASE_URL } from '@/constants/pokemon';
import type { Pokemon, PokemonDetails, species, types } from '@/types/pokemon';

export async function fetchPokemonData(): Promise<Pokemon> {
  const response = await $fetch(API_BASE_URL.POKEMON);
  return response as Pokemon;
}

export async function fetchPokemonDetails(url: string): Promise<PokemonDetails> {
  const response = await $fetch(url);
  return response as PokemonDetails;
}

export async function fetchPokemonSpeciesData(id: number): Promise<species> {
  const response = await $fetch(`${API_BASE_URL.SPECIES}${id}`);
  return response as species;
}

export async function fetchPokemonTypeData(id: number): Promise<types> {
  const response = await $fetch(`${API_BASE_URL.TYPE}${id}`);
  return response as types;
}
