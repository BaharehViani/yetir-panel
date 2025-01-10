<template>
  <div>
    <div class="pt-4 px-4">
      <v-btn
        variant="text"
        @click="step--"
        prepend-icon="mdi-arrow-right"
        size="small"
        v-if="step > 1"
      >
        برگشت
      </v-btn>
    </div>
    <v-divider class="my-4"></v-divider>
    <div v-if="step === 1">
      <!-------------------------------------------------------------------   step 1 is here!   ----------------------------->
      <div
        id="step 1"
        class="text-center text-gray-900 text-[25px] font-weight-bold"
      >
        لطفا یکی از گزینه‌های زیر را انتخاب کنید:
      </div>

      <v-divider class="my-4"></v-divider>
      <div class="flex flex-col items-center">
        <div class="w-2/3">
          <v-btn
            base-color="primary"
            rounded="lg"
            block
            size="x-large"
            type="submit"
            prepend-icon="mdi-truck-check"
            class="font-weight-bold"
            @click="() => selectUserTypeAndProceed('courier')"
          >
            ثبت‌نام به عنوان راننده
          </v-btn>

          <v-divider class="my-2"></v-divider>
          <v-btn
            to=""
            color="secondary"
            rounded="lg"
            block
            size="x-large"
            type="submit"
            prepend-icon="mdi-archive-arrow-up"
            class="font-weight-bold"
            @click="() => selectUserTypeAndProceed('customer')"
          >
            ثبت‌نام به عنوان کاربر
          </v-btn>
        </div>
      </div>
    </div>
    <div v-if="step === 2">
      <!--Courier-->
      <div v-if="userType === 'courier'">
        <div
          id="step-2"
          class="text-center text-gray-900 text-[25px] font-weight-bold"
        >
          ثبت‌نام به عنوان پیک
        </div>
        <v-divider class="my-1"></v-divider>
        <div class="text-center text-gray-600 text-[15px] font-weight-medium">
          اطلاعات زیر را تکمیل کنید تا حساب کاربری شما را ایجاد کنیم
        </div>
        <v-divider class="my-5"></v-divider>
        <div class="flex justify-center mt-4">
          <v-form class="w-2/3" @submit.prevent="step++">
            <v-text-field
              v-model="signUpForm.nationalCode"
              label="کد ملی"
              dir="rtl"
              placeholder="۱۳۶۳۴۴۳۴۳۴"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="signUpForm.phone"
              label="شماره موبایل"
              dir="rtl"
              placeholder="۹۸-۹۳۶۲۱۶۰۱۱۱+"
              outlined
              dense
            ></v-text-field>

            <v-divider class="my-2"></v-divider>
            <div class="flex flex-col items-center">
              <div class="w-2/3">
                <v-btn
                  type="submit"
                  color="secondary"
                  rounded="lg"
                  block
                  size="x-large"
                  class="font-weight-bold"
                >
                  ثـبـت
                </v-btn>
              </div>
            </div>
          </v-form>
        </div>
      </div>
      <!--Courier-->

      <!--Customer-->
      <div
        v-if="userType === 'customer'"
        class="text-center text-gray-900 text-[25px] font-weight-bold"
      >
        ثبت‌نام به عنوان کاربر
        <v-divider class="my-1"></v-divider>
        <div class="text-center text-gray-600 text-[15px] font-weight-medium">
          اطلاعات زیر را تکمیل کنید تا حساب کاربری شما را ایجاد کنیم
        </div>
        <v-divider class="my-5"></v-divider>

        <div class="flex justify-center mt-4">
          <v-form class="w-2/3" @submit.prevent="step++">
            <v-text-field
              v-model="signUpForm.nationalCode"
              label="کد ملی"
              dir="rtl"
              placeholder="۱۳۶۳۴۴۳۴۳۴"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="signUpForm.phone"
              label="شماره موبایل"
              dir="rtl"
              placeholder="۹۸-۹۳۶۲۱۶۰۱۱۱+"
              outlined
              dense
            ></v-text-field>

            <v-divider class="my-2"></v-divider>
            <div class="flex flex-col items-center">
              <div class="w-2/3">
                <v-btn
                  color="secondary"
                  rounded="lg"
                  block
                  size="x-large"
                  type="submit"
                  class="font-weight-bold"
                >
                  ثـبـت
                </v-btn>
              </div>
            </div>
          </v-form>
        </div>
      </div>
      <!--Customer-->
    </div>

    <!--Courier-->
    <div v-if="step === 3">
      <!--Courier-->
      <div
        v-if="userType === 'courier'"
        class="text-center text-gray-900 text-[25px] font-weight-bold"
      >
        اطلاعات تکمیلی شما

        <v-divider class="my-1"></v-divider>
        <div class="text-center text-gray-600 text-[15px] font-weight-medium">
          اطلاعات زیر را تکمیل کنید تا حساب کاربری شما را ایجاد کنیم
        </div>
        <v-divider class="my-3"></v-divider>
        <div class="flex justify-center mt-4">
          <v-form class="w-2/3" @submit.prevent="step++">
            <v-text-field
              v-model="signUpForm.firstName"
              label="نام"
              dir="rtl"
              type="firstName"
              placeholder="فاطمه"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="signUpForm.lastName"
              label="نام خانوادگی"
              dir="rtl"
              type="firstName"
              placeholder="علیمرادی"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="signUpForm.maxCapacity"
              label="ظرفیت بار"
              placeholder="۱۰ کیلوگرم"
              outlined
              dense
            >
            </v-text-field>
            <v-text-field
              v-model="signUpForm.password"
              label="رمز عبور"
              :type="showPassword ? 'text' : 'password'"
              outlined
              dense
              append-inner-icon="mdi-eye"
              @click:append-inner="showPassword = !showPassword"
            ></v-text-field>
            <v-text-field
              v-model="signUpForm.password"
              label="تکرار رمز عبور"
              :type="showPassword ? 'text' : 'password'"
              outlined
              dense
              append-inner-icon="mdi-eye"
              @click:append-inner="showPassword = !showPassword"
            ></v-text-field>
            <v-text-field
              v-model="signUpForm.image"
              label="آدرس تصویر"
              variant="outlined"
              prepend-icon=""
              append-inner-icon="mdi-image"
            ></v-text-field>
            <v-text-field
              v-model="signUpForm.info"
              label="توضیحات"
              variant="outlined"
              prepend-icon=""
              append-inner-icon="mdi-info"
            ></v-text-field>

            <v-divider class="my-2"></v-divider>
            <div class="flex flex-col items-center">
              <div class="w-2/3">
                <v-btn
                  color="secondary"
                  rounded="lg"
                  block
                  size="x-large"
                  type="submit"
                  class="font-weight-bold"
                >
                  ثـبـت‌نام
                </v-btn>
              </div>
            </div>
          </v-form>
        </div>
      </div>
      <!--Courier-->

      <!--Customer-->
      <div
        v-if="userType === 'customer'"
        class="text-center text-gray-900 text-[25px] font-weight-bold"
      >
        اطلاعات تکمیلی شما

        <v-divider class="my-1"></v-divider>
        <div class="text-center text-gray-600 text-[15px] font-weight-medium">
          اطلاعات زیر را تکمیل کنید تا حساب کاربری شما را ایجاد کنیم
        </div>

        <v-divider class="my-3"></v-divider>
        <div class="flex justify-center mt-4">
          <v-form class="w-2/3" @submit.prevent="step++">
            <v-text-field
              v-model="signUpForm.firstName"
              label="نام"
              dir="rtl"
              placeholder="فاطمه"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="signUpForm.lastName"
              label="نام خانوادگی"
              dir="rtl"
              placeholder="علیمرادی"
              outlined
              dense
            ></v-text-field>

            <v-text-field
              v-model="signUpForm.password"
              label="رمز عبور"
              :type="showPassword ? 'text' : 'password'"
              outlined
              dense
              append-inner-icon="mdi-eye"
              @click:append-inner="showPassword = !showPassword"
            ></v-text-field>
            <v-text-field
              v-model="signUpForm.password"
              label="تکرار رمز عبور"
              :type="showPassword ? 'text' : 'password'"
              outlined
              dense
              append-inner-icon="mdi-eye"
              @click:append-inner="showPassword = !showPassword"
            ></v-text-field>

            <v-divider class="my-2"></v-divider>
            <div class="flex flex-col items-center">
              <v-btn
                color="secondary"
                rounded="lg"
                block
                size="x-large"
                type="submit"
                class="font-weight-bold"
              >
                ثـبـت‌نام
              </v-btn>
            </div>
          </v-form>
        </div>
      </div>
      <!--Customer-->
    </div>

    <div v-if="step === 4">
      <div
        v-if="userType === 'courier'"
        class="text-center text-gray-900 text-[25px] font-weight-bold"
      >
        اطلاعات وسیله نقلیه شما
        <v-divider class="my-1"></v-divider>
        <div class="text-center text-gray-600 text-[15px] font-weight-medium">
          اطلاعات زیر را تکمیل کنید تا حساب کاربری شما را ایجاد کنیم
        </div>
        <v-divider class="my-3"></v-divider>
        <PlateNumberInput
          v-model="signUpForm.plateNum"
          v-model:vehicle="signUpForm.vehicle"
        />

        <v-divider class="my-2"></v-divider>
        <div class="flex flex-col items-center">
          <div class="w-2/3">
            <v-btn
              color="secondary"
              rounded="lg"
              block
              size="x-large"
              class="font-weight-bold"
              @click="signUpFormHandler"
            >
              ثبت وسیله
            </v-btn>
          </div>
        </div>
      </div>
    </div>
    <v-divider class="my-4"></v-divider>
    <div class="text-center">
      <span>حساب کاربری دارید؟</span>
      <nuxt-link
        to="/login"
        class="pr-3 text-right font-semibold underline text-primary"
        >همین الان وارد شوید
      </nuxt-link>
    </div>
    <v-divider class="my-4"></v-divider>
  </div>
