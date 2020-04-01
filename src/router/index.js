import Vue from 'vue'
import VueRouter from 'vue-router'
import CreatePwd from '../views/CreatePwd.vue'
import EmailTest from '../views/EmailTest.vue'
import BankTest from '../views/BankTest.vue'
import MobileTest from '../views/MobileTest.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'CreatePwd',
    component: CreatePwd
  },
  {
    path: '/emailTest',
    name: 'EmailTest',
    component: EmailTest,
    props: true
  },
  {
    path: '/bankTest',
    name: 'BankTest',
    component: BankTest,
    props: true
  },
  {
    path: '/mobileTest',
    name: 'MobileTest',
    component: MobileTest,
    props: true
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router