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
  plugins: ["~/plugins/maps.client", "~/plugins/dataApi", '~/plugins.auth.client'],
  modules: ['~/modules/auth', '~/modules/algolia''], 
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
    algolia: {
      appId: 'myId',
      apiKey: 'myKey'
    }
  },
  privateRuntimeConfig: {
    algolia: {
      appId: 'myId',
      key: 'myKey'
    }
  },
  // serverMiddleware: ['myServerMiddleware']
};
