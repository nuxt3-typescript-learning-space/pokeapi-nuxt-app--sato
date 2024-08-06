import { POKEMON_API_URL } from '@/constants/constant';
import type { PokemonDataResponse } from '@/types/pokemon';

export const fetchPokemonData = async () => {
  const response = await $fetch(POKEMON_API_URL);
  return response as Promise<PokemonDataResponse>;
};
