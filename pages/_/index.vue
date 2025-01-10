<template>
<div>
  <div class="flex flex-column items-center rounded-2xl">
    <div class="w-1/3">
      <v-img :src="SearchingSVG"></v-img>
    </div>
    <div class="mt-10">اطلاعاتی برای نمایش در داشبورد شما وجود ندارد</div>
  </div>
</div>
</template>

<script setup>
import SearchingSVG from '../../assets/images/searching.svg'

definePageMeta({
  layout: 'panel',
})
</script>

<style lang="scss" scoped></style>
