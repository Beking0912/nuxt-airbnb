import { defineNuxtConfig } from "@nuxt/bridge";

export default defineNuxtConfig({
  components: true,
  head: {
    titleTemplate: "nuxt-app: %s",
    htmlAttrs: {
      lang: "en",
    },
    bodyAttrs: {
      class: ["my-style"],
    },
    meta: [
      {
        charset: "utf-8",
      },
    ],
  },
  router: {
    prefetchLinks: false,
  },
  plugins: [
    "~/plugins/maps.client",
    "~/plugins/dataApi",
    "~/plugins/auth.client",
    "~/plugins/vCalendar.client",
    "~/plugins/stripe.client",
  ],
  modules: [
    "~/modules/auth",
    "~/modules/algolia",
    "~/modules/cloudinary",
    "~/modules/stripe",
  ],
  buildModules: ["@nuxtjs/tailwindcss", "@nuxt/image"],
  image: {
    cloudinary: {
      baseURL: "https://res.cloudinary.com/myCloudName/image/upload/",
    },
  },
  css: ["~/assets/sass/app.scss"],
  build: {
    extractCSS: true,
    loaders: {
      limit: 0,
    },
  },
  publicRuntimeConfig: {
    rootUrl: process.env.NODE_ENV === 'production' ? 'https://nuxt-bn-b-seven.vercel.app' : 'http://localhost:3000',
    auth: {
      cookieName: "idToken",
      clientId: "myclientid",
    },
    algolia: {
      appId: "myId",
      apiKey: "myKey",
    },
    cloudinary: {
      apiKey: "myKey",
      cloudName: "myCloudName",
    },
    stripe: {
      key: "myKey",
    },
  },
  privateRuntimeConfig: {
    algolia: {
      appId: "myId",
      key: "myKey",
    },
    cloudinary: {
      apisecret: "mySecret",
    },
    stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY,
    },
  },
  // serverMiddleware: ['myServerMiddleware']
})