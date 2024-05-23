import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//comienza firebase
import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyBTtBMG7p01XCW8NJ4lnD1akj0FmSVxJuI",
    authDomain: "programacionweb-26a8d.firebaseapp.com",
    projectId: "programacionweb-26a8d",
    storageBucket: "programacionweb-26a8d.appspot.com",
    messagingSenderId: "6224952246",
    appId: "1:6224952246:web:a615b13b7c12961bf85f17"
  };

initializeApp(firebaseConfig);
//termina firebase

const app = createApp(App)

app.use(router)

app.mount('#app')
