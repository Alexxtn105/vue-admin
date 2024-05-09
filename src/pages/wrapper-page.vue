<!--Этот шаблон обертывает все нужные страницы для аутентифицированного пользователя-->
<script setup lang="ts">
import NavComponent from "@/components/nav-component.vue";
import MenuComponent from "@/components/menu-component.vue";
import {onMounted} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

//для маршрутизации
const router = useRouter();
//для хранения сотояния текущего пользователя (смотри ../store/index.ts
const store = useStore();

// прежде чем использовать axios, необходимо дождаться,
// пока отрендерится вся html-страничка,
// поэтому используем событие onMounted:
onMounted(async () => {
  try {
    // конфиг get-запроса withCredentials: true вынес в дефолты (main.ts)
    const {data} = await axios.get('user');

    //сохраняем данные пользователя в store
    //здесь 1й параметр - action, 2й - данные пользователя
    //фактически, мы генерим событие "изменение состояния пользователя".
    // Это событие будет использоваться для рендеринга инфо о пользователе (см. nav)
    await store.dispatch('setUser', data)

    //пишем данные пользователя в консоль
    console.log(data);
  } catch (e) {
    alert(e);
    await router.push('/login');
  }
});

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