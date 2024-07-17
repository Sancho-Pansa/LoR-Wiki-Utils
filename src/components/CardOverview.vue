<script setup>
import { useLoRStore } from "@/stores/LoRStore.js";
import { onMounted, ref } from "vue";

const store = useLoRStore();
const cardName = ref(store.selectedCard.name);
const props = defineProps({
  cardCode: {
    type: String,
    default: "01DE001"
  }
});

</script>
<template>
  <header class="set-header">
    <div>{{ cardName }}</div>
  </header>
</template>