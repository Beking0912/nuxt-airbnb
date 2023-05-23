export default {
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
  plugins: ["~/plugins/maps.client.js", "~/plugins/dataApi.js", '~/plugins.auth.client.js'],
  modules: [], 
  buildModules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/sass/app.scss"],
  build: {
    extractCSS: true,
    loaders: {
      limit: 0,
    }
  },
  publicRuntimeConfig: {
    auth: {
      cookieName: "idToken",
      clientId: "myclientid",
    },
  },
  privateRuntimeConfig: {
  },
  // serverMiddleware: ['myServerMiddleware.js']
};
