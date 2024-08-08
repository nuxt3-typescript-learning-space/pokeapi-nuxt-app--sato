## 遭遇したバグと解決方法

###　fetchPokemonData関数の戻り値の型ミス
####　原因
usePokemonStoreの中で`const response = await fetchPokemonData();`と呼び出し、
`response.results`にアクセスしようとした際に`response`が配列であると認識されて`results`がないよ~というエラー。

####　解決策
修正前
```
export async function fetchPokemonData(): Promise<Pokemon[]> {
  const response = await $fetch(POKEMON_API_URL);
  return response as Pokemon[];
}
```
修正後
```
export async function fetchPokemonData(): Promise<Pokemon> {
  const response = await $fetch(POKEMON_API_URL);
  return response as Pokemon;
}
```