import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/daohang'
      // component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/daohang',
      name: 'daohang',
      component: () => import('./views/Daohang.vue')
    },
    {
      path: '/device/add',
      name: 'device',
      component: () => import('./views/Device/add.vue')
    },
    {
      path: '/person/add',
      name: 'person',
      component: () => import('./views/Person/add.vue')
    },
    {
      path: '/person/addbackups',
      name: 'person11',
      component: () => import('./views/Person/add-backup.vue')
    },
    {
      path: '/supplier/add',
      name: 'supplier',
      component: () => import('./views/Supplier/add.vue')
    },
    {
      path: '/customer/add',
      name: 'customer',
      component: () => import('./views/Customer/add.vue')
    }

  ]
})
