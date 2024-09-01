## 初見だったこと

### useHead
https://nuxt.com/docs/api/composables/use-head
```
useHead({
  title: 'ポケモン図鑑',
});
```

### interface
https://typescriptbook.jp/reference/object-oriented/interface
```
export interface PokemonData {
  count: number;
  next?: string;
  previous?: string;
  results: PokemonResults[];
}
```

### import type { ... } from "./module"
型情報のみをインポートする。コンパイル後のJavaScriptには含まれない。あくまで開発中の型チェックのために用いる。<br>
https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export
```
import type { PokemonData, PokemonDetailData, PokemonJapaneseData, PokemonResults } from '@/types/pokemon';
```

### (state: State): string[]
`(state: State)`は引数がState型であること、`: string[]`は関数の戻り値がString型の配列であることを示している。
```
getJapanesePokemonNames: (state: State): string[] => {
  return state.japanesePokemonData
    .map(({ names }) => names.find(({ language }) => language.name === 'ja')?.name || '')
    .filter((name) => name !== '');
},
```

### state: (): State
`()`は引数がないこと、`: State`は関数の戻り値がState型であることを示している。
```
state: (): State => ({
  pokemonData: {} as PokemonData,
  pokemonResults: [], // ポケモンの基本データ
  detailedPokemonData: [], // 詳細なポケモンデータ
  japanesePokemonData: [], // 日本語を含んだポケモンデータ
  loading: false, // ローディング状態
  errorMessage: '', // エラーメッセージ
}),
```

### ジェネリクス
型を使いたいけど汎用的にもしたいときに、引数のような形で型を渡すことで関数の呼び出し先で型を使い分けることができる。別に`<T>`じゃなくてもよい。
https://typescriptbook.jp/reference/generics
```
const fetchData = async <T>(url: string): Promise<T> => {
  const response = await $fetch(url);
  return response as T;
};

export const fetchPokemonData = (url: string): Promise<PokemonData> => {
  return fetchData<PokemonData>(url);
};
```

###　fetchData<PokemonData>(url);

```
export const fetchPokemonData = (url: string): Promise<PokemonData> => {
  return fetchData<PokemonData>(url);
};
```

## 曖昧だったこと

### Object.freeze
Object.freeze() 静的メソッドは、オブジェクトを凍結します。<br>
https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
```
export const BASE_URL = Object.freeze({
  POKEMON: 'https://pokeapi.co/api/v2/pokemon',
});
```

### $fetch()


###　: void
`: void`は関数が何も値を返さないことを示します。
```
setLoading(loading: boolean): void {
  this.loading = loading;
}
```

## その他

###　どれがStateなのか分かりやすくするために「State」を付けた命名にする
```
const { loading: loadingState } = storeToRefs(pokemonDataStore);
```

### actionsはレスポンシブにする必要がないのでstoreToRefs()を付けない
```
const { fetchAllPokemonData, setLoading } = pokemonDataStore;
```

###　分割代入は便利
```
getJapanesePokemonNames: (state: State): string[] => {
  return state.japanesePokemonData
    .map(pokemon => pokemon.names.find(name => name.language.name === 'ja')?.name || '')
    .filter((name) => name !== '');
},
```
```
getJapanesePokemonNames: (state: State): string[] => {
  return state.japanesePokemonData
    .map(({ names }) => names.find(({ language }) => language.name === 'ja')?.name || '')
    .filter((name) => name !== '');
},
```