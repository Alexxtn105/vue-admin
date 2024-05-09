<!--если нужно использовать typescript, в теге script указываем атрибут setup lang="ts"-->
<script setup lang="ts">
import {onMounted, ref, computed, watch} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

const name = ref('')
const router = useRouter()

//получаем пользователя с использованием механизма vuex (store)
const  store=useStore();
const user=computed(()=>store.state.User.user);
//обзательно приручиваем наблюдателя за изменение состояния user:
watch(user, ()=>{
  name.value=user.value.first_name+' '+user.value.last_name;
  console.log(user.value);
});


// прежде чем использовать axios, необходимо дождаться,
// пока отрендерится вся html-страничка,
// поэтому используем событие onMounted:
/*
// Переделал с помощью vuex (см. код выше)
onMounted(async () => {
  try {
    //const {data} = await axios.get('user', {withCredentials: true});
    const {data} = await axios.get('user'); // конфиг withCredentials: true вынес в дефолты (main.ts)

    //присваиваем величину текущего залогиненного пользователя из полученного json
    name.value = data.first_name + ' ' + data.last_name;
    console.log(data)
  } catch (e) {
    // !! Редирект на страницу логина в случае ошибки (пользователь не аутентифицирован или что-то еще)
    await router.push('/login');
  }
});
*/


// логаут
const logout = async () => {
  // вызываем в бэк-енде функцию логаута
  await axios.post('logout')
}

</script>


<template>
  <nav class="navbar navbar-dark sticky-top bg-dark flex-nd-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">AlexxTN</a>

    <nav class="my-2 my-md-0 nr-md-3">
      <!--Имя залогиненного пользователя (через router-link), ведет на страницу профиля пользователя-->
      <router-link to="/profile" class="p-2 text-white text-decoration-none">{{ name }}</router-link>
      <!--Кнопка выйти. Переходим на страницу логина, добавляем атрибут @click-->
      <router-link to="/login" class="p-2 text-white text-decoration-none" @click="logout">Выйти</router-link>
    </nav>
  </nav>


  <!--===================СТАРЫЙ ВАРИАНТ=============================-->
  <!--  <header class="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark">-->
  <!--    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" href="#">Company name</a>-->

  <!--    <ul class="navbar-nav flex-row d-md-none">-->
  <!--      <li class="nav-item text-nowrap">-->
  <!--        <button class="nav-link px-3 text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSearch" aria-controls="navbarSearch" aria-expanded="false" aria-label="Toggle search">-->
  <!--          <svg class="bi"><use xlink:href="#search"/>Search</svg>-->
  <!--        </button>-->
  <!--      </li>-->
  <!--      <li class="nav-item text-nowrap">-->
  <!--        <button class="nav-link px-3 text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">-->
  <!--          <svg class="bi"><use xlink:href="#list"/></svg>-->
  <!--        </button>-->
  <!--      </li>-->
  <!--    </ul>-->

  <!--    <div id="navbarSearch" class="navbar-search w-100 collapse">-->
  <!--      <input class="form-control w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search">-->
  <!--    </div>-->

  <!--  </header>-->
</template>
