<template>
  <!-- Наполнение будет описано в роутере (index.ts, раздел "const routes")-->
  <router-view></router-view>
  <!-- <wrapper-page/>-->
</template>

<style>
/* Установки рабочей области (кроме меню и панели навигации)*/
body {
  /* масштаб шрифта */
  font-size: 1.0rem;
  /* цвет фона */
  background-color: #303030;
  /* цвет текста */
  color: #fdc900;
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

  /* стиль строки поиска (пока отсутствует) */
  .navbar-search {
    display: block;
  }
}

/* стиль неактивного пункта меню */
.sidebar .nav-link {
  font-size: .875rem;
  font-weight: 500;
  color: #000000
}

/* стиль активного пункта меню */
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

export default defineComponent({
      components: {}
    }
)
</script>