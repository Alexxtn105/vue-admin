<template>
  <div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
    <div class="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu"
         aria-labelledby="sidebarMenuLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="sidebarMenuLabel">AlexxTN</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu"
                aria-label="Close"></button>
      </div>
      <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
        <ul class="nav flex-column">
          <li class="nav-item">
            <!--Указываем router-link to / -->
            <!--Для подсветки текущего выделенного пункта меню - используем active-class="active" -->
            <router-link to="/dashboard" active-class="active" class="nav-link">
              График
            </router-link>
          </li>
          <li class="nav-item">
            <!--Указываем router-link to /users -->
            <!--Для подсветки текущего выделенного пункта меню - используем active-class="active" -->
            <router-link to="/users" active-class="active" class="nav-link">
              Пользователи
            </router-link>
          </li>

          <li class="nav-item">
            <!--Указываем router-link to /roles -->
            <!--Для подсветки текущего выделенного пункта меню - используем active-class="active" -->
            <router-link to="/roles" active-class="active" class="nav-link">
              Роли
            </router-link>
          </li>
          <li class="nav-item">
            <!--Указываем router-link to /roles -->
            <!--Для подсветки текущего выделенного пункта меню - используем active-class="active" -->
            <router-link to="/products" active-class="active" class="nav-link">
              Товары
            </router-link>
          </li>
          <li class="nav-item">
            <!--Указываем router-link to /roles -->
            <!--Для подсветки текущего выделенного пункта меню - используем active-class="active" -->
            <router-link to="/orders" active-class="active" class="nav-link">
              Заказы
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

