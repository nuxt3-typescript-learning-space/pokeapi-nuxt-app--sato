## ポケモンAPIを使用したアプリケーション

### 目標
- ファイル・関数ごとに役割を細分化して、再利用生の高い設計を目指す。

### ポケモン一覧ページ
- 初代151匹のポケモンを一覧表示する。
- 初期描画時は最初の20匹を表示する。
- ページ下部までスクロールすると次の20匹を表示する。
- 各ポケモンの名前・画像・タイプを表示する。
- 各ポケモンをクリックすると、詳細ページへ遷移する。
- レスポンシブ対応をする。

### ポケモン詳細ページ(pokemon/[id])
- ポケモンの名前・画像・タイプ・詳細の説明文・ステータス・鳴き声を聴けるボタンを表示する。
- ポケモン一覧ページに遷移するボタンを設置する。
- 前後のポケモン詳細ページへ遷移するボタンを設置する。
- レスポンシブ対応をする。

### APIエンドポイント
- PokeAPI: `https://pokeapi.co/api/v2/pokemon`

### ディレクトリ構造
```
src/
├── assets/
│   └── images/
├── components/
│   ├── PokemonList.vue
│   └── PokemonCard.vue
├── constants/
│   └── pokemon.ts
├── layouts/
│   └── default.vue
├── pages/
│   ├── index.vue
│   └── pokemon/
│       └── [id].vue
├── services/
│   └── api.ts
├── store/
│   └── pokemonStore.ts
├── types/
│   └── pokemon.ts
├── utils/
```
#### components/PokemonList.vue
ポケモン一覧リストを表示するコンポーネント

#### components/PokemonCard.vue
各ポケモンの情報をカード形式で表示するコンポーネント

#### constants/pokemon.ts
APIのエンドポイントなどの定数を定義する。

#### layouts/default.vue
共通のレイアウトを管理する。

#### pages/index.vue
ポケモン一覧ページ

#### pages/pokemon/[id].vue
ポケモン詳細ページ

####　services/api.ts
APIからデータをフェッチしてくる関数を定義する。

#### store/pokemonStore.ts
ポケモンに関するデータの状態管理を行う。

#### types/pokemon.ts
型を定義する。