
<template>
  <div>
    <v-card class="py-5 px-8 flex-col" :rounded="false" flat>
      <v-card-title class="text-center text-gray-900 text-2xl font-bold"
      >ورود به حساب کاربری
      </v-card-title>
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
            placeholder="۰۹۳۶۲۱۶۰۱۱۱"
            outlined
            dense
            @blur="loginFormValidations.phone.$touch"
            :error-messages="
            loginFormValidations.phone.$error
              ? loginFormValidations.phone.$errors[0].$message
              : null
          "
        ></v-text-field>
        <v-text-field
            v-model="loginForm.password"
            label="رمز عبور"
            :type="showPassword ? 'text' : 'password'"
            outlined
            dense
            append-inner-icon="mdi-eye"
            @click:append-inner="showPassword = !showPassword"
            @blur="loginFormValidations.password.$touch"
            :error-messages="
            loginFormValidations.password.$error
              ? loginFormValidations.password.$errors[0].$message
              : null
          "
        ></v-text-field>
        <nuxt-link
            to="/forget-pass"
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
            :disabled="loginLoading || loginFormValidations.$invalid"
            @click="clear"
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
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength, minLength } from '@vuelidate/validators'
import Cookies from 'js-cookie'

function clear() {
  v$.value.$reset()

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value
  }
}

const loginForm = ref({
  phone: null,
  password: null,
})

const loginFormValidations = useVuelidate(
    {
      phone: {
        required,
        minLength: minLength(11),
        maxLength: maxLength(11),
      },
      password: {
        required,
        minLength: minLength(8),
      },
    },
    loginForm.value,
)

const loginLoading = ref(false)

const loginFormLogInHandler = async () => {
  if (loginFormValidations.value.$invalid) {
    loginFormValidations.value.$touch()
    return
  }

  loginLoading.value = true

  try {
    const response = await axiosInstance.post('/users/authenticate', loginForm.value,)
    Cookies.set('auth_token', response.data.payload.token)
    axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.payload.token
    
    navigateTo('/')

  } catch (e) {
    console.log(e)
  } finally {
    loginLoading.value = false
  }
}

const showPassword = ref(false)

definePageMeta({
  layout: 'form',
})
</script>

<style lang="scss"></style>