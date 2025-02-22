<template>
  <div class="pr-2 pt-1 mb-4 text-3xl text-[#141A31]">لیست درخواست ها</div>
    <div v-if="items.length > 0">
      <v-data-table
        :headers="headers"
        :items="items"
        hide-default-footer
        class="text-center"
        color="red"
      >
        <template class="w-36 text-center" #item.id="{ item }">
          {{ item.code }}
        </template>
        <template class="w-36" #item.type="{ item }">
          {{ item.type }}
        </template>
        <template class="w-36" #item.created-at="{ item }">
          {{ formatDate(item.created_at) }}
        </template>
        <template #item.pickup_location="{ item }">
          {{ item.pickup_location }}
        </template>
        <template #item.dropOff_location="{ item }">
          {{ item.dropoff_location }}
        </template>
        <template #item.weight="{ item }">
          {{ item.weight + ' گرم' }}
        </template>
        <template #item.cost="{ item }">
          {{ item.cost + ' تومان' }}
        </template>
        <template #item.status="{ item }">
          <v-chip :class="getStatusClass(item.status)">
              {{ getStatusPersian(item.status) }}
            </v-chip>
        </template>
      </v-data-table>
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
  { title: 'نوع بسته', key: 'type', align: 'center' },
  { title: 'تاریخ ثبت', key: 'created-at', align: 'center' },
  { title: 'مبدا', key: 'pickup_location', align: 'center' },
  { title: 'مقصد', key: 'dropOff_location', align: 'center' },
  { title: 'توضیحات', key: 'description', align: 'center' },
  { title: 'وزن', key: 'weight', align: 'center' },
  { title: 'هزینه ارسال', key: 'cost', align: 'center', align: 'center' },
  { title: 'وضعیت', key: 'status', align: 'center' },
])

// Fetch order list
const fetchOrderList = async () => {
  try {
    const response = await axiosInstance.get('/customer/order-requests/')
    items.value = response.data
    console.log(response)
  } catch (e) {
    console.error('Error fetching order list:', e)
  }
}

// Status class handler
const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'text-blue'
    case 'accepted':
      return 'text-green'
    case 'declined':
      return 'text-red'
    default:
      return ''
  }
}
const getStatusPersian = (status) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'در انتظار  پذیرش'
    case 'accepted':
      return 'قبول شده'
    case 'declined':
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

</style>
