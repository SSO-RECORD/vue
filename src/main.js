import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import '@/assets/css/tailwind.css'

const app = createApp(App)

// app.use(createPinia())
// useKakao('9fa9d70306c91cd166d089cb47173852')
app.use(router)
app.use(vuetify)
app.mount('#app')
