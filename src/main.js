import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";

Vue.config.productionTip = false;

const config = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATA_BASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: "",
  messagingSenderId: process.env.VUE_APP_MESSAGIN_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID
};

firebase.initializeApp(config);

export const db = firebase.firestore();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
