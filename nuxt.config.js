export default {
  // publice runtime config
  publicRuntimeConfig: {
    apiKey: process.env.API_KEY,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Cari Film | Cari tahu tentang film yang membuatmu ragu',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Jangan khawatir! dengan Cari Film, kamu bisa mencari tahu mengenai film yang kamu ragukan.',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: 'https://code.iconify.design/1/1.0.7/iconify.min.js',
        body: true,
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://www.omdbapi.com', // Used as fallback if no runtime config is provided
    https: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  // loading config
  loading: {
    color: '#fcd34d',
    height: '8px',
  },
}
