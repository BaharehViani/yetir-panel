import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: false,
    components,
    directives,
    locale: {
      locale: 'fa',
      rtl: {
        fa: true,
      },
    },
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          dark: false,
          colors: {
            background: '#ffffff',
            surface: '#ffffff',
            primary: '#4880ff',
            'primary-darken-1': '#1f5862',
            secondary: '#8fd14f',
            'secondary-darken-1': '#3a7d8f',
            error: '#AD585B',
            info: '#5991C2',
            success: '#67C7C7',
            warning: '#D3A175',
          },
        },
      },
    },
    defaults: {
      VTextField: {
        variant: 'outlined',
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})