</template>

<script setup>
import axiosInstance from '~/utils/axiosinstance.js'
import Cookies from 'js-cookie'
import PlateNumberInput from '~/components/inputs/PlateNumberInput.vue'

definePageMeta({
  layout: 'sign-up-steps',
})

const step = ref(1)
const userType = ref(null)

const selectUserTypeAndProceed = (type) => {
  userType.value = type
  step.value++
}

const signUpForm = ref({
  phone: null,
  password: null,
  firstName: null,
  lastName: null,
  plateNum: null,
  vehicle: null,
  maxCapacity: null,
  image: null,
  nationalCode: null,
  info: null,
})

const showPassword = ref(false)

const signUpFormHandler = async () => {
  try {
    const response = await axiosinstance.post('/users/register', {
      phone: signUpForm.value.phone,
      password: signUpForm.value.password,
      first_name: signUpForm.value.firstName,
      last_name: signUpForm.value.lastName,
      national_code: signUpForm.value.nationalCode,
      role: userType.value,
    })
    console.log(response)
  } catch (e) {
    console.log(e)
    return
  }

  try {
    const response = await axiosInstance.post('/users/authenticate', {
      phone: signUpForm.value.phone,
      password: signUpForm.value.password,
    })
    Cookies.set('auth_token', response.data.payload.token)
    axiosInstance.defaults.headers.common['Authorization'] =
      'Bearer ' + response.data.payload.token
  } catch (e) {
    console.log(e)
  }

  if (userType.value === 'courier') {
    try {
      //const response = await axiosInstance.post('/users/authenticate', loginForm.value)
      const response = await axiosinstance.post('/courier/vehicles', {
        type: signUpForm.value.vehicle,
        plate_number: signUpForm.value.plateNum,
        maximum_capacity: signUpForm.value.maxCapacity,
      })
      console.log(response)
    } catch (e) {
      console.log(e)
      return
    }

    try {
      const response = await axiosinstance.patch('/courier/info', {
        photo_url: signUpForm.value.image,
      })
      console.log(response)
    } catch (e) {
      console.log(e)
      return
    }
  }

  // try {
  //   const response = await axiosInstance.post('/users/authenticate', loginForm.value)
  //   console.log(response)
  //   Cookies.set('auth_token', response.data.payload.token)
  //   axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.payload.token
  // } catch (e) {
  //   console.log(e)
  // }

  navigateTo('/')
}
</script>
