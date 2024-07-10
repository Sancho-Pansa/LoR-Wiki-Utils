<script setup>
import SetOverview from "@/components/SetOverview.vue";
</script>
<template>
  <SetOverview :set="$route.params.setNumber" />
</template>