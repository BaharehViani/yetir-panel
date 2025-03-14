<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="elevation-6 pt-3">
          <CourierIncome />
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mt-5">
      <v-col cols="6">
        <v-card class="elevation-6 pt-3">
          <CourierHeatmap />
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="elevation-6 pt-3">
          <CourierOrdersType />
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mt-5">
      <v-col cols="12">
        <v-card class="elevation-6 pt-3">
            <CourierDailyOrdersCount />
        </v-card>
      </v-col>
    </v-row>  
  </v-container>
</template>

<script setup>
definePageMeta({
  layout: 'panel',
})
</script>

<style lang="scss" scoped>
</style>