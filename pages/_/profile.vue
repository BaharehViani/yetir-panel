<template>
  <div>

      <div>
        <div>
          <v-img :src="ProfileBg" alt="ProfileBg">
          </v-img>
        </div>
        <div class="-mt-28 ml-8 bg-white float-end">
          <div>
            ویرایش اطلاعات
          </div>

        </div>
        <div class="-mt-10 mr-20">
          <v-avatar size="80" border="lg" color="white">
            <v-img :src="User1" alt="avatar" />
          </v-avatar>
        </div>



      </div>

  </div>

</template>

<script setup>

import ProfileBg from 'assets/images/ProfileBackground.png'
import User1 from 'assets/images/user1.png'
import Avatar from 'assets/images/avatar.svg'

definePageMeta({
  layout: 'panel',
})
</script>

<style lang="scss" scoped></style>
