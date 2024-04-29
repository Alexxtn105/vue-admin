import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

import DashboardPage from "@/pages/dashboard-page.vue";
import UsersPage from "@/pages/users/users-page.vue";
import RegisterPage from "@/pages/register-page.vue";
import wrapperPage from "@/pages/wrapper-page.vue";
import LoginPage from "@/pages/login-page.vue";
import UserCreateComponent from "@/pages/users/user-create-component.vue";
import UserEditComponent from "@/pages/users/user-edit-component.vue";

const routes: Array<RouteRecordRaw> = [
    {path: '/register', component: RegisterPage},
    {path: '/login', component: LoginPage},
    {
        path: '',
        component: wrapperPage,
        children: [
            {path: '', component: DashboardPage},
            {path: '/users', component: UsersPage},
            {path: '/users/create', component: UserCreateComponent},
            {path: '/users/:id/edit', component: UserEditComponent},
        ]
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
