<!-- <div class="pr-2 pt-1 mb-4 text-3xl text-[#141A31]">داشبورد پیک</div> -->
<template>
  <v-container>
    <v-row>
      <v-col cols="7">
        <v-card>
          <v-card-text>
            <CourierIncome />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="5">
        <v-card>
          <v-card-text>
            <CourierOrdersType />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-card>
          <v-card-text>
            <CourierHeatmap />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-text>
            <CourierDailyOrdersCount />
          </v-card-text>
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