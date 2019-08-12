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
    path: '/instore/nav',
    name: 'instore-nav',
    component: () => import('./views/instore/nav')
  },
  {
    path: '/instore/list',
    name: 'instore-list',
    component: () => import('./views/instore/list')
  },
  {
    path: '/assinstore/list',
    name: 'assinstore-list',
    component: () => import('./views/AssInstore/list')
  },
  {
    path: '/assinstore/receive',
    name: 'assinstore-receive',
    component: () => import('./views/AssInstore/receive')
  },
  {
    path: '/assinstore/testing',
    name: 'assinstore-testing',
    component: () => import('./views/AssInstore/testing')
  },
  {
    path: '/assinstore/use',
    name: 'assinstore-use',
    component: () => import('./views/AssInstore/use')
  },
  {
    path: '/instore/back_nav',
    name: 'instore-back_nav',
    component: () => import('./views/instore/back_nav'),
    meta: {
      title: '采购退货'
    }
  },
  {
    path: '/assinstore/back',
    name: 'assinstore-back',
    component: () => import('./views/AssInstore/back'),
    meta: {
      title: '外协采购退货'
    }
  },
  {
    path: '/assinstore/back_nav',
    name: 'assinstore-back_nav',
    component: () => import('./views/AssInstore/back_nav'),
    meta: {
      title: '外协采购退货'
    }
  },
  {
    path: '/assinstore/nav',
    name: 'assinstore-nav',
    component: () => import('./views/AssInstore/nav')
  },
  {
    path: '/instore/info',
    name: 'instore-info',
    component: () => import('./views/instore/info')
  },
  {
    path: '/instore/receive',
    name: 'instore-receive',
    component: () => import('./views/instore/receive')
  },
  {
    path: '/instore/use',
    name: 'instore-use',
    component: () => import('./views/instore/use')
  },
  {
    path: '/instore/testing',
    name: 'instore-testing',
    component: () => import('./views/instore/testing')
  },
  {
    path: '/instore/back',
    name: 'instore-back',
    component: () => import('./views/instore/back'),
    meta: {
      title: '采购退货'
    }
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
  },
  {
    path: '/receive',
    name: 'receive',
    component: () => import('./views/Order/receive'),
    meta: {
      title: '订单收货'
    }
  },
  {
    path: '/synergy/:typeid/:id',
    name: 'synergy',
    component: () => import('./views/synergy/index'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/synergy/summary/list',
    name: 'synergySummaryList',
    component: () => import('./views/synergy/summary/list')
  },
  // 生成纪要时，type为new、id为lastRecordId
  // 获取纪要时，type为view、id为summaryId
  {
    path: '/synergy/summary/:type/:groupId/:id',
    name: 'synergySummaryDetail',
    component: () => import('./views/synergy/summary/detail')
  },
  {
    path: '/delivery',
    name: 'delivery',
    component: () => import('./views/Order/delivery'),
    meta: {
      title: '订单收货'
    }
  },
  {
    path: '/order/receive_nav',
    name: 'receive_nav',
    component: () => import('./views/Order/receive_nav'),
    meta: {
      title: '订单收货查询'
    }
  },
  {
    path: '/order/delivery_nav',
    name: 'delivery_nav',
    component: () => import('./views/Order/delivery_nav'),
    meta: {
      title: '订单退货查询'
    }
  },
  {
    path: '/materiel/_nav',
    name: 'materiel-nav',
    component: () => import('./views/materiel/_nav'),
    meta: {
      title: '退料'
    }
  },
  {
    path: '/materiel/nav',
    name: 'materielNav',
    component: () => import('./views/materiel/nav'),
    meta: {
      title: '发料'
    }
  },
  {
    path: '/materiel/department_send',
    name: 'department_send',
    component: () => import('./views/materiel/department_send'),
    meta: {
      title: '对部门发料',
      keepAlive: true
    }
  },
  {
    path: '/materiel/department_back',
    name: 'department_back',
    component: () => import('./views/materiel/department_back'),
    meta: {
      title: '对部门退料'
    }
  },
  {
    path: '/materiel/select',
    name: 'materiel-select',
    component: () => import('./views/materiel/select'),
    meta: {
      title: '选择物料'
    }
  },
  {
    path: '/materiel/work_back',
    name: 'work_back',
    component: () => import('./views/materiel/work_back'),
    meta: {
      title: '对工装退料'
    }
  },
  {
    path: '/materiel/work_send',
    name: 'work_send',
    component: () => import('./views/materiel/work_send'),
    meta: {
      title: '对工装发料',
      keepAlive: true
    }
  },
  {
    path: '/scan/nav-send',
    name: 'scan-nav',
    component: () => import('./views/scan/nav-send'),
    meta: {
      title: '退料'
    }
  },
  {
    path: '/scan/nav-back',
    name: 'scan-nav',
    component: () => import('./views/scan/nav-back'),
    meta: {
      title: '退货'
    }
  },
  {
    path: '/scan/nav-receive',
    name: 'scan-nav',
    component: () => import('./views/scan/nav-receive'),
    meta: {
      title: '收货'
    }
  }
  ]
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'MoTooling'
  console.log(WEBURL(), token())
  const path = to.path.toLowerCase()
  if (to.query.weburl) {
    localStorage.WEBURL = decodeURIComponent(to.query.weburl)
  }
  if (to.query.uid) {
    localStorage.uid = decodeURIComponent(to.query.uid)
  }
  if (to.query.token) {
    sessionStorage.token = decodeURIComponent(to.query.token)
  }
  if (to.query.imurl) {
    localStorage.imurl = decodeURIComponent(to.query.imurl)
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
