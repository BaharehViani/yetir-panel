<template>
  <div id="site-navbar" class="row-container py-3">
    <div class="flex items-center">
      <div>
        <v-img :src="LogoImage" alt="ای برنامه" width="50px" />
      </div>
      <div class="flex items-center mr-10">
        <nuxt-link v-for="item in menuItems" :to="item.link" class="ml-8 text-gray-500 hover:text-primary">
          <v-icon :icon="item.icon" class="ml-2" size="16"></v-icon>
          <span>{{ item.title }}</span>
        </nuxt-link>
      </div>
      <div class="flex-grow-1"></div>
      <div>
        <v-btn color="primary" variant="tonal" rounded prepend-icon="mdi-account">
          پنل کاربری
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
//import LogoImage from '../../assets/images/logo.png'

const menuItems = ref([
  {
    title: 'خانه',
    link: '/',
    icon: 'mdi-home-outline',
  },
  {
    title: 'سوالات متداول',
    link: '/faq',
    icon: 'mdi-help-circle-outline',
  },
  {
    title: 'درباره ما',
    link: '/about',
    icon: 'mdi-information-outline',
  },
  {
    title: 'تماس با ما',
    link: '/contact',
    icon: 'mdi-email-outline',
  },
])

</script>

<style lang="scss" scoped>
#site-navbar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9999;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
</style>