// https://nuxt.com/docs/api/configuration/nuxt-config
import eslintPlugin from 'vite-plugin-eslint'

export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: 3000,
  },
  vite: {
    plugins: [
      eslintPlugin(),
    ],
  },
  css: [
    '@/assets/styles/index.sass',
  ],
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;200;300;400;500;600;700;800;900&display=swap',
        },
      ],
    },
  }
});
