<template>
  <div>
    <v-card class="py-5 px-8 flex-col" :rounded="false" flat>
      <v-card-title class="text-center text-gray-900 text-2xl font-bold"
        >بازیابی رمز عبور
      </v-card-title>
      <v-card-subtitle
        class="text-center text-gray-600 text-lg font-semibold pb-8"
      >
        برای بازیابی رمز عبور شماره تلفن همراه خود را وارد کنید.
      </v-card-subtitle>

      <!-- Form starts here -->
      <v-form class="mt-4" fast-fail @submit.prevent="forgetFormLogInHandler">
        <v-text-field
          v-model="forgetForm.phone"
          label="شماره موبایل"
          dir="rtl"
          placeholder="۹۸-۹۳۶۲۱۶۰۱۱۱+"
          outlined
          dense
          @blur="forgetFormValidations.phone.$touch"
          :error-messages="
            forgetFormValidations.phone.$error
              ? forgetFormValidations.phone.$errors[0].$message
              : null
          "
        ></v-text-field>
        <v-divider class="my-4"></v-divider>
        <v-btn
          block
          color="primary"
          class="mt-4 w-[418px] h-40 opacity-90 rounded-lg"
          type="submit"
          :loading="forgetLoading"
          :disabled="forgetLoading || forgetFormValidations.$invalid"
          @click="clear"
        >
          ارسال کد
        </v-btn>

        <v-divider class="my-4"></v-divider>

        <!-- Sign-up link if the user does not have an account -->
        <div class="text-center">
          <span>حساب کاربری ندارید؟</span>
          <nuxt-link
            to="/sign-up"
            class="pr-3 text-right font-semibold underline text-primary"
            >همین الان ثبت‌نام کنید
          </nuxt-link>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script setup>
import axiosInstance from '~/utils/axiosinstance'
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength, minLength } from '@vuelidate/validators'
import Cookies from 'js-cookie'
import { useUserStore } from '../store/userStore'

// Reset form and validation state
function clear() {
  v$.value.$reset()

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value
  }
}

const userStore = useUserStore()

// Define the form state object
const forgetForm = ref({
  phone: null,
})

const forgetLoading = ref(false)

// Define validation rules for the form fields
const forgetFormValidations = useVuelidate(
  {
    phone: {
      required,
      minLength: minLength(11),
      maxLength: maxLength(11),
    },
  },
  forgetLoading.value,
)

// Form submission handler
const forgetFormLogInHandler = async () => {
  if (forgetFormValidations.value.$invalid) {
    forgetFormValidations.value.$touch()
    return
  }

  forgetLoading.value = true

  try {
    const response = await axiosInstance.post(
      '/users/authenticate',
      forgetLoading.value,
    )
    console.log(response)
    Cookies.set('auth_token', response.data.payload.token)
    axiosInstance.defaults.headers.common['Authorization'] =
      'Bearer ' + response.data.payload.token
  } catch (e) {
    console.log(e)
  } finally {
    forgetLoading.value = false
  }
  navigateTo('/')
}

// Define layout for this page
definePageMeta({
  layout: 'form',
})
</script>

<style lang="scss"></style>
