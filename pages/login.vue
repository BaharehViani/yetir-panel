<!--<template>-->
<!--  <div>-->
<!--    <v-card class="py-5 px-8 flex-col" :rounded="false" flat>-->
<!--      <v-card-title class="text-center text-gray-900 text-2xl font-bold">-->
<!--        ورود به حساب کاربری-->
<!--      </v-card-title>-->
<!--      <v-card-subtitle-->
<!--        class="text-center text-gray-600 text-lg font-semibold pb-8"-->
<!--      >-->
<!--        برای ورود شماره تلفن همراه خود را به همراه گذرواژه وارد کنید.-->
<!--      </v-card-subtitle>-->

<!--      &lt;!&ndash; Login Form &ndash;&gt;-->
<!--      <v-form class="mt-4" fast-fail @submit.prevent="loginFormLogInHandler">-->
<!--        &lt;!&ndash; Phone Number Input &ndash;&gt;-->
<!--        <v-text-field-->
<!--          v-model="loginForm.phone"-->
<!--          label="شماره موبایل"-->
<!--          dir="rtl"-->
<!--          placeholder="۹۸-۹۳۶۲۱۶۰۱۱۱+"-->
<!--          outlined-->
<!--          dense-->
<!--          @blur="loginFormValidations.phone.$touch"-->
<!--          :error-messages="-->
<!--            loginFormValidations.phone.$error-->
<!--              ? loginFormValidations.phone.$errors[0].$message-->
<!--              : null-->
<!--          "-->
<!--        ></v-text-field>-->

<!--        &lt;!&ndash; Password Input with Toggle Visibility &ndash;&gt;-->
<!--        <v-text-field-->
<!--          v-model="loginForm.password"-->
<!--          label="رمز عبور"-->
<!--          :type="showPassword ? 'text' : 'password'"-->
<!--          outlined-->
<!--          dense-->
<!--          append-inner-icon="mdi-eye"-->
<!--          @click:append-inner="showPassword = !showPassword"-->
<!--          @blur="loginFormValidations.password.$touch"-->
<!--          :error-messages="-->
<!--            loginFormValidations.password.$error-->
<!--              ? loginFormValidations.password.$errors[0].$message-->
<!--              : null-->
<!--          "-->
<!--        ></v-text-field>-->

<!--        &lt;!&ndash; Forgot Password Link &ndash;&gt;-->
<!--        <nuxt-link-->
<!--          to="/forget-pass"-->
<!--          class="text-start text-gray-600 text-md font-medium pb-9"-->
<!--        >-->
<!--          رمز خود را فراموش کرده‌اید؟-->
<!--        </nuxt-link>-->

<!--        <v-divider class="my-4"></v-divider>-->

<!--        &lt;!&ndash; Login Button &ndash;&gt;-->
<!--        <v-btn-->
<!--          block-->
<!--          color="primary"-->
<!--          class="mt-4 w-[418px] h-40 opacity-90 rounded-lg"-->
<!--          type="submit"-->
<!--          :loading="loginLoading"-->
<!--          :disabled="loginLoading || loginFormValidations.$invalid"-->
<!--          @click="clear"-->
<!--        >-->
<!--          ورود-->
<!--        </v-btn>-->

<!--        <v-divider class="my-4"></v-divider>-->

<!--        &lt;!&ndash; Sign Up Link &ndash;&gt;-->
<!--        <div class="text-center">-->
<!--          <span>حساب کاربری ندارید؟</span>-->
<!--          <nuxt-link-->
<!--            to="/sign-up"-->
<!--            class="pr-3 text-right font-semibold underline text-primary"-->
<!--          >-->
<!--            همین الان ثبت‌نام کنید-->
<!--          </nuxt-link>-->
<!--        </div>-->
<!--      </v-form>-->
<!--    </v-card>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import axiosInstance from '~/utils/axiosinstance'-->
<!--import { useVuelidate } from '@vuelidate/core'-->
<!--import { required, maxLength, minLength } from '@vuelidate/validators'-->
<!--import Cookies from 'js-cookie'-->
<!--import { useUserStore } from '../store/userStore'-->
<!--import { ref } from 'vue'-->

<!--const userStore = useUserStore()-->

<!--// Reactive state for login form fields-->
<!--const loginForm = ref({-->
<!--  phone: null,-->
<!--  password: null,-->
<!--})-->

<!--// Validation rules-->
<!--const loginFormValidations = useVuelidate(-->
<!--  {-->
<!--    phone: { required, minLength: minLength(11), maxLength: maxLength(11) },-->
<!--    password: { required, minLength: minLength(8) },-->
<!--  },-->
<!--  loginForm,-->
<!--)-->

<!--const loginLoading = ref(false) // Loading state for login-->
<!--const showPassword = ref(false) // Toggle visibility for password field-->

<!--// Function to clear form inputs-->
<!--function clear() {-->
<!--  loginFormValidations.value.$reset()-->
<!--  loginForm.value.phone = null-->
<!--  loginForm.value.password = null-->
<!--}-->

<!--// Login handler function-->
<!--const loginFormLogInHandler = async () => {-->
<!--  if (loginFormValidations.value.$invalid) {-->
<!--    loginFormValidations.value.$touch()-->
<!--    return-->
<!--  }-->

<!--  loginLoading.value = true-->

<!--  try {-->
<!--    const response = await axiosInstance.post(-->
<!--      '/users/authenticate',-->
<!--      loginForm.value,-->
<!--    )-->
<!--    console.log(response)-->

<!--    // Save authentication token-->
<!--    Cookies.set('auth_token', response.data.payload.token)-->
<!--    axiosInstance.defaults.headers.common['Authorization'] =-->
<!--      'Bearer ' + response.data.payload.token-->

<!--    navigateTo('/') // Redirect after successful login-->
<!--  } catch (error) {-->
<!--    console.error('Login failed:', error)-->
<!--  } finally {-->
<!--    loginLoading.value = false-->
<!--  }-->
<!--}-->

<!--// Set page meta properties-->
<!--definePageMeta({-->
<!--  layout: 'form',-->
<!--})-->
<!--</script>-->

<!--<style lang="scss"></style>-->

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
            placeholder="۹۸-۹۳۶۲۱۶۰۱۱۱+"
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
import { useUserStore } from '../store/userStore'

function clear() {
  v$.value.$reset()

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value
  }
}

const userStore = useUserStore()

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
    const response = await axiosInstance.post(
        '/users/authenticate',
        loginForm.value,
    )
    console.log(response)
    Cookies.set('auth_token', response.data.payload.token)
    axiosInstance.defaults.headers.common['Authorization'] =
        'Bearer ' + response.data.payload.token
  } catch (e) {
    console.log(e)
  } finally {
    loginLoading.value = false
  }

  navigateTo('/_')
}

const showPassword = ref(false)

definePageMeta({
  layout: 'form',
})
</script>

<style lang="scss"></style>