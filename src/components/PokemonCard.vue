<script setup lang="ts">
import { CardContent, CardHeader, Card, CardTitle } from '@/components/ui/card';
import { usePokemonDataStore } from '@/store/pokemonDataStore';

// pokemonDataStoreを使用してデータを管理
const pokemonDataStore = usePokemonDataStore();
const { getJapanesePokemonNames, getPokemonImageUrls, getPokemonIds } = storeToRefs(pokemonDataStore);
</script>

<template>
  <!-- ポケモンの名前と画像を表示するグリッド -->
  <ul class="grid grid-cols-4 gap-2">
    <!-- 各ポケモンをループしてカードを作成 -->
    <template v-for="(name, index) in getJapanesePokemonNames" :key="index">
      <li>
        <NuxtLink :to="`/pokemon/${getPokemonIds[index]}`">
          <Card class="h-full">
            <CardHeader>
              <!-- ポケモンの画像を表示。画像がない場合は「画像なし」を表示 -->
              <template v-if="getPokemonImageUrls[index]">
                <img :src="getPokemonImageUrls[index]" alt="ポケモンの画像" />
              </template>
              <template v-else>
                <p>画像なし</p>
              </template>
            </CardHeader>
            <CardContent>
              <!-- ポケモンの名前を表示 -->
              <CardTitle class="text-center">{{ name }}</CardTitle>
            </CardContent>
          </Card>
        </NuxtLink>
      </li>
    </template>
  </ul>
</template>
