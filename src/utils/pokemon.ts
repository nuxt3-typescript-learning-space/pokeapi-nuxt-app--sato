/**
 * PokeAPIのURLにリミットパラメータを追加する関数
 *
 * 指定されたURLに`limit=20`のパラメータを追加して、新しいURLを返します。
 * URLが指定されていない場合、空の文字列を返します。
 *
 * @param {string} [url] - 元のURL
 * @returns {string} - `limit=20`を含む新しいURL
 */
export const getPokeApiUrlWithLimit = (url?: string): string => {
  if (!url) return '';

  const newUrl = new URL(url);
  newUrl.searchParams.set('limit', '20');
  return newUrl.toString();
};
