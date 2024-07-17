<script setup>
import CardOverview from "@/components/CardOverview.vue";
</script>
<template>
  <CardOverview :card-code="$route.params.cardCode" />
</template>