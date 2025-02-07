<template>
  <div>
    <div class="pr-2 pt-1 text-3xl font-bold text-[#141A31]">ایجاد درخواست جدید</div>
    <div>
      <v-form class="flex-column pr-2 pl-2 mt-8" @submit.prevent="orderRequestFormSubmitHandler">
        <v-row>
          <v-col cols="10" sm="6">
            <div class="font-sm font-medium mb-2">مبدا</div>
            <v-textarea
              v-model="newOrderRequestForm.pickup_location"
              prepend-inner-icon="mdi-map-marker-outline"
              placeholder="لطفا آدرس مبدا خود راوارد کنید"
              row-height="10"
              rows="1"
              variant="outlined"
              auto-grow
            ></v-textarea>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="font-sm font-medium mb-2">مقصد</div>
            <v-textarea
              v-model="newOrderRequestForm.dropoff_location"
              prepend-inner-icon="mdi-map-marker"
              placeholder="لطفا آدرس مقصد خود راوارد کنید"
              row-height="10"
              rows="1"
              variant="outlined"
              auto-grow
            ></v-textarea>
          </v-col>
          <!-- نمایش نقشه -->
          <v-col cols="12">
            <div class="font-sm font-medium mb-2">انتخاب مبدا و مقصد از روی نقشه</div>
            <neshanMap/>
          </v-col>
          <v-col cols="10" sm="6">
            <div class="font-sm font-medium mb-2">وزن</div>
            <v-textarea
              v-model="newOrderRequestForm.weight"
              prepend-inner-icon="mdi-scale"
              placeholder="وزن بسته خود را وارد کنید"
              row-height="10"
              rows="1"
              variant="outlined"
              auto-grow
              shaped
            ></v-textarea>
          </v-col>
          <v-col cols="10" sm="6">
            <div class="font-sm font-medium mb-2">نوع بسته ارسالی</div>
            <v-select
              v-model="newOrderRequestForm.type"
              clearable
              placeholder="پاکت"
              row-height="8"
              :items="['پاکت', 'جعبه کوچک','جعبه بزرگ','جعبه متوسط']"
              variant="outlined"
            ></v-select>
          </v-col>
          <v-col>
            <div class="font-sm font-medium mb-2">توضیحات</div>
            <v-textarea
              v-model="newOrderRequestForm.description"
              placeholder="در صورت نیاز توضیحات مربوط به بسته خود را وارد کنید مانند نام گیرنده و..."
              variant="outlined"
              auto-grow
              shaped
            ></v-textarea>
          </v-col>
        </v-row>

        <div class="flex justify-end">
          <v-btn class="font-sm font-medium" size="large" type="submit" color="blue">ثبت سفارش</v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import axiosInstance from '~/utils/axiosinstance.js';
import neshanMap from '~/components/NeshanMap.vue';

definePageMeta({ layout: 'panel' });

const { $swal } = useNuxtApp();

const newOrderRequestForm = ref({
  type: null,
  description: null,
  pickup_location: null,
  dropoff_location: null,
  weight: null,
});

const orderRequestFormSubmitHandler = async () => {
  try {
    const response = await axiosInstance.post('/customer/order-requests', newOrderRequestForm.value);
    console.log(response);

    $swal.fire({
      icon: "success",
      title: "سفارش شما با موفقیت ثبت شد",
      draggable: true,
      position: 'center',
      timer: 2000,
      showConfirmButton: false,
    });

    newOrderRequestForm.value = {
      type: null,
      description: null,
      pickup_location: null,
      dropoff_location: null,
      weight: null,
    };
  } catch (e) {
    console.log(e);

    $swal.fire({
      icon: "error",
      title: "مشکل در ثبت سفارش",
      draggable: true,
      position: 'center',
      timer: 2000,
      showConfirmButton: false,
    });
  }
};

</script>

<style scoped>

</style>