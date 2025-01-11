<template>
  <div>
    <div v-if="items.length > 0">
      <v-data-table
        :headers="headers"
        :items="items"
        hide-default-footer
        color="red"
        class="mr-2 text-center"
      >
        <template class="w-36 text-center" #item.id="{ item }">
          {{ item.code }}
        </template>
        <template class="w-36 text-center" #item.type="{ item }">
          {{ item.order_request.type }}
        </template>
        <template #item.created_at="{ item }">
          {{ item.created_at }}
        </template>
        <template class="w-36" #item.updated_at="{ item }">
          {{ item.updated_at }}
        </template>
        <template #item.pickup_location="{ item }">
          {{ item.order_request.pickup_location }}
        </template>
        <template #item.dropOff_location="{ item }">
          {{ item.order_request.dropoff_location }}
        </template>
        <template #item.="{ item }">
          {{ item.order_request.dropoff_location }}
        </template>
        <template #item.cost="{ item }">
          {{ item.order_request.cost + ' تومان' }}
        </template>
        <template  #item.status="{ item }">
          <v-chip
            :class="getStatusClass(item.status)"
          >
            {{ item.status }}
          </v-chip>
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

const items = ref([])

// Table headers
const headers = ref([
  { title: 'شماره', key: 'code', width: '80px' },
  { title: 'نوع بسته ارسالی', key: 'type' },
  { title: 'تاریخ ثبت', key: 'created_at' },
  { title: 'تاریخ اخرین تغییرات', key: 'updated_at'},
  { title: 'مبدا', key: 'pickup_location'},
  { title: 'مقصد', key: 'dropOff_location'},
  { title: 'هزینه ارسال', key: 'cost' },
  { title: 'وضعیت', key: 'status' },
])

// Fetch order list
const fetchOrderList = async () => {
  try {
    const response = await axiosInstance.get('/courier/orders/active')
    items.value = response.data

    console.log(response.data) // Update the table data with the fetched response
  } catch (e) {
    console.error('Error fetching order list:', e)
  }
}

// Status class handler
// const getStatusClass = (status) => {
//   switch (status.toLowerCase()) {
//     case 'waiting_for_pickup':
//       return 'text-orange'
//     case 'in_delivery':
//       return 'text-blue'
//     case 'delivered':
//       return 'text-green'
//     case 'canceled':
//       return 'text-red'
//     default:
//       return ''
//   }
// }

//Fetch data on component mount
onMounted(() => {
  fetchOrderList()
})
</script>

<style lang="scss" scoped>

.text-center {
  text-align: center;
}
</style>
