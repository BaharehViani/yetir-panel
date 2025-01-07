<template xmlns="http://www.w3.org/1999/html">
  <div class="w-274 pb-8 bg-[#FFFFFF] new-order flex-column rounded-2xl pl-6">
    <div class="pr-6 pt-8 text-3xl font-bold text-[#141A31]">ایجاد سفارش جدید</div>
    <div>
      <div class="flex-column pr-6 mt-8">
        <v-row>
          <v-col
            cols="10"
            sm="6"
          >
            <div class="font-sm font-medium mb-2">مبدا</div>
            <v-textarea
              prepend-inner-icon="mdi-map-marker-outline"
              placeholder="لطفا آدرس مبدا خود راوارد کنید"
              row-height="10"
              rows="1"
              variant="outlined"
              auto-grow
            ></v-textarea>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <div class="font-sm font-medium mb-2">مقصد</div>
            <v-textarea
              prepend-inner-icon="mdi-map-marker"
              placeholder="لطفا آدرس مقصد خود راوارد کنید"
              row-height="10"
              rows="1"
              variant="outlined"
              auto-grow
            ></v-textarea>
          </v-col>
          <v-col
            cols="10"
            sm="6"
          >
            <div class="font-sm font-medium mb-2">وزن</div>
            <v-textarea
              prepend-inner-icon="mdi-scale"
              placeholder="وزن بسته خود را وارد کنید"
              row-height="10"
              rows="1"
              variant="outlined"
              auto-grow
              shaped
            ></v-textarea>
          </v-col>
          <v-col
            cols="10"
            sm="6"
          >
            <div class="font-sm font-medium mb-2">نوع بسته ارسالی</div>
            <v-select
              clearable
              placeholder="پاکت"
              row-height="8"
              :items="['پاکت', 'جعبه کوچک','جعبه بزرگ','جعبه متوسط']"
              variant="outlined"
            ></v-select>
          </v-col>
          <v-col

          >
            <div class="font-sm font-medium mb-2">توضیحات</div>
            <v-textarea
              placeholder="توضیحات بسته خود را اضافه کنید"
              variant="outlined"
              auto-grow
              shaped
            ></v-textarea>
          </v-col>
        </v-row>

      </div>
    </div>
    <div class="flex justify-end">
      <v-btn
        class="font-sm font-medium"
        size="large"


        color="blue"
      >ثبت سفارش</v-btn>
    </div>
  </div>
</template>

<script setup>

definePageMeta({
  layout: 'panel'
})
</script>

<style lang="scss" scoped>

</style>