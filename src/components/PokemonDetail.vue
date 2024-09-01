<script setup lang="ts">
import { usePokemonStore } from '@/store/pokemonStore';
const {
  getPokemonIds,
  getPokemonJapaneseNames,
  getPokemonImageUrls,
  getPokemonTypes,
  getPokemonFlavorTexts,
  getPokemonStats,
  getPokemonCries,
} = storeToRefs(usePokemonStore());
const { fetchPokemonData } = usePokemonStore();

const route = useRoute();
const pokemonId = parseInt(route.params.id as string, 10) - 1;

onMounted(async () => {
  await fetchPokemonData();
});

const calculateWidth = (value: number): string => {
  const maxValue = 255;
  return `${(value / maxValue) * 100}%`;
};

const audio = ref<HTMLAudioElement | null>(null);
const playCry = () => {
  if (audio.value) {
    audio.value.play();
  }
};

const getPreviousPokemonLink = computed(() => {
  const previousId = pokemonId > 0 ? pokemonId : getPokemonIds.value.length - 1;
  return `/pokemon/${getPokemonIds.value[previousId]}`;
});

// Compute the link to the next Pokémon
const getNextPokemonLink = computed(() => {
  const nextId = pokemonId < getPokemonIds.value.length - 1 ? pokemonId + 1 : 0;
  return `/pokemon/${getPokemonIds.value[nextId]}`;
});
</script>

<template>
  <section>
    <div class="pokemon-details">
      <img class="pokemon-image" :src="getPokemonImageUrls[pokemonId]" :alt="getPokemonJapaneseNames[pokemonId]" />
      <div class="pokemon-info">
        <p class="pokemon-id">図鑑No.{{ getPokemonIds[pokemonId] }}</p>
        <h1 class="pokemon-name">{{ getPokemonJapaneseNames[pokemonId] }}</h1>
        <div class="pokemon-types">
          <img
            v-for="(type, index) in getPokemonTypes[pokemonId]"
            :key="index"
            :src="`../_nuxt/assets/images/pokemon-types/${type}.png`"
            :alt="type"
            width="30"
            height="30"
          />
        </div>
        <p class="pokemon-flavor-text">{{ getPokemonFlavorTexts[pokemonId] }}</p>

        <!-- ステータス表示部分 -->
        <div class="stats-container">
          <div v-for="(value, key) in getPokemonStats[pokemonId]" :key="key" class="status-bar">
            <span class="status-key">{{ key }}</span>
            <div class="bar-container">
              <div class="bar" :style="{ width: calculateWidth(value) }" />
              <span class="value">{{ value }}</span>
            </div>
          </div>
        </div>

        <div class="sound-button">
          <button @click="playCry">鳴き声を聴けるボタン</button>
          <audio ref="audio" :src="getPokemonCries[pokemonId]" />
        </div>
      </div>
    </div>
    <div class="navigation-links">
      <NuxtLink :to="getPreviousPokemonLink" class="nav-button">前のポケモン</NuxtLink>
      <NuxtLink to="/" class="nav-button">一覧に戻る</NuxtLink>
      <NuxtLink :to="getNextPokemonLink" class="nav-button">次のポケモン</NuxtLink>
    </div>
  </section>
</template>

<style scoped>
section {
  margin: 0 auto;
}

.pokemon-details {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin: 20px;
  justify-content: center;
}

.navigation-links {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
}

.nav-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.nav-button:hover {
  background-color: #0056b3;
}

.pokemon-image {
  max-width: 300px;
  width: 100%;
  height: auto;
}

.pokemon-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 600px;
}

.pokemon-id {
  font-size: 1.2rem;
  font-weight: bold;
}

.pokemon-name {
  font-size: 2rem;
  margin: 0;
}

.pokemon-types {
  display: flex;
  gap: 10px;
  margin: 10px 0;
}

.pokemon-flavor-text {
  font-size: 1rem;
  color: #555;
}

.stats-container {
  margin-top: 20px;
}

.status-bar {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.status-key {
  width: 100px;
  font-weight: bold;
}

.bar-container {
  display: flex;
  align-items: center;
  width: 80%;
  margin-left: 10px;
}

.bar {
  height: 20px;
  background-color: #4caf50;
}

.value {
  margin-left: 10px;
  font-weight: bold;
}

.sound-button {
  margin-top: 20px;
  padding: 10px;
  background-color: #ffcc00;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  transition: 0.2s cubic-bezier(0.45, 0, 0.55, 1);
}

.sound-button:hover {
  opacity: 0.8;
}
</style>
