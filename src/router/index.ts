import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import DashboardItem from "@/pages/dashboard-item.vue";
import UsersItem  from "@/pages/users-item.vue";
const routes: Array<RouteRecordRaw> = [
  {path:'', component:DashboardItem},
  {path:'/users', component:UsersItem},
]

//const router=createRouter(routes)

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
