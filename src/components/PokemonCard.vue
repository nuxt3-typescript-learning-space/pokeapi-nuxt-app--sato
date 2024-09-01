<script setup lang="ts">
defineProps({
  number: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  types: {
    type: Array as PropType<string[]>,
    required: true,
  },
});
</script>

<template>
  <div class="pokemon-card">
    <NuxtLink :to="`/pokemon/${number}`">
      <p>図鑑No.{{ number }}</p>
      <img :src="imageUrl" :alt="name" />
      <p>{{ name }}</p>
      <div class="pokemon-types">
        <img
          v-for="(type, index) in types"
          :key="index"
          :src="`../_nuxt/assets/images/pokemon-types/${type}.png`"
          :alt="type"
          width="50%"
          height="50%"
        />
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped>
.pokemon-card {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  background-color: #fff;
}

.pokemon-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.pokemon-card img {
  max-width: 150px;
  height: auto;
  margin: 0 auto 10px auto;
  display: block;
}

.pokemon-card p {
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
}

.pokemon-types {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.pokemon-types img {
  max-width: 50px;
  height: auto;
  display: block;
}
</style>
