// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: [ 'vuetify-nuxt-module'  ],
  devtools: { enabled: true },
  nitro: {
    experimental: {
      tasks: true
    }
  },
  runtimeConfig: {
    nakama: '',
    cms: '',
    public: {
      jwt: ''
    }
  }
})
