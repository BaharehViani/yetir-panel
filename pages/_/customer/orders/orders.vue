<template>
  <div class="w-274 pb-8 bg-[#FFFFFF] new-order flex-column rounded-2xl pl-6">

    <v-data-table :items="items"></v-data-table>

  </div>

</template>

<script setup>

definePageMeta({
  layout: 'panel'
})

const items = [
  {
    name: 'African Elephant',
    species: 'Loxodonta africana',
    diet: 'Herbivore',
    habitat: 'Savanna, Forests',
  },
  //
]
</script>



<style scoped>

</style>
