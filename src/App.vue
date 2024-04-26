<template>
  <nav-item/>

  <div class="container-fluid">
    <div class="row">

      <menu-item/>

      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <!--Показываем странички с помощью роутера (файл index.ts)-->
        <router-view/>
      </main>
    </div>
  </div>
</template>

<style>
body {
  font-size: 1.0rem;
}

.bi {
  display: inline-block;
  width: 1rem;
  height: 1rem;
}

/*
 * Sidebar
 */

@media (min-width: 768px) {
  .sidebar .offcanvas-lg {
    position: sticky;
    top: 48px;
  }

  .navbar-search {
    display: block;
  }
}

.sidebar .nav-link {
  font-size: .875rem;
  font-weight: 500;
}

.sidebar .nav-link.active {
  color: #2470dc;
}

.sidebar-heading {
  font-size: .75rem;
}

/*
 * Navbar
 */

.navbar-brand {
  padding-top: .75rem;
  padding-bottom: .75rem;
  background-color: rgba(0, 0, 0, .25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
}

.navbar .form-control {
  padding: .75rem 1rem;
}
</style>

<script>

import {defineComponent} from "vue";
import NavItem from "@/components/nav-item.vue";
import MenuItem from "@/components/menu-item.vue";
// import UsersItem from "@/pages/users-item.vue";

export default defineComponent({
  components: {
    MenuItem,
    NavItem
  }
})
</script>