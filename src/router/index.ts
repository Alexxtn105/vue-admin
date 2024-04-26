import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import DashboardPage from "@/pages/dashboard-page.vue";
import UsersPage from "@/pages/users-page.vue";
import RegisterPage from "@/pages/register-page.vue";
import wrapperPage from "@/pages/wrapper-page.vue";
const routes: Array<RouteRecordRaw> = [
  {path:'/register', component:RegisterPage},
  {
    path:'',
    component: wrapperPage,
    children:[
      {path:'', component:DashboardPage},
      {path:'/users', component:UsersPage},
    ]
  },

]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
