<template>
  <div>
    <div v-if="items.length > 0">
      <v-data-table
        :headers="headers"
        :items="items"
        disable-sort
        hide-default-footer
        color="red"
        class="mr-2"
      >
        <template class="w-36 align-center" #item.id="{ item }">
          {{ item.id }}
        </template>
        <template class="w-36" #item.type="{ item }">
          {{ item.order_request.type }}
        </template>
        <template class="w-36" #item.updated-at="{ item }">
          {{ item.updated_at }}
        </template>
        <template #item.pickup_location="{ item }">
          {{ item.order_request.pickup_location }}
        </template>
        <template #item.dropOff_location="{ item }">
          {{ item.order_request.dropoff_location }}
        </template>
        <template #item.fee="{ item }">
          {{ item.order_request.cost }}
        </template>
        <template #item.status="{ item }">
          <v-chip :class="getStatusClass(item.status)" variant="outlined">
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
  { title: 'شماره', key: 'id' },
  { title: 'نوع بسته ارسالی', key: 'type' },
  { title: 'تاریخ ثبت', key: 'updated-at' },
  { title: 'مبدا', key: 'pickup_location' },
  { title: 'مقصد', key: 'dropOff_location' },
  { title: 'هزینه ارسال', key: 'fee' },
  { title: 'وضعیت', key: 'status' },
])

// Fetch order list
const fetchOrderList = async () => {
  try {
    const response = await axiosInstance.get('/customer/orders')
    items.value = response.data
    console.log(response) // Update the table data with the fetched response
  } catch (e) {
    console.error('Error fetching order list:', e)
  }
}

// Status class handler
const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case 'waiting_for_pickup':
      return 'text-yellow'
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

//Fetch data on component mount
onMounted(() => {
  fetchOrderList()
})
</script>

<style lang="scss" scoped>
.text-green {
  background-color: #00b69b;
  opacity: 20%;
}

.text-red {
  background-color: #ef3826;
  opacity: 20%;
}

.text-blue {
  background-color: #6226ef;
  opacity: 20%;
}

.text-yellow {
  background-color: #fec53d;
  opacity: 80%;
}
</style>
