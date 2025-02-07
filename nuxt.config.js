import vuetify, {transformAssetUrls} from 'vite-plugin-vuetify'

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: false},
    ssr: false,
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            titleTemplate: '%s :: یتیر',
            title: 'سرویس مرسوله هوشمند',
            script: [
                { src: "https://static.neshan.org/sdk/openlayers/5.3.0/ol.js" }
            ],
            link: [
                { rel: "stylesheet", href: "https://static.neshan.org/sdk/openlayers/5.3.0/ol.css" }
            ],
        },
    },
    sourcemap: {
        client: false,
        server: false,
    },
    build: {
        transpile: ['vuetify'],
    },
    modules: [
        (_options, nuxt) => {
            nuxt.hooks.hook('vite:extendConfig', (config) => {
                config.plugins.push(vuetify({autoImport: true}))
            })
        },
        '@pinia/nuxt',
    ],
    vite: {
        vue: {
            template: {
                transformAssetUrls,
            },
        },
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    css: [
        'vuetify/styles',
        '~/assets/css/tailwind.css',
        '@mdi/font/css/materialdesignicons.min.css',
        '~/assets/scss/core.scss',
    ],
})
