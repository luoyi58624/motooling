import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import { WEBURL, token } from '@/utils/utils.js'

Vue.use(Router)
// router.beforeRouterEnter((to, from, next) => {
//   console.log(this, 'beforeRouteEnter'); // undefined
//   console.log(to, '组件独享守卫beforeRouteEnter第一个参数');
//   console.log(from, '组件独享守卫beforeRouteEnter第二个参数');
//   console.log(next, '组件独享守卫beforeRouteEnter第三个参数');
//   next(vm => {
//     //因为当钩子执行前，组件实例还没被创建
//     // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
//     console.log(vm);//当前组件的实例
//   });

// })

var router = new Router({
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
  },
  {
    path: '/baogong/work-center',
    name: 'work-center',
    component: () => import('./views/Baogong/work-center.vue')
  },
  {
    path: '/baogong/manage',
    name: 'manage',
    component: () => import('./views/Baogong/manage.vue')
  },
  {
    path: '/baogong/setting',
    name: 'setting',
    component: () => import('./views/Baogong/setting.vue')

  },
  {
    path: '/baogong/work-shop',
    name: 'work-shop',
    component: () => import('./views/Baogong/work-shop.vue')
  },
  {
    path: '/instore/list',
    name: 'instore-list',
    component: () => import('./views/instore/list')
  },
  {
    path: '/instore/info',
    name: 'instore-info',
    component: () => import('./views/instore/info')
  },
  {
    path: '/instore/setting',
    name: 'instore-setting',
    component: () => import('./views/instore/setting'),
    meta: {
      keepAlive: true // 需要被缓存
    },
    children: [
      {
        path: 'pick',
        name: 'instore-pick',
        component: () => import('./views/instore/pick'),
        meta: { keepAlive: true }
      },
      {
        path: 'select',
        name: 'instore-select',
        component: () => import('./views/instore/select'),
        meta: { keepAlive: true }
      }
    ]
  },
  {
    path: '/instore/search',
    name: 'search',
    component: () => import('./views/instore/search')
  },
  {
    path: '/stock/list',
    name: 'stock-list',
    component: () => import('./views/stock/list')
  },
  {
    path: '/stock/info',
    name: 'stock-info',
    component: () => import('./views/stock/info')
  },
  {
    path: '/stock/inventory',
    name: 'stock-inventory',
    component: () => import('./views/stock/inventory')
  },
  {
    path: '/stock/statelist',
    name: 'state-list',
    component: () => import('./views/stock/stateList')
  }

  ]
})
router.beforeEach((to, from, next) => {
  console.log(WEBURL(), token())
  const path = to.path.toLowerCase()
  if (to.query.weburl) {
    localStorage.WEBURL = decodeURIComponent(to.query.weburl)
  }
  if (to.query.token && to.query.weburl) {
    next()
    return
  } else if (path === '/login' || path === '/daohang' || path === '/' || path === '/wxlogin' || path === '/wxloginsuccess' || path === '/wxbindphone') {
  } else if (!WEBURL() || !token()) {
    router.replace('/login?redirectURL=' + encodeURIComponent(to.fullPath))
    return
  }
  // setTimeout(()=>{next()},2000)
  next()
})
export default router
