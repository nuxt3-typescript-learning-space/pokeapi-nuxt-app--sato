<script setup lang="ts">
import PokemonCard from '@/components/PokemonCard.vue';
import { usePokemonStore } from '@/store/pokemonStore';
const { getPokemonIds, getPokemonJapaneseNames, getPokemonImageUrls, getPokemonTypes } = storeToRefs(usePokemonStore());
const { fetchPokemonData, fetchMorePokemonData } = usePokemonStore();

onMounted(async () => {
  await fetchPokemonData();
});

const loadMorePokemon = async () => {
  await fetchMorePokemonData();
};
</script>
<template>
  <section class="pokemon-list">
    <ul>
      <li v-for="(id, index) in getPokemonIds" :key="index">
        <PokemonCard
          :number="id"
          :name="getPokemonJapaneseNames[index]"
          :image-url="getPokemonImageUrls[index]"
          :types="getPokemonTypes[index]"
        />
      </li>
    </ul>
    <button @click="loadMorePokemon">もっとポケモンを表示する</button>
  </section>
</template>

<style scoped>
.pokemon-list {
  padding: 20px;
}

.pokemon-list ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
}

.pokemon-list li {
  flex: 1 1 calc(25% - 20px);
  margin: 10px;
}

@media (max-width: 1024px) {
  .pokemon-list li {
    flex: 1 1 calc(33.333% - 20px);
  }
}

@media (max-width: 768px) {
  .pokemon-list li {
    flex: 1 1 calc(50% - 20px);
  }
}

@media (max-width: 480px) {
  .pokemon-list li {
    flex: 1 1 100%;
  }
}
</style>
