import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import GoogleMap from './components/GoogleMap.vue';
import PageNotFound from './components/PageNotFound.vue';
import { store } from './store/store';
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueRouter);

const routes = [
    {path: '/', component: GoogleMap},
    {path: "*", component: PageNotFound}
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCFIhawQMiOJepNYWILjuxNzPQxz2VkJms",
    libraries: "places" // necessary for places input
  }
});

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
})
