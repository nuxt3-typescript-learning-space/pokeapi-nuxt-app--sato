import { fetchPokemonData, fetchPokemonDetails } from '@/services/api';
import type { Pokemon, PokemonResults, PokemonDetails, PokemonJapanese } from '@/types/pokemon';

type PokemonState = {
  pokemon: Pokemon | null;
  pokemonResults: PokemonResults[];
  pokemonDetails: PokemonDetails[];
  pokemonJapanese: PokemonJapanese[];
  isLoading: boolean;
  isError: boolean;
};

export const usePokemonStore = defineStore('pokemon', {
  state: (): PokemonState => ({
    pokemon: null as Pokemon | null,
    pokemonResults: [] as PokemonResults[],
    pokemonDetails: [] as PokemonDetails[],
    pokemonJapanese: [] as PokemonJapanese[],
    isLoading: false,
    isError: false,
  }),
  getters: {
    getPokemonJapaneseNames(): string[] {
      return this.pokemonJapanese
        .flatMap((pokemon) => pokemon.names)
        .filter((name) => name.language.name === 'ja')
        .map((name) => name.name);
    },
    getPokemonImageUrls(): string[] {
      return this.pokemonDetails.map(({ sprites }) => sprites.other['official-artwork'].front_default || '');
    },
    getPokemonIds(): number[] {
      return this.pokemonDetails.map(({ id }) => id);
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

        await Promise.all(
          this.pokemonResults.map(async (pokemon) => {
            const detail = await this.fetchPokemonDetails(pokemon.url);
            this.pokemonDetails.push(detail);
          }),
        );

        await Promise.all(
          this.pokemonDetails.map(async (pokemon) => {
            const detail = await this.fetchPokemonDetails(pokemon.species.url);
            this.pokemonJapanese.push(detail);
          }),
        );
      } catch (error) {
        this.setError(false);
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
