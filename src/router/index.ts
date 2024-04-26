import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import DashboardPage from "@/pages/dashboard-page.vue";
import UsersPage from "@/pages/users-page.vue";
import RegisterPage from "@/pages/register-page.vue";
const routes: Array<RouteRecordRaw> = [
  {path:'', component:DashboardPage},
  {path:'/users', component:UsersPage},
  {path:'/register', component:RegisterPage},
]

//const router=createRouter(routes)

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
