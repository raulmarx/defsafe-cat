// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  plugins: ['~/plugins/initAuth','~/plugins/supabase'],
  css: [
    '~/assets/css/main.css'
  ],
  postcss: {
    plugins: 
    {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['@prisma/nuxt', '@pinia/nuxt', '@nuxtjs/tailwindcss', '@nuxt/icon'],
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap',
        },
      ],
      script: [
        {
          src: 'https://code.iconify.design/1.0.0/iconify.min.js',
        },
      ],
    },
  },
  devServer: {
    host: '127.0.0.1', // Escuta em todas as interfaces
    port: 3000
  },
  nitro: {
    esbuild: {
      options: {
        // esnextも可
        target: 'es2020'
      }
    }
  },
  vite: {
    optimizeDeps: {
      include: ['@iconify/vue'],
    },
    ssr: {
      external: ['@prisma/client'],
    },
  },
  
})
