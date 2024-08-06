<script setup lang="ts">
import PokemonCard from '@/components/PokemonCard.vue';
import Pagination from '@/components/common/Pagination.vue';
import Spinner from '@/components/common/Spinner.vue';
import { usePokemonDataStore } from '@/store/pokemonDataStore';

// pokemonDataStoreを使用してデータを管理
const pokemonDataStore = usePokemonDataStore();
const { loading: loadingState } = storeToRefs(pokemonDataStore);
const { fetchAllPokemonData, setLoading } = pokemonDataStore;

/**
 * ページネーションのクリックイベントを処理する関数
 * @param {string} pageUrl - 次または前のページのURL
 */
const handlePaginationClick = (pageUrl: string) => {
  setItem('currentPageApiUrl', pageUrl);
  fetchAllPokemonData(pageUrl);
};

// データロード中の状態を設定
setLoading(true);

// コンポーネントがマウントされたときにデータをフェッチ
onMounted(async () => {
  const currentPageApiUrl = getItem('currentPageApiUrl');
  if (currentPageApiUrl) {
    await fetchAllPokemonData(currentPageApiUrl);
  } else {
    await fetchAllPokemonData();
  }
});
</script>
<template>
  <!-- データがロード中の場合にローディングスピナーを表示 -->
  <template v-if="loadingState">
    <div class="flex h-screen items-center justify-center">
      <Spinner />
    </div>
  </template>
  <!-- データがロード完了の場合にポケモンカードとページネーションを表示 -->
  <template v-else>
    <PokemonCard />
    <div class="flex justify-center py-4">
      <Pagination @pagination-click="handlePaginationClick" />
    </div>
  </template>
</template>
