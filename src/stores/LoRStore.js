import { ref } from "vue";
import { defineStore } from "pinia";
import LoRCard from "@/parser/LoRCard";

export const useLoRStore = defineStore("LoRStore", () => {
  const setList = ref([]);
  const selectedCard = ref(new LoRCard());

  return { setList, selectedCard };
});