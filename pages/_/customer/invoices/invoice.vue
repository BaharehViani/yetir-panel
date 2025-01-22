<template>
  <div>
      <v-card class="py-5 px-8 flex-col" :rounded="false" flat>
        <div>
        <v-data-table
          :headers="headers"
          :items="items"
          hide-default-footer
          color="red"
          class="mr-2"
        >
          <template class="w-36" #item.id="{ item }">
            {{ item.order.code }}
          </template>
          <template class="w-36" #item.sub-total="{ item }">
            {{ item.sub_total }}
          </template>
          <template #item.tax="{ item }">
            {{ item.tax }}
          </template>
          <template #item.total="{ item }">
            {{ item.total }}
          </template>
          <template #item.status="{ item }">
            <v-chip
              :class="getStatusClass(item.status)"
            >
              {{ item.status }}
            </v-chip>
          </template>

        </v-data-table>
        </div>


        <v-divider class="my-8"></v-divider>
        <v-row class="text-center">
          <v-col>
            <p class="text-caption">
              برای تکمیل پرداخت روی دکمه پرداخت کلیک کنید
            </p>
          </v-col>
        </v-row>
    </v-card>
  </div>
</template>

<script setup>

import axiosInstance from '~/utils/axiosinstance.js'

const items = ref([


])

const headers = ref([
  { title: 'شماره سفارش', key: 'code' },
  { title:'فی قیمت' , key: 'sub_total'},
  { title:'مالیات' , key: 'tax'},
  { title:'مبلغ نهایی' , key: 'total'},
  { title:'وضعیت' , key: 'status'},
])

const fetchOrderList = async () => {
  try {
    const response = await axiosInstance.get('/customer/invoices/all')
    items.value = response.data
    console.log(response) // Update the table data with the fetched response
  } catch (e) {
    console.error('Error fetching invoice list:', e)
  }
}

const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'text-blue'
    case 'paid':
      return 'text-green'
    case 'canceled':
      return 'text-red'
    default:
      return ''
  }
}

onMounted(() => {
  fetchOrderList()
})

definePageMeta({
  layout: 'form'
})
</script>

<style lang="scss">
</style>