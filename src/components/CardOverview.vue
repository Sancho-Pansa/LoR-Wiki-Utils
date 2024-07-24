<script setup>
import { onMounted, ref } from "vue";

import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import TabPanels from "primevue/tabpanels";
import TabPanel from "primevue/tabpanel";

import { useLoRStore } from "@/stores/LoRStore.js";
import { storeToRefs } from "pinia";

let props = defineProps({
  cardCode: {
    type: String,
    default: "01DE001"
  }
});

const store = useLoRStore();
const { selectedCard } = storeToRefs(store);
const cardName = ref(store.selectedCard.name);
const cardUrl = ref("");
const selectedCardJson = ref(JSON.stringify(selectedCard.value, null, 2));

onMounted(async () => {
  let result = await fetch(`http://localhost:10001/${props.cardCode}.png`);
  if(result.ok) {
    cardUrl.value = (await result.text()).replace(/cb=\d+/gm, "");
  }
});

</script>
<template>
  <header class="set-header">
    <div>{{ cardName }}</div>
  </header>
  <main class="card-grid">
    <section class="card-grid__left">
      <Tabs value="image">
        <TabList>
          <Tab value="image-fandom">
            Фэндом
          </Tab>
          <Tab value="image-riot">
            Riot API
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="image-fandom">
            Fandom card
          </TabPanel>
          <TabPanel value="image-riot">
            Riot Card
          </TabPanel>
        </TabPanels>
      </Tabs>
    </section>
    <section class="card-grid__right">
      <Tabs value="data">
        <TabList>
          <Tab value="data-forms">
            Формы
          </Tab>
          <Tab value="data-json">
            JSON
          </Tab>
          <Tab value="data-lua">
            Lua
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="data-forms">
            <form class="forms">
              <label>
                Код
                <input v-model="selectedCard.id" type="text" readonly />
              </label>
              <label>
                Тип
                <input v-model="selectedCard.type" type="text" />
              </label>
              <label>
                Редкость
                <input v-model="selectedCard.rarity" type="text" />
              </label>
              <label>
                Подтипы (группы)
                <input v-model="selectedCard.subtype" type="text" />
              </label>
              <label>
                Навык(и)
                <input v-model="selectedCard.keywords" type="text" />
              </label>
              <label>
                Коллекционируемая
                <input v-model="selectedCard.collectible" type="checkbox" />
              </label>
              <label>
                Стоимость
                <input v-model="selectedCard.cost" type="text" />
              </label>
              <label>
                Здоровье
                <input v-model="selectedCard.health" type="text" />
              </label>
              <label>
                Сила атаки
                <input v-model="selectedCard.power" type="text" />
              </label>
              <label>
                Описание
                <textarea v-model="selectedCard.desc"></textarea>
              </label>
              <label>
                Условие повышения уровня
                <textarea v-model="selectedCard.lvlDesc"></textarea>
              </label>
              <label>
                KeywordRefs
                <input v-model="selectedCard.keywordRefs" type="text" />
              </label>
              <label>
                CategoryRefs
                <input v-model="selectedCard.categoryRefs" type="text" />
              </label>
              <label>
                Подпись
                <textarea v-model="selectedCard.flavor" type="text"></textarea>
              </label>
              <label>
                Художник(и)
                <input v-model="selectedCard.artist" type="text" />
              </label>
            </form>
          </TabPanel>
          <TabPanel value="data-json">
            <textarea v-model="selectedCardJson"></textarea>
          </TabPanel>
          <TabPanel value="data-lua">
            <textarea></textarea>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </section>
  </main>
</template>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 1vw;
}

.card-grid__left,
.card-grid__right {
  border: 1px solid var(--borders-main);
  min-height: 75vh;
}

.forms {
  padding: 2vh 2vw;
}
</style>