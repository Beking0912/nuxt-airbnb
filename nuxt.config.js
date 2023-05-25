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
  plugins: ["~/plugins/maps.client", "~/plugins/dataApi", '~/plugins/auth.client', '~/plugins/vCalendar.client'],
  modules: ['~/modules/auth', '~/modules/algolia', '~/modules/cloudinary', '@nuxtjs/cloudinary'], 
  buildModules: ["@nuxtjs/tailwindcss", "@nuxt/image"],
  cloudinary: {
    cloudName: 'myCloudName',
  },
  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/myCloudName/image/upload/'
  },
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
    },
    cloudinary: {
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
