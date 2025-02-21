<template>
  <div class="pr-4 pt-1 mb-4 text-3xl text-[#141A31]">لیست سفارشات</div>
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
        <template #item.created-at="{ item }">
          {{ formatDate(item.created_at) }}
        </template>
        <template class="w-36" #item.updated-at="{ item }">
          {{ formatDate(item.updated_at) }}
        </template>
        <template #item.pickup_location="{ item }">
          {{ item.order_request.pickup_location }}
        </template>
        <template #item.dropOff_location="{ item }">
          {{ item.order_request.dropoff_location }}
        </template>
        <template #item.cost="{ item }">
          {{ item.order_request.cost + ' تومان' }}
        </template>
        <template class="w-36" #item.status="{ item }">
          <v-chip :class="getStatusClass(item.status)">
              {{ getStatusPersian(item.status) }}
            </v-chip>
        </template>
      </v-data-table>
    </div>
  </div>
</template>
<script setup>
import axiosInstance from '~/utils/axiosinstance.js'
import { formatDate } from '~/utils/formatDate'

definePageMeta({
  layout: 'panel',
})

const items = ref([])

// Table headers
const headers = ref([
  { title: 'شماره', key: 'id', align: 'center' },
  { title: 'نوع بسته ', key: 'type', align: 'center' },
  { title: 'تاریخ پذیرش', key: 'created-at', align: 'center' },
  { title: 'تاریخ آخرین تغییرات', key: 'updated-at', align: 'center' },
  { title: 'مبدا', key: 'pickup_location', align: 'center' },
  { title: 'مقصد', key: 'dropOff_location', align: 'center' },
  { title: 'هزینه ارسال', key: 'cost', align: 'center' },
  { title: 'وضعیت', key: 'status', align: 'center' },
])

// Fetch order list
const fetchOrderList = async () => {
  try {
    const response = await axiosInstance.get('/courier/orders')
    items.value = response.data
    console.log(response)
  } catch (e) {
    console.error('Error fetching order list:', e)
  }
}

// Status class handler
const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case 'waiting_for_pickup':
      return 'text-orange'
    case 'in_delivery':
      return 'text-blue'
    case 'delivered':
      return 'text-green'
    case 'canceled':
      return 'text-red'
    default:
      return ''
  }
}
const getStatusPersian = (status) => {
  switch (status.toLowerCase()) {
    case 'waiting_for_pickup':
      return 'در انظار دریافت'
    case 'in_delivery':
      return 'در حال ارسال'
    case 'delivered':
      return 'تحویل داده شده'
    case 'canceled':
      return 'کنسل شده'  
    default:
      return ''
  }
}

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
