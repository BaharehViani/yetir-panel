<template>
  <div class="pr-6 pt-1 mb-4 text-3xl text-[#141A31]">لیست سفارشات</div>
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
        <template #item.courier-name="{ item }">
          {{ item.courierinfo.user.first_name +' '+ item.courierinfo.user.last_name }}
        </template>
        <template #item.="{ item }">
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
  { title: 'شماره', key: 'id', width: '80px' },
  { title: 'نوع بسته ارسالی', key: 'type', width: '130px' },
  { title: 'تاریخ پذیرش', key: 'created-at', width: '130px' },
  { title: 'تاریخ آخرین تغییر', key: 'updated-at', width: '130px' },
  { title: 'مبدا', key: 'pickup_location', width: '130px' },
  { title: 'مقصد', key: 'dropOff_location',width: '130px' },
  { title: 'نام پیک', key: 'courier-name',width: '130px' },
  { title: 'هزینه ارسال', key: 'cost',width: '130px' },
  { title: 'وضعیت', key: 'status',width: '130px' },
])

// Fetch order list
const fetchOrderList = async () => {
  try {
    const response = await axiosInstance.get('/customer/orders')
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
