<template>
  <div class="bg">
    <div class="w-full">
      <div class="bg-white ml-16 mt-10 mx-16 rounded-2xl p-4 shadow-lg">
        <div class="flex justify-between items-center">
          <div class="flex justify-between items-center">
            <div>
              <v-img :src="Logo" alt="logo" width="200"></v-img>
            </div>

            <!-- Menu Items -->
            <div class="flex gap-8 text-[#0047FF] mr-12 text-[18px]">
              <div class="cursor-pointer hover:underline">خدمات</div>
              <div class="cursor-pointer hover:underline">
                از کجا شروع کنم ؟
              </div>
              <div class="cursor-pointer hover:underline">همکاری با ما</div>
              <div class="cursor-pointer hover:underline">درباره ما</div>
            </div>
          </div>

          <v-btn prepend-icon="mdi-login-variant" color="#0047FF" rounded="lg" @click="navigateTo('/login')">
            ورود به حساب
          </v-btn>
        </div>
      </div>
      <div class="mt-10 flex justify-space-between">
        <div class="max-w-2xl text-white text-right mt-16 mr-28">
          <div class="text-5xl">
            با
            <span class="text-[#0047FF]">یتیر</span>
            ، ارسال سریع و مطمئن مرسولات درون‌شهری را تجربه کنید!
          </div>
          <div class="text-l mt-4 text-[#E3E3E3]">
            مهم نیست بسته ای که میخوای بفرستی پاکت باشه یا جعبه، بزرگ باشه یا کوچیک، سنگین باشه یا سبک
            ما سالم میرسونیمش به مقصد!
          </div>
          <div class="mt-6 ml-96">
            <v-btn block prepend-icon="mdi-login-variant" color="#0047FF" rounded="xl" @click="navigateTo('/sign-up')">همین الان شروع کن</v-btn>
          </div>
        </div>
        <div class="ml-12">
          <v-img :src="PostMan" alt="postman" width="589" height="823"></v-img>

          <div class="absolute justify-space-between flex text-right bottom-96 left-6 bg-white text-black px-6 py-3 h-[77px] w-[220px] rounded-lg shadow-lg text-[16px]">
            <div class="flex ml-2">
              <v-avatar color="green" class="mt-1.5">
              </v-avatar>
            </div>
            <div>
              ۳۰۰+
              سفارش‌های در حال ارسال
            </div>

          </div>
          <div class="absolute justify-space-between flex text-right bottom-64 left-96 bg-white text-black px-9 py-3 h-[77px] w-[220px] rounded-lg shadow-lg text-[16px]">
            <div class="flex ml-2">
              <v-avatar color="blue" class="mt-1.5">
              </v-avatar>
            </div>
            <div>
              ۲۶۰+
              تحویل موفق امروز
            </div>

          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script setup>
import Logo from 'assets/images/logolanding.png'
import PostMan from 'assets/images/postman.png'
// onMounted(() => {
//   navigateTo('/_')
// })

import User1 from 'assets/images/user1.png'
</script>

<style lang="scss" scoped>
.bg {
  display: flex;
  justify-content: start;
  align-items: start;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  min-height: 100vh;

  background: linear-gradient(
          90deg,
          rgba(94, 252, 232, 1) 0%,
          rgba(115, 110, 254, 1) 100%
  );
}
</style>