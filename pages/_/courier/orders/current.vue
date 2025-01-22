<template>
  <div class="p-0">
    <div v-if="items.length > 0">
      <v-data-table
        :headers=" headers"
        :items="items"
        hide-default-footer
        class="text-center"
        color="red"
      >
        <template #item.id="{ item }">
          {{ item.code }}
        </template>
        <template #item.type="{ item }">
          {{ item.order_request.type }}
        </template>
        <template #item.updated-at="{ item }">
          {{ item.updated_at }}
        </template>
        <template #item.pickup_location="{ item }">
          {{ item.order_request.pickup_location }}
        </template>
        <template #item.dropOff_location="{ item }">
          {{ item.order_request.dropoff_location }}
        </template>
        <template #item.weight="{ item }">
          {{ item.order_request.weight + ' گرم' }}
        </template>
        <template #item.cost="{ item }">
          {{ item.order_request.cost + ' تومان' }}
        </template>
        <template #item.status="{ item }">
          <v-chip :class="getStatusClass(item.status)"
          >
            {{ item.status }}
          </v-chip>
          <v-select
          chips
          :items="getStatusClass(item.status)"
          variant="outlined"
          rounded="xl"
          ></v-select>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script setup>
import axiosInstance from '~/utils/axiosinstance.js'

definePageMeta({
  layout: 'panel',
})

const { $swal } = useNuxtApp()

const items = ref([])

// Table headers
const headers = ref([
  { title: 'شماره', key: 'id' },
  { title: 'نوع بسته ارسالی', key: 'type' },
  { title: 'تاریخ ثبت', key: 'updated-at' },
  { title: 'مبدا', key: 'pickup_location' },
  { title: 'مقصد', key: 'dropOff_location' },
  // { title: 'توضیحات', key: 'description' },
  { title: 'وزن', key: 'weight' },
  { title: 'هزینه ارسال', key: 'cost' },
  { title: 'وضعیت', key: 'status' },
  // { title: 'پذیرش سفارش', key: 'accept' },
])

// Fetch order list
const fetchOrderList = async () => {
  try {
    const response = await axiosInstance.get('/courier/orders/active')
    items.value = [response.data]

    console.log(response) // Update the table data with the fetched response

  } catch (e) {
    console.error('Error fetching order list:', e)
  }
}

//Fetch data on component mount
onMounted(() => {
  fetchOrderList()
})
const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case 'waiting_for_pickup':
      return 'text-blue'
    case 'in_delivery':
      return 'text-green'
    case 'delivered':
      return 'text-red'
    default:
      return ''
  }
}

</script>

<style lang="scss" scoped>

</style>

