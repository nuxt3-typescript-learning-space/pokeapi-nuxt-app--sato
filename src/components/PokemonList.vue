<script setup lang="ts">
import PokemonCard from '@/components/PokemonCard.vue';
import { usePokemonStore } from '@/store/pokemonStore';
const { getPokemonJapaneseNames, getPokemonImageUrls, getPokemonIds, getPokemonTypes } = storeToRefs(usePokemonStore());
const { fetchPokemonData } = usePokemonStore();

onMounted(async() => {
  await fetchPokemonData();
});
</script>
<template>
  <section class="pokemon-list">
    <ul>
      <li v-for="(name, index) in getPokemonJapaneseNames" :key="index">
        <PokemonCard :name="name" :image-url="getPokemonImageUrls[index]" :number="getPokemonIds[index]" :type="getPokemonTypes" />
      </li>
    </ul>
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