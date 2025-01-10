<template>
  <div  class="p-0">
    <div v-if="items.length > 0">
      <v-data-table
        :headers="headers"
        :items="items"
        hide-default-footer
        class="text-center"
        color="red"
      >
        <template class="w-36 text-center" #item.id="{ index }">
          {{ index + 1 }}
        </template>
        <template class="w-36" #item.type="{ item }">
          {{ item.type }}
        </template>
        <template class="w-36" #item.created-at="{ item }">
          {{ item.created_at }}
        </template>
        <template class="w-36" #item.updated-at="{ item }">
          {{ item.updated_at }}
        </template>
        <template #item.pickup_location="{ item }">
          {{ item.pickup_location }}
        </template>
        <template #item.dropOff_location="{ item }">
          {{ item.dropoff_location }}
        </template>
        <template #item.accept="{ item }">
<!--          {{ item.accept }}-->
        </template>
        <template #item.status="{ item }">
          <v-chip>
            قبول سفارش
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
  { title: 'شماره', key: 'id' },
  { title: 'نوع بسته ارسالی', key: 'type' },
  { title: 'تاریخ ثبت', key: 'updated-at' },
  { title: 'مبدا', key: 'pickup_location' },
  { title: 'مقصد', key: 'dropOff_location' },
  { title: 'توضیحات', key: 'description' },
  { title: 'وزن', key: 'weight' },
  { title: 'هزینه ارسال', key: 'cost' },
  { title: 'پذیرش سفارش', key: 'accept' },
])

// Fetch order list
const fetchOrderList = async () => {
  try {
    const response = await axiosInstance.get('/courier/order-requests/')
    items.value = response.data
    console.log(response) // Update the table data with the fetched response

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

//Fetch data on component mount
onMounted(() => {
  fetchOrderList()
})
</script>

<style lang="scss" scoped>

</style>
