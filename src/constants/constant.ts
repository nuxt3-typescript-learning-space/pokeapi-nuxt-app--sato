/**
 * APIのベースURL定数
 *
 * この定数オブジェクトは、PokeAPIのベースURLを格納しています。
 * URLは変更不可として定義されています。
 */
export const BASE_URL = Object.freeze({
  /**
   * ポケモンデータ取得用のURL
   *
   * PokeAPIのポケモンエンドポイントのベースURLです。
   */
  POKEMON: 'https://pokeapi.co/api/v2/pokemon',
});
