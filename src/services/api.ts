import { API_BASE_URL } from '@/constants/pokemon';
import type { Pokemon, PokemonDetails, Species, PokemonTypes } from '@/types/pokemon';

export async function fetchPokemonData(): Promise<Pokemon> {
  const response = await $fetch(API_BASE_URL.POKEMON);
  return response as Pokemon;
}

export async function fetchPokemonDetails(url: string): Promise<PokemonDetails> {
  const response = await $fetch(url);
  return response as PokemonDetails;
}

export async function fetchPokemonSpeciesData(id: number): Promise<Species> {
  const response = await $fetch(`${API_BASE_URL.SPECIES}${id}`);
  return response as Species;
}

export async function fetchPokemonTypeData(id: number): Promise<PokemonTypes> {
  const response = await $fetch(`${API_BASE_URL.TYPE}${id}`);
  return response as PokemonTypes;
}
