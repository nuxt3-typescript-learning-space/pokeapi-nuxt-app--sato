import { BASE_URL } from '@/constants/constant';
import { fetchPokemonData, fetchPokemonDetailData, fetchPokemonJapaneseData } from '@/services/pokemonService';
import type { PokemonData, PokemonDetailData, PokemonJapaneseData, PokemonResults } from '@/types/pokemon';

type State = {
  pokemonData: PokemonData;
  pokemonResults: PokemonResults[];
  detailedPokemonData: PokemonDetailData[];
  japanesePokemonData: PokemonJapaneseData[];
  loading: boolean;
  errorMessage: string;
};

export const usePokemonDataStore = defineStore('pokemonDataStore', {
  state: (): State => ({
    pokemonData: {} as PokemonData,
    pokemonResults: [], // ポケモンの基本データ
    detailedPokemonData: [], // 詳細なポケモンデータ
    japanesePokemonData: [], // 日本語を含んだポケモンデータ
    loading: false, // ローディング状態
    errorMessage: '', // エラーメッセージ
  }),
  getters: {
    /**
     * 日本語のポケモン名を取得
     * @param {State} state - ストアの状態
     * @returns {string[]} - 日本語のポケモン名のリスト
     */
    getJapanesePokemonNames: (state: State): string[] => {
      return state.japanesePokemonData
        .map(({ names }) => names.find(({ language }) => language.name === 'ja')?.name || '')
        .filter((name) => name !== '');
    },
    /**
     * ポケモンの画像URLを取得
     * @param {State} state - ストアの状態
     * @returns {string[]} - ポケモンの画像URLのリスト
     */
    getPokemonImageUrls: (state: State): string[] => {
      return state.detailedPokemonData.map(
        ({ sprites }) => sprites.other['official-artwork'].front_default || sprites.front_default,
      );
    },
    /**
     * 次のページのURLを取得
     * @param {State} state - ストアの状態
     * @returns {string} - 次のページのURL
     */
    getNextUrl: (state: State): string => {
      return getPokeApiUrlWithLimit(state.pokemonData.next);
    },
    /**
     * 前のページのURLを取得
     * @param {State} state - ストアの状態
     * @returns {string} - 前のページのURL
     */
    getPreviousUrl: (state: State): string => {
      return getPokeApiUrlWithLimit(state.pokemonData.previous);
    },
  },
  actions: {
    /**
     * ローディング状態を設定
     * @param {boolean} loading - ローディング状態
     */
    setLoading(loading: boolean): void {
      this.loading = loading;
    },
    /**
     * エラーメッセージを設定
     * @param {string} message - エラーメッセージ
     */
    setErrorMessage(message: string): void {
      this.errorMessage = message;
    },
    /**
     * すべてのポケモンデータを取得
     * @param {string} [url=BASE_URL.POKEMON] - ポケモンデータのURL
     * @returns {Promise<void>}
     */
    async fetchAllPokemonData(url: string = BASE_URL.POKEMON): Promise<void> {
      await this.withLoadingAndErrorHandling(async () => {
        const response = await fetchPokemonData(url);
        this.pokemonData = response;
        this.pokemonResults = response.results;
        await this.fetchAndSetPokemonDetails();
      }, 'fetchAllPokemonData');
    },
    /**
     * ポケモンの詳細データと日本語を含んだデータを取得して設定
     * @returns {Promise<void>}
     */
    async fetchAndSetPokemonDetails(): Promise<void> {
      await this.withLoadingAndErrorHandling(async () => {
        const detailedPokemonData = await this.fetchPokemonDetailsFromResults();
        const japanesePokemonData = await this.fetchJapaneseDataForPokemon(detailedPokemonData);

        this.detailedPokemonData = detailedPokemonData;
        this.japanesePokemonData = japanesePokemonData;
      }, 'fetchAndSetPokemonDetails');
    },
    /**
     * PokemonResultからポケモンの詳細データを取得
     * @returns {Promise<PokemonDetailData[]>}
     */
    async fetchPokemonDetailsFromResults(): Promise<PokemonDetailData[]> {
      const promises = this.pokemonResults.map(({ url }) =>
        this.safeFetch<PokemonDetailData>(fetchPokemonDetailData, url, 'fetchPokemonDetailsFromResults'),
      );
      const results = await Promise.all(promises);
      return results.filter((result): result is PokemonDetailData => result !== null);
    },
    /**
     * ポケモンの詳細データから日本語を含んだデータを取得
     * @param {PokemonDetailData[]} pokemonDetails - ポケモンの詳細データ
     * @returns {Promise<PokemonJapaneseData[]>}
     */
    async fetchJapaneseDataForPokemon(pokemonDetails: PokemonDetailData[]): Promise<PokemonJapaneseData[]> {
      const promises = pokemonDetails.map(({ species }) =>
        this.safeFetch<PokemonJapaneseData>(fetchPokemonJapaneseData, species.url, 'fetchJapaneseDataForPokemon'),
      );
      const results = await Promise.all(promises);
      return results.filter((result): result is PokemonJapaneseData => result !== null);
    },
    /**
     * 安全にデータをフェッチする関数
     * フェッチ中にエラーが発生した場合、エラーハンドリングを行い、nullを返す
     *
     * @template T - フェッチされるデータの型
     * @param {(url: string) => Promise<T>} fetchFunction - データをフェッチする関数(servicesの関数)
     * @param {string} url - データをフェッチするためのURL
     * @param {string} source - エラー発生時に使用するソースの名前。(actionsの名前など)
     * @returns {Promise<T | null>} フェッチされたデータ、またはエラーが発生した場合はnull
     */
    async safeFetch<T>(fetchFunction: (url: string) => Promise<T>, url: string, source: string): Promise<T | null> {
      try {
        return await fetchFunction(url);
      } catch (error) {
        this.handleError(error, source);
        return null;
      }
    },
    /**
     * エラーを処理する
     * @param {unknown} error - 発生したエラー
     * @param {string} source - エラー発生元のソース
     */
    handleError(error: unknown, source: string): void {
      const errorMessage =
        error instanceof Error ? `${source}: ${error.message}` : `${source}: An unknown error occurred`;
      this.setErrorMessage(`${this.errorMessage ? this.errorMessage + '\n' : ''}${errorMessage}`);
      // eslint-disable-next-line no-console
      console.error(`${source} - An error occurred:`, error);
    },
    /**
     * ローディング状態とエラーハンドリングを伴うactionsを実行する
     * @param {() => Promise<void>} action - 実行するアクション
     * @param {string} source - エラー発生時に使用するソースの名前。(actionsの名前など)
     * @returns {Promise<void>}
     */
    async withLoadingAndErrorHandling(action: () => Promise<void>, source: string): Promise<void> {
      this.setLoading(true);
      this.setErrorMessage('');
      try {
        await action();
      } catch (error) {
        this.handleError(error, source);
      } finally {
        this.setLoading(false);
      }
    },
  },
});
