// https://nuxt.com/docs/api/configuration/nuxt-config
export default({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss', '@nuxt-alt/http'
  ],
  http:{
    baseURL:"http://localhost:5000/api",
    credentials:"omit",
    browserBaseURL:"http://localhost:5000/api",

  },
});
