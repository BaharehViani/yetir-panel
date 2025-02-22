<template>
  <div class="pr-2 pt-1 mb-4 text-3xl text-[#141A31]">لیست درخواست ها</div>
  <div  class="p-0">
    <div v-if="items.length >= 0">
<!--      Data table setting-->
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
        <template class="w-36" #item.updated-at="{ item }">
          {{ formatDate(item.updated_at) }}
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
        <template #item.accept="{ item }">
          <v-chip class="cursor-pointer" @click="orderAccepted(item.id)">
            قبول سفارش
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

const { $swal } = useNuxtApp()

const items = ref([])

// Table headers
const headers = ref([
  { title: 'شماره', key: 'id', align: 'center' },
  { title: 'نوع بسته', key: 'type', align: 'center' },
  { title: 'تاریخ ثبت', key: 'updated-at', align: 'center' },
  { title: 'مبدا', key: 'pickup_location', align: 'center' },
  { title: 'مقصد', key: 'dropOff_location', align: 'center' },
  { title: 'توضیحات', key: 'description', align: 'center' },
  { title: 'وزن', key: 'weight', align: 'center' },
  { title: 'هزینه ارسال', key: 'cost', align: 'center' },
  { title: 'پذیرش سفارش', key: 'accept', align: 'center' },
])

// Fetch order list
const fetchOrderList = async () => {
  try {
    const response = await axiosInstance.get('/courier/order-requests/')
    items.value = response.data
    console.log(response)

  } catch (e) {
    console.error('Error fetching order list:', e)
  }
}
const orderAccepted = async (id) => {
  try {
    $swal.fire({
      title: "آیا از قبول سفارش انتخاب شده اطمینان دارید؟",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#8FD14F",
      cancelButtonColor: "#d33",
      confirmButtonText: "قبول سفارش",
      cancelButtonText: "لغو",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Post the request ID to the new endpoint
          const response = await axiosInstance.post('/courier/orders/', { order_request_id: id })
          console.log('Order accepted:', response)

          $swal.fire({
            title: "سفارش از سمت شما قبول شد",
            text: "برای نمایش اطلاعات دقیق تر به صفحه سفارشات مراجعه کنید",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          })
        } catch (error) {
          console.error('Error accepting order:', error)
          $swal.fire({
            title: "خطا در پذیرش سفارش",
            text: "لطفاً دوباره تلاش کنید",
            icon: "error",
          })
        }
      }
    })
  } catch (e) {
    console.error('Error in SweetAlert:', e)
  }
}

//Fetch data on component mount
onMounted(() => {
  fetchOrderList()
})

</script>

<style lang="scss" scoped>

</style>
