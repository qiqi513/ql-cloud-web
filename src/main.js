
import Vue from 'vue'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import 'element-ui/lib/theme-chalk/index.css'
import Avue from '@smallwei/avue'
import '@smallwei/avue/lib/theme-chalk/index.css'

import '@/styles/index.scss'

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission'

Vue.use(Avue);
Vue.use(ElementUI, { locale });
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
