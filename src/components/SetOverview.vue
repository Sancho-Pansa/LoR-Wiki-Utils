<script setup>
import { onMounted } from "vue";
import fetchWikiData from "@/wiki/ParseWikiData";

const props = defineProps({
  set: {
    type: String,
    default: "1"
  }
});

onMounted(async () => {
  console.log(fetchWikiData(props.set));
});

</script>
<template>
  {{ props.set }}
</template>