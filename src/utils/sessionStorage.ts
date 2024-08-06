/**
 * セッションストレージにアイテムを設定する関数
 *
 * 指定されたキーと値をセッションストレージに保存します。
 *
 * @param {string} key - 保存するアイテムのキー
 * @param {string} value - 保存するアイテムの値
 */
export const setItem = (key: string, value: string) => {
  window.sessionStorage.setItem(key, value);
};

/**
 * セッションストレージからアイテムを取得する関数
 *
 * 指定されたキーに対応する値をセッションストレージから取得します。
 * キーが存在しない場合はnullを返します。
 *
 * @param {string} key - 取得するアイテムのキー
 * @returns {string | null} - 取得したアイテムの値、またはnull
 */
export const getItem = (key: string): string | null => {
  return window.sessionStorage.getItem(key);
};
