import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Signin from '../views/Signin.vue'
import Signup from '../views/Signup.vue'
import User from '../views/User.vue'
import Users from '../views/Users.vue'
import Product from '../views/Product.vue'
import ProductAdd from '../views/ProductAdd.vue'
import ProductUpdate from '../views/ProductUpdate.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin,
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
  },
  {
    path: '/user',
    name: 'user',
    component: User,
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
  },
  {
    path: '/product/:id',
    name: 'product',
    component: Product,
    props: true,
  },
  {
    path: '/products/add',
    name: 'product-add',
    component: ProductAdd,
  },
  {
    path: '/products/:id/update',
    name: 'product-update',
    component: ProductUpdate,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
