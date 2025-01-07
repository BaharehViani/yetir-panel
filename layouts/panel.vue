<template>
  <v-app>
    <v-layout class="rounded-md">
      <v-navigation-drawer id="drawer">
        <div class="h-full flex flex-col">
          <div id="logo" class="flex justify-center w-full">
            <div class="text-[#4880FF] text-2xl font-extrabold		">
              Yetir Delivery
            </div>
          </div>

          <v-divider class="border-opacity-50 w-full"></v-divider>

          <div id="menu-item" class="py-10 flex-grow-1 pt-0">
            <div class="px-4">
              <nuxt-link class="rounded p-3 flex items-center mb-2">
                <v-avatar color="#8FD14F mb-4"></v-avatar>
                <div class="tet-white font-bold  flex-column mr-2">
                  {{ UserName }}
                  <div class="text-xs text-[#565656] font-weight: 600:">{{Role}}</div>
                </div>

              </nuxt-link>
              <nuxt-link
                v-for="item in menuItems"
                :to="item.link"
                class="bg-blue-500 rounded px-3 py-2 flex items-center mb-2"
              >
                <v-icon :icon="item.icon" class="text-white"></v-icon>
                <div class="tet-white font-bold mr-3">{{ item.label }}</div>
              </nuxt-link>
            </div>
            <div>
              <v-divider class="border-opacity-50 w-full mb-3"></v-divider>

              <div class="px-4">
                <nuxt-link
                  class="rounded bg-[#f7f8fa] p-3 flex items-center mb-2"
                >
                  <v-icon icon="mdi-face-agent" class="black"></v-icon>
                  <div class="tet-white font-bold mr-2">تماس با پشتیبانی</div>
                </nuxt-link>
                <nuxt-link class="rounded bg-[#f7f8fa] p-3 flex items-center">
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
        class="bg-[#F7F8FA] px-8 mt-6 pl-8"
        :style="`padding-right: ${mainContentPaddingFromRight}px !important;`"
      >
        <slot />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import Logo from '../assets/images/Logo.png'

const UserName = 'Faezeh Alimoradi'
const Role = 'Courier'
const menuItems = ref([
  {
    link: '/',
    label: 'خانه',
    icon: 'mdi-home',
  },
  {
    link: '/test',
    label: 'تست',
    icon: 'mdi-account-convert',
  },
])

const mainContentPaddingFromRight = ref(0)

onMounted(() => {
  // navigation drawer bounding client
  const bc = document.getElementById('drawer').getBoundingClientRect()
  mainContentPaddingFromRight.value = bc.width + 50
})
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
