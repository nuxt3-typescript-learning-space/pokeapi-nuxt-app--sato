import { fetchPokemonData, fetchPokemonDetails, fetchPokemonSpeciesData } from '@/services/api';
import type { Pokemon, PokemonResults, PokemonDetails, PokemonSpecies } from '@/types/pokemon';

type PokemonState = {
  pokemon: Pokemon | null;
  pokemonResults: PokemonResults[];
  pokemonDetails: PokemonDetails[];
  pokemonSpecies: PokemonSpecies[];
  isLoading: boolean;
  isError: boolean;
  offset: number;
};

export const usePokemonStore = defineStore('pokemon', {
  state: (): PokemonState => ({
    pokemon: null as Pokemon | null,
    pokemonResults: [] as PokemonResults[],
    pokemonDetails: [] as PokemonDetails[],
    pokemonSpecies: [] as PokemonSpecies[],
    isLoading: false,
    isError: false,
    offset: 0,
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
    getPokemonTypes(): string[][] {
      return this.pokemonDetails.map(({ types }) => types.map(({ type: { name } }) => name));
    },
    getPokemonFlavorTexts(): string[] {
      return this.pokemonSpecies
        .flatMap(({ flavor_text_entries }) => flavor_text_entries)
        .filter(({ language }) => language.name === 'ja')
        .map(({ flavor_text }) => flavor_text);
    },
    getPokemonStats(): Record<string, number>[] {
      const statNameMapping: Record<string, string> = {
        hp: 'HP',
        attack: 'こうげき',
        defense: 'ぼうぎょ',
        'special-attack': 'とくこう',
        'special-defense': 'とくぼう',
        speed: 'すばやさ',
      };

      function convertStatNames(stats: Record<string, number>): Record<string, number> {
        const convertedStats: Record<string, number> = {};
        for (const [key, value] of Object.entries(stats)) {
          const japaneseKey = statNameMapping[key];
          if (japaneseKey) {
            convertedStats[japaneseKey] = value;
          }
        }
        return convertedStats;
      }

      return this.pokemonDetails.map(({ stats }) =>
        convertStatNames(
          stats.reduce(
            (acc, { stat: { name }, base_stat }) => {
              acc[name] = base_stat;
              return acc;
            },
            {} as Record<string, number>,
          ),
        ),
      );
    },
    getPokemonCries(): string[] {
      return this.pokemonDetails.map(
        ({ id }) => `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`,
      );
    },
  },
  actions: {
    setLoading(isLoading: boolean): void {
      this.isLoading = isLoading;
    },
    setError(isError: boolean): void {
      this.isError = isError;
    },
    async fetchPokemonData() {
      if (this.pokemonDetails.length > 0) {
        return;
      }

      this.setLoading(true);
      try {
        const response = await fetchPokemonData(this.offset);
        this.pokemon = response;
        this.pokemonResults = response.results;

        for (const pokemon of this.pokemonResults) {
          const pokemonDetail = await fetchPokemonDetails(pokemon.url);
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
    async fetchMorePokemonData() {
      this.setLoading(true);
      try {
        this.offset += 20;
        const response = await fetchPokemonData(this.offset);
        this.pokemonResults.push(...response.results);

        for (const pokemon of response.results) {
          const pokemonDetail = await fetchPokemonDetails(pokemon.url);
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
  },
});
