// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  extends: ['@nuxt/ui-pro'],
  modules: ['@nuxt/ui', '@nuxtjs/color-mode'],
  // ui: {
  //   variables: {
  //     light: {
  //       background: '255 255 255',
  //       foreground: 'var(--color-gray-700)'
  //     },
  //     dark: {
  //       background: 'var(--color-gray-900)',
  //       foreground: 'var(--color-gray-200)'
  //     },

  //   }
  // }
})