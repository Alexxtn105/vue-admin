<template>
  <main class="form-signin w-100 m-auto">
    <!-- Присваиваем атрибуту @submit реакцию на нажатие кнопки "Зарегистрироватьс"-->
    <!-- Чтобы увидеть в консоли введенные величины (для отладки0, нужно использовать атрибут submit.prevent-->
    <!-- Если используется prevent, обычное поведение меняется, не происходит атвоматического обновления формы-->
    <form @submit="submit">
      <h1 class="h3 mb-3 fw-normal">Регистрация</h1>

      <div class="form-floating">
        <input v-model="firstname" class="form-control" placeholder="Фамилия">
        <label for="floatingInput">Фамилия</label>
      </div>
      <div class="form-floating">
        <input v-model="lastname" class="form-control" placeholder="Имя">
        <label for="floatingInput">Имя</label>
      </div>
      <!--      <div class="form-floating">-->
      <!--        <input type="email" class="form-control" placeholder="name@example.com">-->
      <!--        <label for="floatingInput">Email address</label>-->
      <!--      </div>-->
      <div class="form-floating">
        <input v-model="email" type="email" class="form-control" placeholder="name@example.com">
        <label for="floatingInput">Email</label>
      </div>
      <div class="form-floating">
        <input v-model="password" type="password" class="form-control" placeholder="Пароль">
        <label for="floatingPassword">Пароль</label>
      </div>
      <div class="form-floating">
        <input v-model="passwordConfirm" type="password" class="form-control" placeholder="Подтверждение пароля">
        <label for="floatingPassword">Подтверждение пароля</label>
      </div>
      <!--Галочка "Запомнить меня"-->
      <!--      <div class="form-check text-start my-3">-->
      <!--        <input class="form-check-input" type="checkbox" value="remember-me">-->
      <!--        <label class="form-check-label" for="flexCheckDefault">-->
      <!--          Запомнить меня-->
      <!--        </label>-->
      <!--      </div>-->

      <button class="btn btn-primary w-100 py-2" type="submit">Зарегистрироваться</button>
    </form>
  </main>
</template>

<!--Для использования TypeScript устанавливаем атрибут lang="ts"-->
<script lang="ts">

// ОБЯЗАТЕЛЬНО объявляем переменную ref!!!
import {ref} from 'vue'

export default {
  setup() {
    const firstname = ref('');
    const lastname = ref('');
    const email = ref('');
    const password = ref('');
    const passwordConfirm = ref('');

    const submit = () => {
      console.log({
        // если мы используем их в коде - нужно брать value
        // также отключаем camelcase ы .eslintrc.js ( '@typescript-eslint/camelcase': "off")

        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        password: password.value,
        passwordConfirm: passwordConfirm.value,
      })
    }
    return {
      firstname,
      lastname,
      email,
      password,
      passwordConfirm,
      submit,
    }

  }
}
</script>

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





