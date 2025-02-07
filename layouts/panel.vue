<template>
  <v-app>
    <v-layout class="rounded-md">
      <v-navigation-drawer id="drawer" class="custom-drawer">
        <div class="h-full flex flex-col">
          <div id="logo" class="flex justify-center w-full">
            <div class="text-[#4880FF] text-xl font-extrabold">
              Yetir Delivery
            </div>
          </div>

          <v-divider class="border-opacity-50 w-full"></v-divider>

          <div id="menu-item" class="py-10 flex-grow-1 pt-0">
            <div class="px-4">
              <nuxt-link to="/_/profile" class="rounded p-3 flex items-center mb-2">
                <v-avatar>
                  <v-img :src="Avatar" alt="avatar" />
                </v-avatar>
                <div class="tet-white font-bold flex-column mr-2">
                  {{ UserName }}
                  <div class="text-xs text-[#565656] font-weight: 600:">
                    {{ roleInPersian }}
                  </div>
                </div>
              </nuxt-link>
              <nuxt-link
                v-for="item in menuItems"
                :to="item.link"
                :class="`rounded px-3 py-2 flex items-center mb-2 ${item.class}`"
              >
                <v-icon
                  :icon="item.icon"
                  :class="`text-white ${item.iconClass}`"
                ></v-icon>
                <div class="text-white font-bold mr-4">{{ item.label }}</div>
              </nuxt-link>
            </div>
            <div>
              <v-divider class="border-opacity-50 w-full mb-3"></v-divider>

              <div class="px-4">
                <nuxt-link
                  class="rounded bg-[#f7f8fa] p-3 flex items-center mb-2 cursor-pointer"
                  @click="SupportCall"
                >
                  <v-icon icon="mdi-face-agent" class="black"></v-icon>
                  <div class="tet-white font-bold mr-2">تماس با پشتیبانی</div>
                </nuxt-link>
                <nuxt-link
                  class="rounded bg-[#f7f8fa] p-3 flex items-center cursor-pointer"
                  @click="logOutHandler"
                >
                  <v-icon icon="mdi-logout" class="black"></v-icon>
                  <div class="tet-white font-bold mr-2">خروج از حساب</div>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </v-navigation-drawer>

      <v-app-bar>
        <template v-slot:append>
          <v-btn icon="mdi-magnify"></v-btn>
          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
      </v-app-bar>

      <v-main
        class="bg-[#F7F8FA] mt-6"
        :style="`padding-right: ${mainContentPaddingFromRight}px !important;`"
      >
        <div class="p-6 bg-white ml-6 mr-6 rounded-2xl">
          <slot />
        </div>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import Avatar from '../assets/images/avatar.svg'
import { useUserStore } from '~/store/userStore.js'


const userStore = useUserStore()

const UserName =
  userStore.userData.first_name + ' ' + userStore.userData.last_name

const Role = userStore.userData.role

const roleInPersian = computed(
  () =>
    ({
      customer: 'کاربر',
      courier: 'پیک',
    })[userStore.userData.role],
)
// define menue items based on roles
const menuItems = computed(
  () =>
    ({
      customer: [
        {
          link: '/_',
          label: 'داشبورد',
          icon: 'mdi-view-dashboard',
          iconClass: '',
          class: 'bg-[#4880FF]',
        },
        {
          link: '/_/customer/orders/new',
          label: 'ایجاد درخواست جدید',
          icon: 'mdi-plus-box-outline',
          iconClass: '',
          class: 'bg-[#4880FF]',
        },
        {
          link: '/_/customer/orders/requests',
          label: 'لیست درخواست ها',
          icon: 'mdi-list-status',
          iconClass: '',
          class: 'bg-[#4880FF]',
        },
        {
          link: '/_/customer/orders/',
          label: 'لیست سفارشات',
          icon: 'mdi-format-list-bulleted',
          iconClass: 'rotate-180',
          class: 'bg-[#4880FF]',
        },
        {
          link: '/_/customer/invoices/invoice',
          label: 'فاکتور ها و پرداخت ',
          icon: 'mdi-view-dashboard',
          iconClass: '',
          class: 'bg-[#4880FF]',
        },
      ],
      courier: [
        {
          link: '/_/courier/',
          label: 'داشبورد',
          icon: 'mdi-view-dashboard',
          iconClass: '',
          class: 'bg-[#4880FF]',
        },
        {
          link: '/_/courier/orders/current',
          label: 'سفارش جاری',
          icon: 'mdi-timer-marker-outline',
          iconClass: '',
          class: 'bg-[#8FD14F]',
        },
        {
          link: '/_/courier/orders/requests',
          label: 'لیست درخواست ها',
          icon: 'mdi-list-status',
          iconClass: '',
          class: 'bg-[#4880FF]',
        },
        {
          link: '/_/courier/orders/',
          label: 'لیست سفارشات',
          icon: 'mdi-format-list-bulleted',
          iconClass: 'rotate-180',
          class: 'bg-[#4880FF]',
        },
      ],
    })[userStore.userData.role],
)

const mainContentPaddingFromRight = ref(0)

onMounted(() => {
  // navigation drawer bounding client
  const bc = document.getElementById('drawer').getBoundingClientRect()
  mainContentPaddingFromRight.value = bc.width + 50
})

const logOutHandler = () => {
  userStore.logOut()
  navigateTo('/')
}
const { $swal } = useNuxtApp()

const  SupportCall = async ()=> {

  $swal.fire({
    title: "برای ارتباط با پشتیبانی با شماره ۰۴۱۳۳۳۵۱۵۴۶ تماس بگیرید",
    showClass: {
      popup: `
        animate__animated
        animate__fadeInUp
        animate__faster
      `
    },
    hideClass: {
      popup: `
        animate__animated
        animate__fadeOutDown
        animate__faster
      `
    }
  });
}

</script>

<style lang="scss" scoped>
#logo {
  display: flex;
  margin-top: 16px;
  margin-bottom: 16px;
  justify-content: center;
  align-items: center;
  gap: 32px;
}

#drawer {
  flex-direction: column;
  justify-content: space-between;
}

#menu-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
