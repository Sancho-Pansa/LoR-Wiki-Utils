<script setup>
import { computed, onMounted, ref } from "vue";

import SETS_ENUM from "./riot/SETS_ENUM";

const sets = ref(SETS_ENUM);
</script>

<template>
  <header>
    <h2>Добро пожаловать в редактор карт Legends of Runeterra Wiki</h2>
    <h3>Пожалуйста, выберите текущий сезон</h3>
  </header>
  <main>
    <div>
      <button
        v-for="(set, index) in sets"
        :key="index"
      >
        {{ set }}
      </button>
    </div>
  </main>
</template>

<style scoped>
</style>
