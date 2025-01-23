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
          <template class="w-36" #item.code="{ item }">
            {{ item.order.code }}
          </template>
          <template class="w-36" #item.total="{ item }">
            {{ formatPrice(item.total) }}
          </template>
          <template #item.tax="{ item }">
            {{ formatPrice(item.grand_total) }}
          </template>
          <template #item.grand_total="{ item }">
            {{ formatPrice(item.grand_total) }}
          </template>
          <template #item.status="{ item }">
            <v-chip :class="getStatusClass(item.status)">
              {{ getStatusPersian(item.status) }}
            </v-chip>
          </template>
          <template #item.actions="{ item }">
            <v-btn
              color="primary"
              class="rounded w-25"
              :disabled="item.status !== 'pending'"
              @click="() => update(item)"
            >
              پرداخت
            </v-btn>
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
import { formatPrice } from '../../../../utils/numbers.js'
const items = ref([])

const headers = ref([
  { title: 'شماره سفارش', key: 'code' },
  { title: 'فی قیمت', key: 'total' },
  { title: 'مالیات', key: 'tax' },
  { title: 'مبلغ نهایی', key: 'grand_total' },
  { title: 'وضعیت', key: 'status' },
  { title: 'عملیات', key: 'actions' },
])

const fetchOrderList = async () => {
  try {
    const response = await axiosInstance.get('/customer/invoices/all')
    items.value = response.data
    console.log(response)
  } catch (e) {
    console.error('Error fetching invoice list:', e)
  }
}

const update = async (item) => {
  try {
    const response = await axiosInstance.patch(`/customer/invoices/${item.id}`)
    console.log(response)
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

const getStatusPersian = (status) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'در انتظار پرداخت'
    case 'paid':
      return 'پرداخت شده'
    case 'canceled':
      return 'کنسل شده'
    default:
      return ''
  }
}

onMounted(() => {
  fetchOrderList()
})

definePageMeta({
  layout: 'bill',
})
</script>

<style lang="scss"></style>
