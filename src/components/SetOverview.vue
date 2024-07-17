<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  set: {
    type: String,
    default: "1"
  }
});

const cardsList = ref([]);

const router = useRouter();

onMounted(async () => {
  let selectedSet = props.set.match(/^\d+/m); // Для кодов вида "6cde", "8ab" и т. п.
  try {
    let response = await fetch(`http://localhost:10000/?set=${selectedSet}`);
    let cardsTable = await response.json();
    cardsList.value = Object.keys(cardsTable).map((id) => {
      cardsTable[id].id = id;
      return cardsTable[id];
    }).sort((a, b) => a.id > b.id ? 1 : -1);
  } catch(error) {
    console.error(error);
    // TODO: Полноценный вывод ошибки
    console.error("Error");
  }

});

function viewCardData(id) {
  router.push(`${router.currentRoute.value.path}/card/${id}`);
}
</script>
<template>
  <div
    v-for="(card, index) in cardsList"
    :key="index"
  >
    <span
      class="buttonesque"
      @click="viewCardData(card.id)"
    >
      {{ card.id }} :: {{ card.name }}
    </span>
  </div>
</template>