import { fetchPokemonData, fetchPokemonDetails, fetchPokemonSpeciesData } from '@/services/api';
import type { Pokemon, PokemonResults, PokemonDetails, PokemonSpecies } from '@/types/pokemon';

type PokemonState = {
  pokemon: Pokemon | null;
  pokemonResults: PokemonResults[];
  pokemonDetails: PokemonDetails[];
  pokemonSpecies: PokemonSpecies[];
  isLoading: boolean;
  isError: boolean;
};

export const usePokemonStore = defineStore('pokemon', {
  state: (): PokemonState => ({
    pokemon: null as Pokemon | null,
    pokemonResults: [] as PokemonResults[],
    pokemonDetails: [] as PokemonDetails[],
    pokemonSpecies: [] as PokemonSpecies[], // ポケモン個別のデータ
    isLoading: false,
    isError: false,
  }),
  getters: {
    getPokemonIds(): number[] {
      return this.pokemonDetails.map(({ id }) => id);
    },
    getPokemonJapaneseNames(): string[] {
      return this.pokemonSpecies
        .flatMap(({ names }) => names)
        .filter(({ language }) => language.name === 'ja')
        .map(({ name }) => name);
    },
    getPokemonImageUrls(): string[] {
      return this.pokemonDetails.map(({ sprites }) => sprites.other['official-artwork'].front_default || '');
    },
    getPokemonTypes: (state) => state.pokemonDetails.map((pokemon) => pokemon.types),
  },
  actions: {
    setLoading(isLoading: boolean): void {
      this.isLoading = isLoading;
    },
    setError(isError: boolean): void {
      this.isError = isError;
    },
    async fetchPokemonData() {
      this.setLoading(true);
      try {
        const response = await fetchPokemonData();
        this.pokemon = response;
        this.pokemonResults = response.results;

        for (const pokemon of this.pokemonResults) {
          const pokemonDetail = await this.fetchPokemonDetails(pokemon.url);
          this.pokemonDetails.push(pokemonDetail);

          const pokemonId = pokemonDetail.id;
          const speciesDetail = await fetchPokemonSpeciesData(pokemonId);
          this.pokemonSpecies.push(speciesDetail);
        }
      } catch (error) {
        this.setError(true);
      } finally {
        this.setLoading(false);
      }
    },
    async fetchPokemonDetails(url: string): Promise<PokemonDetails> {
      const detail = await fetchPokemonDetails(url);
      return detail;
    },
    async fetchPokemonJapaneseData(url: string): Promise<PokemonDetails> {
      const detail = await fetchPokemonDetails(url);
      return detail;
    },
  },
});
