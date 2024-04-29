<!--Для использования TypeScript устанавливаем атрибут lang="ts"-->
<script setup>
//отличие reactive от ref в том, что в reactive мы можем группировать несколько переменных
import {reactive} from "vue";
import {ref} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";


// Создаем объединенную переменную вместо двух разных.
// В этом и есть отличие reactive от ref
const form = reactive(
    {
      email: '',
      password: ''
    });

//создаем роутер для редиректа
const router = useRouter();

//реакция на нажатие кнопки
const submit = async () => {
  // //тестовый вывод данных в консоль
  // console.log({
  //   email: form.email,
  //   password: form.password
  // })

  // нужно сконфигурировать axios в main.ts

  await axios.post(
      //'http://localhost:3000/api/login',
      'login',  // базовый URL в main.ts (например: http://localhost:3000/api/)
      {
        email: form.email,
        password: form.password
      },
      {
        // !!! Вынес withCredentials в дефолты axios (main.ts),
        // поэтому нижнюю можно закомментить
        withCredentials: true  // <-- ВНИМАНИЕ!!! Обязательно добавляем параметр withCredentials:true, будут взяты куки из бэкэнда!
      }
  );

  //в случае успешного логина переходим на главную страницу
  await router.push('/');
};


////мой вариант без reactive
// setup() {
//   const email = ref('');
//   const password = ref('');
//
//   //создаем роутер для редиректа
//   const router = useRouter();
//
//   const submit = async () => {
//     await axios.post(
//         'http://localhost:3000/api/login',
//         {
//           email: email.value,
//           password: password.value,
//         });
//
//     //в случае успешной регистрации переходим на страницу логина
//     await router.push('/login');
//   };
//
//   return {
//     email,
//     password,
//     submit,
//   }
// }

</script>

<!--Шаблон компонента-->
<template>
  <main class="form-signin w-100 m-auto">
    <!-- Присваиваем атрибуту @submit реакцию на нажатие кнопки "Зарегистрироваться"-->
    <!-- Чтобы увидеть в консоли введенные величины (для отладки, нужно использовать атрибут submit.prevent-->
    <!-- Если используется prevent, обычное поведение меняется, не происходит автоматического обновления формы-->
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Вход</h1>

      <div class="form-floating">
        <input v-model="form.email" type="email" class="form-control" placeholder="name@example.com">
        <label for="floatingInput">Email</label>
      </div>

      <div class="form-floating">
        <input v-model="form.password" type="password" class="form-control" placeholder="Пароль">
        <label for="floatingPassword">Пароль</label>
      </div>



      <!-- Галочка "Запомнить меня"-->
      <!-- <div class="form-check text-start my-3">-->
      <!--   <input class="form-check-input" type="checkbox" value="remember-me">-->
      <!--   <label class="form-check-label" for="flexCheckDefault">-->
      <!--     Запомнить меня-->
      <!--   </label>-->
      <!-- </div>-->

      <button class="btn btn-primary w-100 py-2" type="submit">Войти</button>
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
