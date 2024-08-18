<script setup lang="ts">
import { usePokemonStore } from '@/store/pokemonStore';
const { getPokemonIds, getPokemonJapaneseNames, getPokemonImageUrls, getPokemonTypes } = storeToRefs(usePokemonStore());
const { fetchPokemonData } = usePokemonStore();

const route = useRoute();
const pokemonId = parseInt(route.params.id as string, 10) - 1;

onMounted(async () => {
  await fetchPokemonData();
});
</script>

<template>
  <section>
    <img :src="getPokemonImageUrls[pokemonId]" :alt="getPokemonJapaneseNames[pokemonId]" />
    <div>
      <p>図鑑No.{{ getPokemonIds[pokemonId] }}</p>
      <p>{{ getPokemonJapaneseNames[pokemonId] }}</p>
      <div class="pokemon-types">
        <img
          v-for="(type, index) in getPokemonTypes[pokemonId]"
          :key="index"
          :src="`../assets/images/pokemon-types/${type}.png`"
          :alt="type"
        />
      </div>
    </div>
  </section>
</template>
