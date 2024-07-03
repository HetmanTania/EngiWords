// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
      "@nuxt/image",
      '@pinia/nuxt',

      "@nuxtjs/google-fonts",
      ['@nuxtjs/google-fonts', {
        families: {
            Inter: {
                wght: [100, 400, 500, 600],
            }
        }
      }]
  ],
    pinia: {
        storesDirs: ['./stores/**'],
    },
})