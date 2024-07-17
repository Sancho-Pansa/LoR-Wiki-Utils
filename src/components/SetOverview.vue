<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { cloneDeep as _cloneDeep } from "lodash";
import { useLoRStore } from "@/stores/LoRStore.js";

const props = defineProps({
  set: {
    type: String,
    default: "1"
  }
});

const cardFilter = ref("");
const cardsList = ref([]);
const filteredCards = ref([]);

const router = useRouter();
const store = useLoRStore();

onMounted(async () => {
  let selectedSet = props.set.match(/^\d+/m); // Для кодов вида "6cde", "8ab" и т. п.
  try {
    let response = await fetch(`http://localhost:10000/${selectedSet}`);
    let cardsTable = await response.json();
    cardsList.value = Object.keys(cardsTable).map((id) => {
      cardsTable[id].id = id;
      return cardsTable[id];
    }).sort((a, b) => a.id > b.id ? 1 : -1);
    filteredCards.value = _cloneDeep(cardsList.value);
    store.$patch({ setList: cardsList.value });
  } catch(error) {
    console.error(error);
    // TODO: Полноценный вывод ошибки
    console.error("Error");
  }
});

/**
 *
 * @param {KeyboardEvent} $event
 */
function filterResults($event) {
  let enteredText = $event.target.value;
  filteredCards.value = cardsList.value.filter((card) => {
    return card.id.search(enteredText) > -1 || card.name.search(enteredText) > -1;
  });
}

function viewCardData(id) {
  store.$patch({ selectedCard: cardsList.value.find((e) => e.id === id) });
  router.push(`${router.currentRoute.value.path}/${id}`);
}
</script>
<template>
  <header class="set-header">
    <div>Сезон {{ set }}</div>
    <input
      v-model="cardFilter"
      type="text"
      class="set-filter"
      placeholder="Введите фильтр"
      @input="filterResults"
    />
  </header>
  <div class="cards-grid">
    <div v-for="(card, index) in filteredCards" :key="index">
      <button class="card-button" @click="viewCardData(card.id)">
        {{ card.id }} :: {{ card.name }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.set-header {
  text-align: center;
  font-size: 3rem;
  padding: 2vh 0;
}

.set-filter {
  font-size: 1.5rem;
  min-width: 50vw;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  justify-content: center;
  justify-items: stretch;
  padding: 0 10%;
}

.card-button {
  background-color: var(--background-main);
  border: 1px solid var(--borders-main);
  color: rgb(192, 182, 160);
  line-height: 2.5em;
  font-size: 16px;
  min-width: 100%;
  box-sizing: border-box;
  transition: all 0.2s ease-out;
}

.card-button:hover {
  box-shadow: 0px 0px 10px 5px var(--text-secondary);
  cursor: pointer;
  color: var(--background-main);
  background-color: var(--text-main);
}

.card-button:active {
  background-color: var(--text-secondary);
  font-weight: bold;
}
</style>