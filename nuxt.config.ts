// https://nuxt.com/docs/api/configuration/nuxt-config
import eslintPlugin from 'vite-plugin-eslint'

export default defineNuxtConfig({
  devtools: { enabled: false },
  devServer: {
    port: 3000,
  },
  vite: {
    plugins: [
      eslintPlugin(),
    ],
  },
  runtimeConfig: {
    public: {
      VITE_BASE_URL: process.env.VITE_BASE_URL,
      VITE_PUBLIC_PAY_API_KEY: process.env.VITE_PUBLIC_PAY_API_KEY,
    },
    VITE_SECRET_PAY_API_KEY: process.env.VITE_SECRET_PAY_API_KEY,
    VITE_SECRET_PAY_API_PRICE_ID: process.env.VITE_SECRET_PAY_API_PRICE_ID,
  },
  css: [
    '@/assets/styles/index.sass',
  ],
  modules: [
    '@pinia/nuxt',
    'nuxt-icons',
  ],
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;200;300;400;500;600;700;800;900&display=swap',
        },
      ],
      script: [
        {
          src: 'https://js.stripe.com/v3/',
        },
      ],
    },
  }
});
