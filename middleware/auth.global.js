import Cookies from 'js-cookie'
import axiosInstance from '~/utils/axiosinstance.js'
import { useUserStore } from '~/store/userStore.js'


export default defineNuxtRouteMiddleware(async (to, from) => {
  // Define paths that should not trigger authentication checks
  const ignoredPath = ['/login', '/sign-up']

  // Skip middleware for ignored paths (login and sign-up pages)
  for (const path of ignoredPath) {
    if (to.path.startsWith(path)) return
  }

  const insidePanel = to.path.startsWith('/_')

  const userToken = Cookies.get('auth_token')

  // Redirect to -login if trying to access the panel without authentication
  if (insidePanel && !userToken) {
    return navigateTo('/login')
  }

  // Initialize the user store to manage authentication state
  const userStore = useUserStore()

  try {
    axiosInstance.defaults.headers.common['Authorization'] =
      'Bearer ' + userToken

    const response = await axiosInstance.get('/x-user')

    userStore.logIn(userToken, response.data)

    if (!insidePanel) {
      return navigateTo('/_')
    }
  } catch (e) {
    console.log(e)
    userStore.logOut()

    if (insidePanel) {
      return navigateTo('/login')
    }
  }
})
