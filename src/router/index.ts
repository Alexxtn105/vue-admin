import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

import DashboardPage from "@/pages/dashboard-page.vue";
import UsersPage from "@/pages/users/users-page.vue";
import RegisterPage from "@/pages/register-page.vue";
import wrapperPage from "@/pages/wrapper-page.vue";
import LoginPage from "@/pages/login-page.vue";
import UserCreatePage from "@/pages/users/user-create-page.vue";
import UserEditPage from "@/pages/users/user-edit-page.vue";
import RolesPage from "@/pages/roles/roles-page.vue";
import RoleCreatePage from "@/pages/roles/role-create-page.vue";
import RoleEditPage from "@/pages/roles/role-edit-page.vue";
import ProductsPage from "@/pages/products/products-page.vue";
import ProductsEditPage from "@/pages/products/products-edit-page.vue";
import ProductsCreatePage from "@/pages/products/products-create-page.vue";
import OrdersPage from "@/pages/orders/orders-page.vue";
import OrdersCreatePage from "@/pages/orders/orders-create-page.vue";

const routes: Array<RouteRecordRaw> = [
    {path: '/register', component: RegisterPage},
    {path: '/login', component: LoginPage},
    {
        path: '',
        component: wrapperPage,
        children: [
            {path: '/dashboard', component: DashboardPage},
            {path: '/users', component: UsersPage},
            {path: '/users/create', component: UserCreatePage},
            {path: '/users/:id/edit', component: UserEditPage},
            {path: '/roles', component: RolesPage},
            {path: '/roles/create', component:RoleCreatePage},
            {path: '/roles/:id/edit', component: RoleEditPage},
            {path: '/products', component:ProductsPage},
            {path: '/products/:id/edit', component:ProductsEditPage},
            {path: '/products/create', component:ProductsCreatePage},
            {path: '/orders', component:OrdersPage},
            {path: '/orders/create', component:OrdersCreatePage},
        ]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
