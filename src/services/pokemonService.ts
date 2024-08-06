import type { PokemonData, PokemonDetailData, PokemonJapaneseData } from '@/types/pokemon';

/**
 * 指定されたURLからデータを非同期にフェッチする汎用関数
 * @template T - フェッチするデータの型
 * @param {string} url - フェッチするデータのURL
 * @returns {Promise<T>} - フェッチされたデータを含むPromise
 */
const fetchData = async <T>(url: string): Promise<T> => {
  const response = await $fetch(url);
  return response as T;
};

/**
 * ポケモンのデータをフェッチする関数
 * @param {string} url - ポケモンデータのURL
 * @returns {Promise<PokemonData>} - ポケモンデータを含むPromise
 */
export const fetchPokemonData = (url: string): Promise<PokemonData> => {
  return fetchData<PokemonData>(url);
};

/**
 * ポケモンの詳細データをフェッチする関数
 * @param {string} url - ポケモン詳細データのURL
 * @returns {Promise<PokemonDetailData>} - ポケモン詳細データを含むPromise
 */
export const fetchPokemonDetailData = (url: string): Promise<PokemonDetailData> => {
  return fetchData<PokemonDetailData>(url);
};

/**
 * ポケモンの日本語を含むデータをフェッチする関数
 * @param {string} url - ポケモン日本語データのURL
 * @returns {Promise<PokemonJapaneseData>} - ポケモン日本語データを含むPromise
 */
export const fetchPokemonJapaneseData = (url: string): Promise<PokemonJapaneseData> => {
  return fetchData<PokemonJapaneseData>(url);
};
