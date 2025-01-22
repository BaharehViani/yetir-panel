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
        <v-form class="flex-column pr-6 mt-8">
         <v-row>
           <v-col
             cols="10"
             sm="6"
             v-for="(item, index) in info"
             :key="index"
           >
             <div class="font-sm font-medium mb-2">نام :</div>
             <v-textarea
               v-model="items[item.first_name]"
               prepend-inner-icon="mdi-map-marker-outline"
               :placeholder="item.title"
               row-height="10"
               rows="1"
               rounded="lg"
               variant="outlined"
               auto-grow
             ></v-textarea>
           </v-col>
           <v-col
             cols="12"
             sm="6"
           >
             <div class="font-sm font-medium mb-2">نام خانوادگی :</div>
             <v-textarea
               v-model="items[item.last_name]"
               prepend-inner-icon="mdi-map-marker"
               :placeholder="item.title"
               row-height="10"
               rows="1"
               rounded="lg"
               variant="outlined"
               auto-grow
             ></v-textarea>
           </v-col>
           <v-col
             cols="10"
             sm="6"
           >
             <div class="font-sm font-medium mb-2">موبایل :</div>
             <v-textarea
               v-model="items[item.phone]"
               prepend-inner-icon="mdi-scale"
               :placeholder="item.title"
               row-height="10"
               rows="1"
               rounded="lg"
               variant="outlined"
               auto-grow
               shaped
             ></v-textarea>
           </v-col>
           <v-col
             cols="10"
             sm="6"
           >
             <div class="font-sm font-medium mb-2">کد ملی :</div>
             <v-textarea
               v-model="items[item.national_code]"
               prepend-inner-icon="mdi-scale"
               :placeholder="item.title"
               row-height="10"
               rows="1"
               rounded="lg"
               variant="outlined"
               auto-grow
               shaped
             ></v-textarea>
           </v-col>
           <div class="flex justify-end">
             <v-btn
               class="font-sm font-medium"
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

definePageMeta({
  layout: 'panel',
})
const { $swal } = useNuxtApp()

const items = ref({
  first_name: '',
  last_name: '',
  phone: '',
  national_code: '',
})

// Table headers
const info = ref([
  { title: 'نام', key: 'first_name' },
  { title: 'نام خانوادگی', key: 'last_name' },
  { title: 'کد ملی', key: 'national_code' },
  { title: 'شماره موبایل', key: 'phone' },
])

// Fetch order list
const fetchProfileInfo = async () => {
  try {
    const response = await axiosInstance.get('x-user/')
    items.value = response.data
    console.log(response) // Update the table data with the fetched response
  } catch (e) {
    console.error('Error fetching profile info:', e)
  }
}
onMounted(() => {
  fetchProfileInfo()
})

</script>

<style lang="scss" scoped></style>
