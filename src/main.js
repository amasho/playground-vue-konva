import Vue from 'vue'
import VueKonva from 'vue-konva'
import Vuetify from 'vuetify'
import App from '@/App'
import router from '@/router'

import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

Vue.use(VueKonva)
Vue.use(Vuetify, {
  options: {
    customProperties: true
  },
  iconfont: 'md'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: a => a(App)
})
