<script setup lang="ts">

import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import {useRoute, useRouter} from "vue-router";
import ImageUpload from "@/components/image-upload.vue";

// переменные формы с использование reactive
const data = reactive({
  title: '',
  description: '',
  image: '',
  price: 0
});

// Для получения ролей используем ref.
// Не используем в reactive, поскольку список ролей и данные пользователя
// не связаны между собой, это разные данные
const products = ref([]);

// роутер для редиректа на страницу пользователей
const router = useRouter()

//получаем параметры с помощью useRoute().
// Он отличается от useRoutes тем, что используется для получения параметров,
// а useRouter используется для навигации по страницам
// полученный route будет содержать необходимый нам id
const route = useRoute()

// заполняем список ролей
onMounted(async () => {
  try {
    //делаем запрос в бэкенд
    const productsResponse = await axios.get('products');

    //присваиваем полученные данные
    products.value = productsResponse.data;

    // получаем параметры с помощью route
    // и отправляем get-запрос в бэкенд
    const response = await axios.get(`products/${route.params.id}`);

    // получили response с сервера, присваиваем нашим данным полученное
    data.title = response.data.title;
    data.description = response.data.description;
    data.image = response.data.image;
    data.price = response.data.price; // <-- обратите внимание на правую часть

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
    await axios.put(`products/${route.params.id}`, data);

    //редирект на страницу пользователей в случае успеха
    await router.push('/products');

  } catch (e) {
    alert(e)
  }
}

</script>

<template>
  <main class="form-signin w-100 m-auto">
    <form @submit.prevent="submit">
      <div class="mb-3">
        <label>Название</label>
        <input v-model="data.title" class="form-control" name="first_name">
      </div>
      <div class="mb-3">
        <label>Описание</label>
        <input v-model="data.description" class="form-control" name="last_name">
      </div>
      <div class="mb-3">
        <!--<input v-model="data.image" class="form-control" name="image">-->
        <label>Изображение</label>
        <div class="input-group">
          <input v-model="data.image" class="form-control" name="image">
          <!--Кнопка открытия файла-->
          <!-- Реагируем на emit @uploaded. В переменной $event будет url загруженного файла-->
          <image-upload @uploaded="data.image = $event"/>
        </div>
      </div>
      <div class="mb-3">
        <label>Цена</label>
        <input v-model="data.price" type="number" class="form-control" name="email">
      </div>

      <button class="btn btn-primary w-50 py-2" type="submit">Сохранить</button>
      <router-link to="/products" class="btn btn-secondary w-50 py-2">Отмена</router-link>
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