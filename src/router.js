import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/mthtml',
  routes: [{
    path: '/',
    name: 'home',
    component: Home
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
    path: '/wxlogin',
    name: 'wxlogin',
    component: () => import('./views/wxLogin.vue')
  },
  {
    path: '/wxbindphone',
    name: 'wxbindphone',
    component: () => import('./views/wxBindPhone.vue')
  },
  {
    path: '/wxLoginSuccess',
    name: 'wxLoginSuccess',
    component: () => import('./views/wxLoginSuccess.vue')
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
  },
  {
    path: '/baogong',
    name: 'baogong'
  },
  // component: () => import('./views/Baogong/index.vue'),
  // children: [{
  {
    path: '/baogong/list',
    component: () => import('./views/Baogong/list.vue')
  },
  {
    path: '/baogong/detail',
    name: 'baogongDetail',
    component: () => import('./views/Baogong/detail.vue')
  }

  ]
})
