import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/reset.css'
import axios from 'axios';
import qs from 'qs';
Vue.prototype.$qs = qs;
Vue.prototype.$axios = axios;
import VueQuillEditor  from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
 
let baseUrl = '';
switch (process.env.NODE_ENV) {
	case 'development':
		baseUrl = ''
		break;
	case 'production':
		baseUrl = 'http://admintest.happymmall.com'
		break;
}
console.log(process.env.NODE_ENV);
axios.defaults.baseURL = baseUrl;
Vue.use(VueQuillEditor);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
