<script setup lang="ts">
import {onMounted, reactive, ref, UnwrapNestedRefs} from "vue";
import axios from "axios";
import {useRoute, useRouter} from "vue-router";
import {Permission} from "@/models/Permission";

// Переменная формы с использование reactive
//  явно указываем типы данных
//let formData: UnwrapNestedRefs<{ permissions: number[]; name: string }>;
const formData = reactive({
  name: '',
  permissions: [] as number[] // этот список меняется
});

const permissionList = ref([]); // это что у нас есть

// роцтер для редиректа
const router = useRouter()

//получаем параметры с помощью useRoue().
// Он отличается от useRoutes тем, что используется для получения параметров,
// а useRouter используется для навигации по страницам
// полученный route будет содержать необходимый нам id
// eslint-disable-next-line no-undef
const {params} = useRoute()

// заполняем список ролей
onMounted(async () => {
  //делаем запрос в бэкенд
  const {data} = await axios.get('permissions');
  //присваиваем полученные данные
  //formData.permissions = data;

  permissionList.value = data;

  //получаем ид текущей роли из параметров в URL
  const response = await axios.get(`roles/${params.id}`);

  //присваиваем данные из ответа сервера
  formData.name = response.data.name;

  //чтобы получить массив ид разрешений, нужно создать моедль (@/models.permission.ts)
  // а также использовать map():
  formData.permissions = response.data.permissions.map((p:Permission) =>p.id);

});

const select = (id: number, checked: boolean) => {
  // если разрешение отмечено или нет - сделать как надо
  if (checked) {
    formData.permissions = [...formData.permissions, id];
    return;
  }

  formData.permissions = formData.permissions.filter(p => p != id)

}

// функция расстановки галочек разрешений в соответствии с данными, полученными из бэкенда
const checked_old = (id: number) => {
  //возвращаем таким образом (с использованием метода some)
  //который возвращает true, если искомая величина присутствует в массиве
  return formData.permissions.some(p => p === id);
}
// функцию выше можно сделать короче:
const checked = (id: number) => formData.permissions.some(p => p === id);

//функция submit - оправка данных формой в бэкенд
const submit = async () => {
  try {
    // тестовый вывод в консоль
    console.log(formData.permissions);

    // постим форму в бэкенд
    await axios.put(`roles/${params.id}`, formData);

    //редирект на страницу пользователей в случае успеха
    await router.push('/roles');

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
        <label>Наименование роли</label>
        <input v-model="formData.name" class="form-control" name="first_name">
      </div>

      <div class="mb-4 row">
        <label class="col-sm-5 col-form-label">Разрешения</label>
        <p></p>
        <div class="form-check form-check-inline col-5" v-for="permission in permissionList" :key="permission.id">
          <input class="form-check-input" type="checkbox" :value="permission.id"
                 :checked="checked(permission.id)"
                 @change="select(permission.id, $event.target.checked)">
          <label class="form-check-label">{{ permission.name }}</label>
        </div>
      </div>

      <p></p>
      <button class="btn btn-primary w-50 py-2" type="submit">Сохранить</button>
      <router-link to="/roles" class="btn btn-secondary w-50 py-2">Отмена</router-link>
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