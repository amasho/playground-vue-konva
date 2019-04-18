import Vue from 'vue'
import Router from 'vue-router'
import KonvaExample from '../components/KonvaExample.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/example',
      name: 'KonvaExample',
      component: KonvaExample
    }
  ]
})
