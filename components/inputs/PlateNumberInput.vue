<template>
  <div>
    <v-select
      label="نوع وسیله نقلیه"
      variant="outlined"
      v-model="inputType"
      :items="inputTypeOptions"
      item-title="text"
      item-value="value"
    />

    <div>
      <div v-if="inputType === 'car'"></div>

      <div v-if="inputType === 'motorcycle'">
        <v-otp-input v-model="motorCycleInput.partOne" :length="3" dir="ltr" hide-details />

        <v-otp-input v-model="motorCycleInput.partTwo" :length="5" dir="ltr" />
      </div>
    </div>
  </div>
</template>

<script setup>
const model = defineModel()

const inputTypeOptions = ref([
  { text: 'اتومبیل', value: 'car' },
  { text: 'موتور', value: 'motorcycle' },
])

const inputType = ref('motorcycle')

const motorCycleInput = ref({
  partOne: null,
  partTwo: null,
})
</script>

<style lang="scss" scoped></style>
