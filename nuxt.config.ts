// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  css: ["~/assets/styles/index.scss"],
  build: { transpile: ["vue-toastification"] },

  devServer: {
    port: 3032,
  },

  modules: ["@nuxt/image", "nuxt-lazy-load"],

  lazyLoad: {
    directiveOnly: true,
  },

  runtimeConfig: {
    public: {
      HOST: process.env.HOST,
      BASE_URL: process.env.BASE_URL,
      API_URL: process.env.API_URL,
      BACK_URL: process.env.BACK_URL,

      BROADCAST_DRIVER: process.env.BROADCAST_DRIVER,
      PUSHER_APP_KEY: process.env.PUSHER_APP_KEY,
      PUSHER_HOST: process.env.PUSHER_HOST,
      PUSHER_APP_SECRET: process.env.PUSHER_APP_SECRET,
      PUSHER_PORT: process.env.PUSHER_PORT,
      PUSHER_APP_CLUSTER: process.env.PUSHER_APP_CLUSTER,
    },
  },

  devtools: { enabled: true },
});
