<script setup lang="ts">
import component from "*.vue";
import {onMounted, ref, watch} from "vue";
import axios from "axios";
import {Product} from "@/models/Product";
import PaginatorComponent from "@/components/paginator-component.vue";

//для полученных с сервера данных
const products = ref([])

// переменные для страничного вывода
const lastPage = ref(0);

const load = async (page = 1) => {
  const {data} = await axios.get(`products?page=${page}`);

  //присваиваем data.data поскольку данные выводятся постранично
  products.value = data.data;

  //берем индекс последней страницы из принятых данных, чтобы ограничить навигацию
  lastPage.value = data.meta.last_page;

};

//как только сгенерировался html
onMounted(load);

// удаление
// Функция удаления пользователя из таблицы
// в параметрах - id пользователя
const del = async (id: number) => {
  //выводим подтверждение
  if (confirm('Вы уверены, что желаете удалить товар?')) {
    try {
      // удалаяем пользователя в бэкенде
      await axios.delete(`products/${id}`);

      // также обновляем данные во фроненде
      // предварительно нужно создать структуру user в @/models/product (документ typescript)
      // фактически, просто применяем фильтр (не равно ИД)
      products.value = products.value.filter((p: Product) => p.id !== id);
    } catch (e) {
      alert(e)
    }
  }
}


</script>

<template>
  <!--Кнопка Добавить-->
    <div class="btn-group mr-2">
      <router-link to="/products/create" class="btn btn-sn btn-outline-primary">Добавить</router-link>
    </div>

  <!--  Таблица-->
  <div class="table-responsive small">
    <table class="table table-striped table-sm">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Изображение</th>
        <th scope="col">Название</th>
        <th scope="col">Описание</th>
        <th scope="col">Стоимость</th>
        <th scope="col">Действие</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.id }}</td>
        <!--Пишем :src, поскольку это переменная-->
<!--        <td><img :src="product.image" width="50"></td>-->
        <td><img :src="product.image" width="50"></td>
        <td>{{ product.title }}</td>
        <td>{{ product.description }}</td>
        <td>{{ product.price }}</td>
        <td>
          <!--Кнопка Редактировать-->
          <div class="btn-group mr-2">
            <router-link :to="`/products/${product.id}/edit`" class="btn btn-sn btn-outline-secondary">Редактировать
            </router-link>
          </div>
          <!--Кнопка Удалить-->
          <div class="btn-group mr-2">
            <a href="javascript:void(0)" class="btn btn-sn btn-outline-secondary" @click="del(product.id)">Удалить</a>
          </div>

        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <!-- Для постраничного вывода будем использовать самописсный компонент paginator-->
  <!--Передаем последнюю страницу через defineProps, с использованием emit и event-->
  <paginator-component :last-page="lastPage" @page-changed="load($event)"/>

</template>

<style scoped>

</style>