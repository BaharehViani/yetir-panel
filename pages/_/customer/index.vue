<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="elevation-6 pt-3">
          <CustomerOrdersOrderRequestsStats />
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mt-5">
      <v-col cols="6">
        <v-card class="px-3 elevation-6 pt-6">
          <CustomerMonthlySpendingStats />
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="elevation-6 py-3">
          <CustomerOrdersType />
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