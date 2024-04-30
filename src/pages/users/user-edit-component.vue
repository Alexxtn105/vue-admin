<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import {useRoute, useRouter} from "vue-router";

// переменные формы с использование reactive
const data = reactive({
  first_name: '',
  last_name: '',
  email: '',
  role_id: ''
});

// Для получения ролей используем ref.
// Не используем в reactive, поскольку список ролей и данные пользователя
// не связаны между собой, это разные данные
const roles = ref([]);

// роутер для редиректа на страницу пользователей
const router = useRouter()

//получаем параметры с помощью useRoue().
// Он отличается от useRoutes тем, что используется для получения параметров,
// а useRouter используется для навигации по страницам
// полученный route будет содержать необходимый нам id
const route = useRoute()

// заполняем список ролей
onMounted(async () => {
  try {
    //делаем запрос в бэкенд
    const rolesResponse = await axios.get('roles');

    //присваиваем полученные данные
    roles.value = rolesResponse.data;

    // получаем параметры с помощью route
    // и отправляем get-запрос в бэкенд
    const response = await axios.get(`users/${route.params.id}`);

    // получили response с сервера, присваиваем нашим данным полученное
    data.first_name = response.data.first_name;
    data.last_name = response.data.last_name;
    data.email = response.data.email;
    data.role_id = response.data.role.id; // <-- обратите внимание на правую часть

  } catch (e) {
    alert(e);
  }
});

//функция submit - оправка данных формой в бэкенд
const submit = async () => {
  try {
    // тестовый вывод в консоль
    // console.log(form);

    // постим форму в бэкенд (id пользователя берем из параметров route, объявленного ранее)
    await axios.put(`users/${route.params.id}`, data);

    //редирект на страницу пользователей в случае успеха
    await router.push('/users');

  } catch (e) {
    alert(e)
  }
}

</script>


<!--Шаблон формы-->
<template>
  <main class="form-signin w-100 m-auto">
    <form @submit.prevent="submit">
      <div class="mb-3">
        <label>Фамилия</label>
        <input v-model="data.first_name" class="form-control" name="first_name">
      </div>
      <div class="mb-3">
        <label>Имя</label>
        <input v-model="data.last_name" class="form-control" name="last_name">
      </div>
      <div class="mb-3">
        <label>Email</label>
        <input v-model="data.email" class="form-control" name="email">
      </div>
      <div class="mb-3">
        <label>Роль</label>
        <select v-model="data.role_id" class="form-control" name="role_id">
          <option v-for="role of roles" :key="role.id" :value="role.id">
            {{ role.name }}
          </option>
        </select>
      </div>

      <button class="btn btn-primary w-50 py-2" type="submit">Сохранить</button>
      <router-link to="/users" class="btn btn-secondary w-50 py-2">Отмена</router-link>
    </form>
  </main>
</template>

<!--Атрибут scoped означает, что стиль применяется только к текущему компоненту-->
<style scoped>
html,
body {
  height: 100%;
}

.form-signin {
  max-width: 330px;
  padding: 1rem;

}

.form-signin .form-floating:focus-within {
  z-index: 2;

}

/*Стили для всех полей ввода*/
.form-signin input {
  margin-bottom: 3px;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  /* цвет фона */
  background-color: #303030;
  /* цвет текста */
  color: #fdc900;
}

/*стили для конкретного поля ввода*/
/*
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

 */
</style>