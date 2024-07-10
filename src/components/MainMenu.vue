<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import SETS_ENUM from "@/riot/SETS_ENUM";

const router = useRouter();
const sets = ref(SETS_ENUM);

function selectSet(setNumber) {
  router.push(`/set/${setNumber}`);
}
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
        @click="selectSet(set)"
      >
        {{ set }}
      </button>
    </div>
  </main>
</template>

<style scoped>
</style>
