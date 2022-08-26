<template>
  <div>
    <div class="text-h6">OPTIONS</div>
    <q-banner class="bg-warning text-black">
      <template v-slot:avatar>
        <q-icon name="warning" color="black" />
      </template>
      This function is not implemented yet.
    </q-banner>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

onMounted(() => {
  console.log('onMounted');
});
</script>

<style scoped>
</style>
