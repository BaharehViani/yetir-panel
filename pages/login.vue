<template>
  <div>
    <v-card class="py-5 px-8 flex-col" :rounded="false" flat>
      <v-card-title class="text-center text-gray-900 text-2xl font-bold"
        >ورود به حساب کاربری</v-card-title
      >
      <v-card-subtitle
        class="text-center text-gray-600 text-lg font-semibold pb-8"
      >
        برای ورود شماره تلفن همراه خود را به همراه رمز عبور وارد کنید.
      </v-card-subtitle>
      <v-form class="mt-4" fast-fail @submit.prevent="loginFormLogInHandler">
        <v-text-field
          v-model="loginForm.phone"
          label="شماره موبایل"
          dir="rtl"
          placeholder="۹۸-۹۳۶۲۱۶۰۱۱۱+"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          v-model="loginForm.password"
          label="رمز عبور"
          type="password"
          outlined
          dense
          append-inner-icon="mdi-eye"
        ></v-text-field>
        <nuxt-link
          to=""
          class="text-start text-gray-600 text-md font-medium pb-9"
        >
          رمز خود را فراموش کرده‌اید؟
        </nuxt-link>
        <v-divider class="my-4"></v-divider>
        <v-btn
          block
          color="primary"
          class="mt-4 w-[418px] h-40 opacity-90 rounded-lg"
          type="submit"
          :loading="loginLoading"
          :disabled="loginLoading"
        >
          ورود
        </v-btn>

        <v-divider class="my-4"></v-divider>

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

import Cookies from 'js-cookie'
import { useUserStore } from '../store/userStore'

const loginForm = ref({
  phone: null,
  password: null,
})

const loginLoading = ref(false)

const loginFormLogInHandler = async () => {
  loginLoading.value = true

  try {
    const response = await axiosInstance.post(
      '/users/authenticate',
      loginForm.value,
    )
    console.log(response)
    Cookies.set('auth_token', response.data.payload.token)
    axiosInstance.defaults.headers.common['Authorization'] =
      'Bearer ' + response.data.payload.token

    navigateTo('/')
  } catch (e) {
    console.log(e)
  } finally {
    loginLoading.value = false
  }
}

definePageMeta({
  layout: 'form',
})
</script>

<style lang="scss"></style>
