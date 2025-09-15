<template>
  <div class="bg">
    <div class="w-full">
      <!-- header -->
      <div class="bg-white mt-10 mx-4 lg:!mx-20 rounded-2xl p-4 shadow-lg relative">
        <div class="flex justify-between items-center">
          <div class="flex justify-between items-center">
            <div>
              <v-img :src="Logo" alt="logo" class="header-img w-[220px]"></v-img>
            </div>

            <div class="hidden lg:flex gap-4 xl:gap-8 text-[#0047FF] mr-12 text-[18px]">
              <div class="cursor-pointer hover:underline">خدمات</div>
              <div class="cursor-pointer hover:underline">از کجا شروع کنم ؟</div>
              <div class="cursor-pointer hover:underline">همکاری با ما</div>
              <div class="cursor-pointer hover:underline">درباره ما</div>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <v-btn prepend-icon="mdi-login-variant" color="#0047FF" rounded="lg" @click="navigateTo('/login')">
              <span class="hidden sm:inline">ورود به حساب کاربری</span>
              <span class="inline sm:hidden">ورود</span>
            </v-btn>

            <div class="lg:hidden">
              <v-btn icon aria-label="باز کردن منو" @click="toggleMenu">
                <v-icon>mdi-menu</v-icon>
              </v-btn>
            </div>
          </div>
        </div>

        <transition name="fade">
          <div v-if="isOpen"
            class="lg:hidden absolute left-4 right-4 top-full mt-3 bg-white rounded-xl shadow-lg p-4 z-50">
            <div class="flex flex-col gap-3 text-[#0047FF] text-[16px]">
              <button class="text-right w-full cursor-pointer hover:underline" @click="isOpen = false">خدمات</button>
              <button class="text-right w-full cursor-pointer hover:underline" @click="isOpen = false">از کجا شروع کنم
                ؟</button>
              <button class="text-right w-full cursor-pointer hover:underline" @click="isOpen = false">همکاری با
                ما</button>
              <button class="text-right w-full cursor-pointer hover:underline" @click="isOpen = false">درباره
                ما</button>
            </div>
          </div>
        </transition>
      </div>


      <div class="mt-10 flex flex-col lg:flex-row justify-between items-center lg:items-start">
        <div class="max-w-2xl text-white text-center lg:!text-right mt-0 md:!mt-4 lg:!mt-12 lg:!mr-28 mx-10 lg:!mx-0 lg:w-2/3 xl:w-1/2">
          <div class="text-3xl md:text-4xl lg:text-5xl">
            با
            <span class="text-[#0047FF]">یتیر</span>
            ، ارسال سریع و مطمئن مرسولات درون‌شهری را تجربه کنید!
          </div>
          <div class="text-[20px] md:text-[24px] lg:text-[26px] mt-4 text-[#2c3659]">
            مهم نیست بسته ای که میخوای بفرستی پاکت باشه یا جعبه، بزرگ باشه یا کوچیک، سنگین باشه یا سبک
            ما سالم میرسونیمش به مقصد!
          </div>
          <div class="mt-8 flex justify-center lg:justify-start lg:block">
            <v-btn style="width: 300px; font-size: 17px; height: 42px;" prepend-icon="mdi-login-variant" color="#0047FF" rounded="xl" @click="navigateTo('/sign-up')">همین الان شروع کن</v-btn>
          </div>
        </div>  
        <div class="lg:w-1/3 xl:w-1/2 lg:!ml-12 mt-4 lg:!mt-0">
          <v-img :src="PostMan" alt="postman"
            class="w-[350px] md:w-[480px] lg:w-[700px] lg:h-[495px] xl:w-[800px] xl:h-[565px]">
          </v-img>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Logo from 'assets/images/logolanding.png'
import PostMan from 'assets/images/courier_pic.png'
import { ref, onMounted } from "vue";

const isOpen = ref(false);
function toggleMenu() {
  isOpen.value = !isOpen.value;
}

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
  font-weight: bold;
  background: linear-gradient(109.6deg, rgb(9, 154, 151) 11.2%, rgb(21, 205, 168) 91.1%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 425px) {
  .header-img {
    width: 200px;
  }
}
@media (max-width: 410px) {
  .header-img {
    width: 195px;
  }
}
@media (max-width: 400px) {
  .header-img {
    width: 185px;
  }
}
@media (max-width: 390px) {
  .header-img {
    width: 180px;
  }
}
@media (max-width: 385px) {
  .header-img {
    width: 175px;
  }
}
</style>
