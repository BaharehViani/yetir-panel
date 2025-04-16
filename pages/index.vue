<template>
  <div class="bg">
    <div class="w-full">
      <div class="bg-white mt-10 mx-20 rounded-2xl p-4 shadow-lg">
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
            ورود به حساب کاربری
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
          <div class="text-[26px] mt-4 text-[#2c3659]">
            مهم نیست بسته ای که میخوای بفرستی پاکت باشه یا جعبه، بزرگ باشه یا کوچیک، سنگین باشه یا سبک
            ما سالم میرسونیمش به مقصد!
          </div>
          <div class="mt-8 flex justify-start">
            <v-btn style="width: 300px; font-size: 17px; height: 42px;" prepend-icon="mdi-login-variant" color="#0047FF" rounded="xl" @click="navigateTo('/sign-up')">همین الان شروع کن</v-btn>
          </div>
        </div>
        <div class="ml-12">
          <v-img :src="PostMan" alt="postman" width="800" height="570"></v-img>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Logo from 'assets/images/logolanding.png'
import PostMan from 'assets/images/courier_pic.png'
import { onMounted } from "vue";
onMounted(() => {
  const extraDiv = document.querySelector('div[style*="height: 300vh"]');
  if (extraDiv) {
    extraDiv.remove();
  }
});
</script>

<style lang="scss" scoped>
.bg {
  min-height: 100vh;
  display: flex;
  justify-content: start;
  align-items: start;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  background: linear-gradient(109.6deg, rgb(9, 154, 151) 11.2%, rgb(21, 205, 168) 91.1%);
}
</style>