import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'

import VueYouTubeEmbed from 'vue-youtube-embed'
import "vuetify/dist/vuetify.min.css"

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import { TiptapVuetifyPlugin } from 'tiptap-vuetify'

// don't forget to import styles
import 'tiptap-vuetify/dist/main.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFExL7Ar4KtvI5_ZuGnYMjzfjC47D8-Es",
  authDomain: "pages-3cfa2.firebaseapp.com",
  databaseURL: "https://pages-3cfa2.firebaseio.com",
  projectId: "pages-3cfa2",
  storageBucket: "gs://pages-3cfa2.appspot.com/",//pages-3cfa2.appspot.com,
  messagingSenderId: "357143642573",
  appId: "1:357143642573:web:a55576b5db9e4dca52c484",
  measurementId: "G-KP797GVWVS"
};

// Required for side-effects
require("firebase/firestore");
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  // Get a reference to the storage service, which is used to create references in your storage bucket
 //var st= firebase.storage();
var db = firebase.firestore();
export default db
// first it
Vue.use(VueYouTubeEmbed)

Vue.use(TiptapVuetifyPlugin, {
  // optional, default to 'md' (default vuetify icons before v2.0.0)
  iconsGroup: 'mdi'
})
Vue.config.productionTip = false

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store,
  vuetify,
  VueAxios,
  axios,
  VueYouTubeEmbed,
  TiptapVuetifyPlugin,
  render: h => h(App)
}).$mount('#app')
