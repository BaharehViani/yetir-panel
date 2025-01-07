<template xmlns="http://www.w3.org/1999/html">
  <div class="w-274 bg-blue new-order flex-column rounded-2xl pl-6">
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
              label="One row"
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
              placeholder="لطفاآدرس مقصد خود راوارد کنید"
              row-height="10"
              rows="1"
              variant="outlined"
              auto-grow
              append-inner-icon="mdi-map-marker-up"
            ></v-textarea>
          </v-col>
          <v-col
            cols="10"
            sm="6"
          >
            <div class="font-sm font-medium mb-2">وزن</div>
            <v-textarea
              label="Three rows"
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
            <v-textarea
              label="لطفا آدرس محلی که بسته را تحویل میدهید بنویسید "
              row-height="8"
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
            <div class="font-sm font-medium mb-2">توضیحات</div>
            <v-textarea
              label="لطفا آدرس محلی که بسته را تحویل میدهید بنویسید "
              row-height="8"
              rows="1"
              variant="outlined"
              auto-grow
              shaped
            ></v-textarea>
          </v-col>
        </v-row>

      </div>
    </div>
    bkadcbhja
  </div>
</template>

<script setup>

definePageMeta({
  layout: 'panel'
})
</script>

<style lang="scss" scoped>

</style>