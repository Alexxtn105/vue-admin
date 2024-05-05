<script setup lang="ts">
import {reactive, onMounted} from "vue";
import axios from "axios";

const infoData = reactive({
  first_name: '',
  last_name: '',
  email: ''
});

const passwordData = reactive({
  password: '',
  password_confirm: ''
})


onMounted(async () => {
  try {
    const {data} = await axios.get('user')
    infoData.first_name = data.first_name;
    infoData.last_name = data.last_name;
    infoData.email = data.email;
  } catch (e) {
    alert(e)
  }
});

// сохранение данных пользователя
const infoSubmit = async () => {
//
  try {
    await axios.put('users/info', infoData);
  } catch (e) {
    alert(e)
  }
}

//ихменение пароля
const passwordSubmit = async () => {
//
  try {
    await axios.put('users/password', passwordData);
  } catch (e) {
    alert(e)
  }
}

</script>

<template>
  <h3>Account Information</h3>
  <main class="form-signin w-100 m-auto">
    <!--Прикручиваем реакцию на нажатие кнопки Сохранить (данные пользователя)-->
    <form @submit.prevent="infoSubmit">
      <div class="mb-3">
        <label>Фамилия</label>
        <input v-model="infoData.first_name" class="form-control" name="first_name">
      </div>
      <div class="mb-3">
        <label>Имя</label>
        <input v-model="infoData.last_name" class="form-control" name="last_name">
      </div>
      <div class="mb-3">
        <label>Email</label>
        <input v-model="infoData.email" class="form-control" name="email">
      </div>

      <button class="btn btn-outline-secondary">Сохранить</button>
    </form>

    <h3 class="mt-4">Изменить пароль</h3>
    <!--Прикручиваем реакцию на нажатие кнопки Сохранить (изменение пароля)-->
    <form @submit.prevent="passwordSubmit">
      <div class="mb-3">
        <label>Пароль</label>
        <input v-model="passwordData.password" type="password" class="form-control" name="password">
      </div>
      <div class="mb-3">
        <label>Подтверждение</label>
        <input v-model="passwordData.password_confirm" type="password" class="form-control" name="password_confirm">
      </div>

      <button class="btn btn-outline-secondary">Сохранить</button>
    </form>
  </main>

</template>

