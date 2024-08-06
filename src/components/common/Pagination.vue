<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { usePokemonDataStore } from '@/store/pokemonDataStore';

const pokemonDataStore = usePokemonDataStore();
const { getPreviousUrl, getNextUrl } = storeToRefs(pokemonDataStore);

// ページングイベントを親コンポーネントにemitする
const emit = defineEmits<{
  (event: 'pagination-click', pageUrl: string): void;
}>();

/**
 * ボタンがクリックされた時に実行される関数
 * @param {string} pageUrl - 次または前のページのURL
 */
const handleClick = (pageUrl: string) => {
  emit('pagination-click', pageUrl);
};
</script>
<template>
  <nav class="flex gap-2">
    <Button :disabled="!getPreviousUrl" @click="handleClick(getPreviousUrl)">前へ</Button>
    <Button :disabled="!getNextUrl" @click="handleClick(getNextUrl)">次へ</Button>
  </nav>
</template>
