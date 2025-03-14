<template>
  <div class="pr-2 pt-1 mb-4 font-bold text-3xl text-[#141A31]">سفارش جاری</div>
  <div class="p-0">
    <div v-if="items.length >= 0">
      <v-data-table
          :headers="headers"
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
          {{ formatDate(item.updated_at) }}
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
          <div class="status-cell">
            <v-select
                v-model="item.status"
                :items="statusOptions"
                item-text="title"
                item-value="key"
                chips
                variant="outlined"
                rounded="xl"
                class="mt-6"
                :class="getStatusClass(item.status)"
                @update:modelValue="(newValue) => updateStatus(item, newValue)"
            ></v-select>
          </div>
        </template>
      </v-data-table>
    </div>
    <div v-show="items.length > 0">
      <neshanMap ref="neshanMapRef"/>
    </div>
  </div>
</template>

<script setup>
import axiosInstance from '~/utils/axiosinstance.js'
import { formatDate } from '~/utils/formatDate'
import neshanMap from '~/components/NeshanMap.vue';

definePageMeta({
  layout: 'panel',
})

const neshanMapRef = ref(null);

const { $swal } = useNuxtApp()

const items = ref([])

// Table headers
const headers = ref([
  { title: 'شماره', key: 'id', align: 'center' },
  { title: 'نوع بسته', key: 'type', align: 'center' },
  { title: 'تاریخ ثبت', key: 'updated-at', align: 'center' },
  { title: 'مبدا', key: 'pickup_location', align: 'center' },
  { title: 'مقصد', key: 'dropOff_location', align: 'center' },
  { title: 'وزن', key: 'weight', align: 'center' },
  { title: 'هزینه ارسال', key: 'cost', align: 'center' },
  { title: 'وضعیت', key: 'status', align: 'center' },

])
const statusOptions = ref([
  { title: 'در انتظار دریافت', key: 'waiting_for_pickup' },
  { title: 'در حال ارسال', key: 'in_delivery' },
  { title: 'تحویل داده شده', key: 'delivered' },
  { title: 'کنسل کردن سفارش', key: 'canceled' },
])

// Fetch order list
const fetchOrderList = async () => {
  try {
    const response = await axiosInstance.get('/courier/orders/active')
    items.value = [response.data]

    console.log(response)
  } catch (e) {
    console.error('Error fetching order list:', e)
  }
}

const updateStatus = async (item, newValue) => {
  try {
    if(newValue === "canceled"){

      $swal.fire({
        icon: 'question',
        title: 'آیا از کنسل کردن سفارش مطمئن هستید؟',
        showCancelButton: true,
        confirmButtonColor: "#8FD14F",
        cancelButtonColor: "#d33",
        confirmButtonText: "لغو سفارش",
        cancelButtonText: "انصراف",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axiosInstance.patch(`/courier/orders/${item.id}`, {
              status: item.status,
            })

            console.log(response.data)
            $swal.fire({
              title: "سفارش انتخاب شده لغو شد!",
              icon: "success"
            });

          }catch (e){
            console.error('Error updating status:', e)

            $swal.fire({
              icon: 'error',
              title: 'خطا در به‌روزرسانی وضعیت',
              timer: 2000,
              showConfirmButton: false,});
          }
        }
      });
    }else{
      const response = await axiosInstance.patch(`/courier/orders/${item.id}`, {
        status: item.status,
      })

      console.log(response.data)

      $swal.fire({
        icon: 'success',
        title: 'وضعیت با موفقیت به‌روزرسانی شد',
        timer: 2000,
        showConfirmButton: false,
      })

      console.log('Status updated:', response.data)
    }

  } catch (e) {
    console.error('Error updating status:', e)

    $swal.fire({
      icon: 'error',
      title: 'خطا در به‌روزرسانی وضعیت',
      timer: 2000,
      showConfirmButton: false,
    })
  }
}

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

//Fetch data on component mount
onMounted(async () => {
  await fetchOrderList();
  nextTick(() => {
    if (items.value.length > 0) {
      const currnetOrder = items.value[0].order_request;
      if (currnetOrder.pickup_lat && currnetOrder.pickup_lng && currnetOrder.dropoff_lat && currnetOrder.dropoff_lng) {
        neshanMapRef.value?.fetchRoute(
          { lat: currnetOrder.pickup_lat, lng: currnetOrder.pickup_lng },
          { lat: currnetOrder.dropoff_lat, lng: currnetOrder.dropoff_lng }
        );
      } else {
        neshanMapRef.value?.fetchRoute(
          currnetOrder.pickup_location,
          currnetOrder.dropoff_location
        );
      }
    }
  });
});

</script>

<style lang="scss" scoped>
.status-cell {
  min-width: 181px; // مقدار را به دلخواه تغییر دهید
}
</style>
