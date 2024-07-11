<script setup>
import { onMounted, ref } from "vue";
import fetchWikiData from "@/wiki/ParseWikiData";

const props = defineProps({
  set: {
    type: String,
    default: "1"
  }
});

const cardsList = ref([]);

onMounted(async () => {
  let selectedSet = props.set.match(/^\d+/m); // Для кодов вида "6cde", "8ab" и т. п.
  try {
    let cardsTable = await fetch("/wiki");
    cardsList.value = Object.keys(cardsTable).map((id) => {
      cardsTable[id].id = id;
      return cardsTable[id];
    }).sort((a, b) => a.id > b.id ? 1 : -1);
  } catch(error) {
    // TODO: Полноценный вывод ошибки
    console.error("Error");
  }

});
</script>
<template>
  <div
    v-for="(card, index) in cardsList"
    :key="index"
  >
    <span>{{ card.id }} :: {{ card.name }}</span>
  </div>
</template>