<template>
  <nav-component/>

  <div class="container-fluid">
    <div class="row">

      <menu-component/>

      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <!--Показываем странички с помощью роутера (файл index.ts)-->
        <router-view/>
      </main>

    </div>
  </div>
</template>

<script>
import NavComponent from "@/components/nav-component.vue";
import MenuComponent from "@/components/menu-component.vue";

export default {
  components: {
    NavComponent,
    MenuComponent
  }
}

</script>

<style scoped>

</style>