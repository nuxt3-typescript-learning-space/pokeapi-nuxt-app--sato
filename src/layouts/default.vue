<template>
  <section>
    <header>
      <h1>ポケモン図鑑</h1>
    </header>
    <div class="container">
      <NuxtPage />
    </div>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

header {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #d1d1d1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

header h1 {
  font-size: 2.5em;
  margin: 0;
  font-family: 'Press Start 2P', sans-serif;
}
</style>
