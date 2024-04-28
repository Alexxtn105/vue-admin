<!--Этот шаблон обертывает все нужные страницы для аутентифицированного пользователя-->
<script>
import NavComponent from "@/components/nav-component.vue";
import MenuComponent from "@/components/menu-component.vue";
import {onMounted} from "vue";
import axios from "axios";

export default {
  components: {
    NavComponent,
    MenuComponent
  },
  setup() {
    // прежде чем использовать axios, необходимо дождаться,
    // пока отрендерится вся html-страничка,
    // поэтому используем событие onMounted:
    onMounted(async () => {
      //const {data} = await axios.get('user', {withCredentials: true});
      const {data} = await axios.get('user'); // конфиг withCredentials: true вынес в дефолты (main.ts)
      console.log(data)
    })
  }

}


</script>

<!--Шаблон компонента-->
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

<!--Стиль компонента-->
<style scoped>

</style>