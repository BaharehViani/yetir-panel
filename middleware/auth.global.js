import Cookies from 'js-cookie'
import axiosInstance from '~/utils/axiosinstance.js'
import { useUserStore } from '~/store/userStore.js'
import { tr } from 'vuetify/locale'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const ignoredPath = ['/login', '/sign-up']

  for (const path of ignoredPath) {
    if (to.path.startsWith(path)) return
  }

  const insidePanel = to.path.startsWith('/_')

  const userToken = Cookies.get('auth_token')

  if (insidePanel && !userToken) {
    return navigateTo('/login')
  }

  const userStore = useUserStore()

  try {
    axiosInstance.defaults.headers.common['Authorization'] =
      'Bearer ' + userToken

    const response = await axiosInstance.get('/x-user')

    userStore.logIn(userToken, response.data)

    if (insidePanel) {
      return
    } else {
      return navigateTo('/_')
    }
  } catch (e) {
    console.log(e)
    userStore.logOut()

    if (insidePanel) {
      return navigateTo('/login')
    } else {
      return
    }
  }
})
