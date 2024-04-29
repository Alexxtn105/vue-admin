<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";

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

const router = useRouter()

// заполняем список ролей
onMounted(async () => {
  //делаем запрос в бэкенд
  const {data} = await axios.get('roles');
  //присваиваем полученные данные
  roles.value = data;
});

//функция submit - оправка данных формой в бэкенд
const submit = async () => {
  try {
    // тестовый вывод в консоль
    // console.log(form);

    // постим форму в бэкенд
    await axios.post('users', data);

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

      <button class="btn btn-primary w-100 py-2" type="submit">Добавить пользователя</button>
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