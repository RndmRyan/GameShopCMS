// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: [
    'vuetify-nuxt-module',
    '@pinia/nuxt'
  ],
  devtools: { enabled: true },
  nitro: {
    experimental: {
      tasks: true
    }
  },
  runtimeConfig: {
    nakama: process.env.nakamaDB_URL,
    cms: process.env.cmsDB_URL,
    public: {
      jwt: process.env.jwt_string
    }
  }
})
