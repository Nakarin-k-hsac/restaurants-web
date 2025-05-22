// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['bootstrap/dist/css/bootstrap.min.css'],
  app: {
    head: {
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
          defer: true,
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      apiService: process.env.API_SERVICE,
      apiKey: process.env.GOOGLE_MAPS_API_KEY,
      apiPhoto: process.env.GOOGLE_MAPS_API_KEY,
    }
  }
})
