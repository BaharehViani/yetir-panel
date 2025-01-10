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
      <div v-if="inputType === 'car'">
        <div class="flex items-center flex-row-reverse">
          <v-otp-input v-model="carInput.partOne" :length="2" dir="ltr" />
          <v-select
            variant="outlined"
            v-model="carInput.letter"
            dir="ltr"
            :items="letterOptions"
            hide-details
            min-width="80px"
          />
          <v-otp-input v-model="carInput.partTwo" :length="3" dir="ltr" />
          <div class="h-6 w-1 border-l-2" />
          <v-otp-input v-model="carInput.partThree" :length="2" dir="ltr" />
        </div>
      </div>

      <div v-if="inputType === 'motorcycle'">
        <v-otp-input v-model="motorCycleInput.partOne" :length="3" dir="ltr" />
        <v-divider class="border-opacity-75" />
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

const inputType = ref(null)

const letterOptions = ref([
  'الف',
  'ب',
  'پ',
  'ت',
  'ث',
  'ج',
  'چ',
  'ح',
  'خ',
  'د',
  'ذ',
  'ر',
  'ز',
  'ژ',
  'س',
  'ش',
  'ص',
  'ض',
  'ط',
  'ظ',
  'ع',
  'غ',
  'ف',
  'ق',
  'ک',
  'ل',
  'م',
  'ن',
  'و',
  'ه',
  'ی',
])

const carInput = ref({
  partOne: null,
  letter: null,
  partTwo: null,
  partThree: null,
})

const carInputSanitized = computed(() =>
  carInput.value.partOne &&
  carInput.value.letter &&
  carInput.value.partTwo &&
  carInput.value.partThree
    ? `${carInput.value.partOne}${carInput.value.letter}${carInput.value.partTwo}-${carInput.value.partThree}`
    : null,
)

const motorCycleInput = ref({
  partOne: null,
  partTwo: null,
})

const motorcycleInputSanitized = computed(() =>
  motorCycleInput.value.partOne && motorCycleInput.value.partTwo
    ? `${motorCycleInput.value.partOne}-${motorCycleInput.value.partTwo}`
    : null,
)

const emitter = (value) => {
  model.value = value
}

watch(carInputSanitized, emitter)
watch(motorcycleInputSanitized, emitter)
</script>

<style lang="scss" scoped></style>
