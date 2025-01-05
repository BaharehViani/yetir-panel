<template>
  <v-app>
    <SiteNavbar />
    <div class="mt-15">
      <slot />
    </div>
    <div style="height: 300vh;"></div>
  </v-app>
</template>

<script setup>

import SiteNavbar from '~/components/general/SiteNavbar.vue'
</script>

<style lang="scss" scoped>

</style>