<template>
  <div>

    <div>
      <div>
        <v-img :src="ProfileBg" alt="ProfileBg">
        </v-img>
      </div>
      <div class="-mt-10 mr-20">
        <v-avatar size="80" border="lg" color="white">
          <v-img :src="User1" alt="avatar" />
        </v-avatar>
      </div>
      <v-divider color="blue"></v-divider>
      <div>
        <v-form class="flex-column mt-8" @submit.prevent="profileInfoHandler">
         <v-row>
           <v-col
             cols="10"
             sm="6"
           >
             <div class="font-sm font-medium mb-2">نام :</div>
             <v-text-field
               prepend-inner-icon="mdi-rename"
               v-model="newProfileRequestForm.first_name"
               row-height="10"
               rows="1"
               rounded="lg"
               variant="outlined"
               auto-grow
             ></v-text-field>
           </v-col>
           <v-col
             cols="12"
             sm="6"
           >
             <div class="font-sm font-medium mb-2">نام خانوادگی :</div>
             <v-text-field
               prepend-inner-icon="mdi-rename"
               v-model="newProfileRequestForm.last_name"
               row-height="10"
               rows="1"
               rounded="lg"
               variant="outlined"
               auto-grow
             ></v-text-field>
           </v-col>
           <v-col
             cols="10"
             sm="6"
           >
             <div class="font-sm font-medium mb-2">موبایل :</div>
             <v-text-field
               prepend-inner-icon="mdi-cellphone"
               v-model="newProfileRequestForm.phone"
               row-height="10"
               rows="1"
               rounded="lg"
               variant="outlined"
               auto-grow
               shaped
             ></v-text-field>
           </v-col>
           <v-col
             cols="10"
             sm="6"
           >
             <div class="font-sm font-medium mb-2">کد ملی :</div>
             <div class="cursor-not-allowed">
               <v-text-field
                 prepend-inner-icon="mdi-card-account-details"
                 v-model="newProfileRequestForm.national_code"
                 row-height="10"
                 rows="1"
                 rounded="lg"
                 variant="outlined"
                 margin
                 auto-grow
                 shaped
                 readonly
                 class="pointer-events-none"
               ></v-text-field>
             </div>
           </v-col>

           <div class="flex justify-end w-full">
             <v-btn
               class="font-sm ml-3.5 font-medium"
               size="large"
               type="submit"
               color="blue"
             >ثبت تغییرات
             </v-btn>
           </div>
         </v-row>
        </v-form>
      </div>


    </div>

  </div>

</template>

<script setup>

import ProfileBg from 'assets/images/ProfileBackground.png'
import User1 from 'assets/images/user1.png'
import axiosInstance from '~/utils/axiosinstance.js'
import { useUserStore } from '~/store/userStore.js'

definePageMeta({
  layout: 'panel',
})

const userStore = useUserStore()

const UserInfo = ref({
  first_name: userStore.userData.first_name,
  last_name: userStore.userData.last_name,
  phone: userStore.userData.phone,
  national_code: userStore.userData.national_code,
})

// sweatalert2 for pop-up handling options
const { $swal } = useNuxtApp()


const newProfileRequestForm = ref({
  first_name: null,
  last_name: null,
  phone: null,
  national_code: null,
})

// Update profile information
const profileInfoHandler = async () => {
  try {
    const response = await axiosInstance.patch('x-user/', newProfileRequestForm.value)
    console.log(response)

    $swal.fire({
      icon: "success",
      title: "تغییرات شما با موفقیت ثبت شد",
      draggable: true,
      position: 'center',
      timer: 2000,
      showConfirmButton: false,
    })

  } catch (e) {
    console.log(e)

    $swal.fire({
      icon: "error",
      title: "مشکل در ثبت تغییرات",
      draggable: true,
      position: 'center',
      timer: 2000,
      showConfirmButton: false,
    })
  }
}

// Reading the profile information right from the userStore
onMounted(() => {
  newProfileRequestForm.value = { ...userStore.userData };
})

</script>

<style lang="scss" scoped></style>
