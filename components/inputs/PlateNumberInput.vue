<template>
  <div class="flex flex-col items-center">
    <v-select
      label="نوع وسیله نقلیه"
      variant="outlined"
      v-model="inputType"
      :items="inputTypeOptions"
      item-title="text"
      item-value="value"
      class="w-2/3"
    />

    <div class="w-2/3 items-center flex-col">
      <div v-if="inputType === 'car'">
        <div class="flex items-center flex-row-reverse">
          <v-otp-input
            v-model="carInput.partOne"
            :length="2"
            placeholder="۱"
            dir="ltr"
          />
          <v-select
            variant="outlined"
            v-model="carInput.letter"
            :items="letterOptions"
            placeholder="ط"
            hide-details
            min-width="60px"
          />
          <v-otp-input
            v-model="carInput.partTwo"
            :length="3"
            dir="ltr"
            placeholder="۲"
          />
          <div class="h-6 w-1 border-l-2" />
          <v-otp-input
            v-model="carInput.partThree"
            :length="2"
            dir="ltr"
            placeholder="۱"
          />
        </div>
      </div>
      <div class="flex items-center justify-center">
        <div v-if="inputType === 'motorcycle'" class="w-2/3">
          <v-otp-input
            v-model="motorCycleInput.partOne"
            :length="3"
            placeholder="۳"
            dir="ltr"
          />
          <v-divider class="border-opacity-75" />
          <v-otp-input
            v-model="motorCycleInput.partTwo"
            :length="5"
            placeholder="۵"
            dir="ltr"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const model = defineModel()
const vehicleModel = defineModel('vehicle')

const inputTypeOptions = ref([
  { text: 'اتومبیل', value: 'car' },
  { text: 'موتور', value: 'motorcycle' },
])

const inputType = ref(null)

watch(inputType, (v) => {
  vehicleModel.value = v
})

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
