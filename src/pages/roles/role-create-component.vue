<script setup lang="ts">
import {onMounted, reactive, ref, UnwrapNestedRefs} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";

// Переменная формы с использование reactive
//let formData: UnwrapNestedRefs<{ permissions: number[]; name: string }>;
const formData = reactive({
  name: '',
  permissions: [] // этот список меняется
});

const permissionList = ref([]); // это что у нас есть

// роцтер для редиректа
const router = useRouter()

// заполняем список ролей
onMounted(async () => {
  //делаем запрос в бэкенд
  const {data} = await axios.get('permissions');
  //присваиваем полученные данные
  //formData.permissions = data;

  permissionList.value = data;
});

const select = (id: number, checked: boolean) => {
  // если разрешение отмечено или нет - сделать как надо
  if (checked) {
    formData.permissions = [...formData.permissions, id as never];
    return;
  }

  formData.permissions = formData.permissions.filter(p => p != id)

}

//функция submit - оправка данных формой в бэкенд
const submit = async () => {
  try {
    // тестовый вывод в консоль
     console.log(formData);

    // постим форму в бэкенд
    //await axios.post('roles', formData);

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
        <label>Наименование</label>
        <input v-model="formData.name" class="form-control" name="first_name">
      </div>

      <div class="mb-4 row">
        <label class="col-sm-5 col-form-label">Разрешения</label>
        <p></p>
        <div class="form-check form-check-inline col-5" v-for="permission in permissionList" :key="permission.id">
          <input class="form-check-input" type="checkbox" :value="permission.id"
                 @change="select(permission.id, $event.target.checked)">
          <label class="form-check-label">{{ permission.name }}</label>
        </div>
      </div>
      <p></p>
      <button class="btn btn-primary w-100 py-2" type="submit">Добавить роль</button>
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