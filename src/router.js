import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Welcome from '@/components/Welcome.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome
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
      component: Login
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import(/* webpackChunkName: "profile" */ './views/Profile.vue')
    },
    {
      path: '/library',
      name: 'library',
      component: () => import(/* webpackChunkName: "library" */ './views/Library.vue')
    },
    {
      path: '/newpage',
      name: 'newpage',
      component: () => import(/* webpackChunkName: "newpage" */ './views/Newpage.vue')
    },
    {
      path: '/example',
      name: 'example',
      component: () => import(/* webpackChunkName: "example" */ './views/ExamplePage.vue')
    },
    {
      path: '/:PageID',
      name: 'view-page',
      props: true,
      component: () => import('./views/ViewPage.vue')
    },
    {
      path: '/Edit/:PageID',
      name: 'edit-page',
      props: true,
      component: () => import('./views/EditPage.vue')
    },
  ]
})
