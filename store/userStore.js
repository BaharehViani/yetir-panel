import Cookies from 'js-cookie'

export const useUserStore = defineStore('user', () => {
  const userLoggedIn = ref(false)
  const userToken = ref(null)
  const userData = ref(null)

  const logIn = (token, data) => {
    userLoggedIn.value = true
    userToken.value = token
    userData.value = data
  }

  const logOut = () => {
    userLoggedIn.value = false
    userToken.value = null
    userData.value = null
    Cookies.remove('auth_token')
  }

  return {
    userLoggedIn,
    userToken,
    userData,
    logIn,
    logOut,
  }
})
