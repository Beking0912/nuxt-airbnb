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
  modules: ['~/modules/auth', '~/modules/algolia', '~/modules/cloudinary'], 
  buildModules: ["@nuxtjs/tailwindcss"],
  serverMiddleware: [
    function(req, res, next) {
      console.log(req.body);
      next();
    }
  ],
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
    },
    cloudinary: {
      apisecret: 'mySecret'
    }
  },
  // serverMiddleware: ['myServerMiddleware']
};
