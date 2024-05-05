<script setup lang="ts">

import {onMounted, ref} from "vue";
import axios from "axios";
import {Order} from "@/models/Order";
import PaginatorComponent from "@/components/paginator-component.vue";

//для полученных с сервера данных
const orders = ref([])
// переменные для страничного вывода
const lastPage = ref(0);

const load = async (page = 1) => {
  const {data} = await axios.get(`orders?page=${page}`);

  //присваиваем data.data поскольку данные выводятся постранично
  orders.value = data.data;

  //берем индекс последней страницы из принятых данных, чтобы ограничить навигацию
  lastPage.value = data.meta.last_page;
};

//как только сгенерировался html
onMounted(load);

// Функция удаления пользователя из таблицы по id
const del = async (id: number) => {
  //выводим подтверждение
  if (confirm('Вы уверены, что желаете удалить заказ?')) {
    //alert(`products/${id}`)
    try {
      // удалаяем пользователя в бэкенде
      await axios.delete(`orders/${id}`);

      // также обновляем данные во фроненде
      // предварительно нужно создать структуру user в @/models/order (документ typescript)
      // фактически, просто применяем фильтр (не равно ИД)
      orders.value = orders.value.filter((p: Order) => p.id !== id);
    } catch (e) {
      alert(e)
    }
  }
}

</script>

<template>
  <!--Кнопка Добавить-->
  <div class="btn-group mr-2">
    <router-link to="/orders/create" class="btn btn-sn btn-outline-secondary">Добавить</router-link>
  </div>

  <!--  Таблица-->
  <div class="table-responsive small">
    <table class="table table-striped table-sm">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Наименование</th>
        <th scope="col">Email</th>
        <th scope="col">Всего</th>
        <th scope="col">Действие</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="order in orders" :key="order.id">
        <td>{{ order.id }}</td>
        <td>{{ order.name }}</td>
        <td>{{ order.email }}</td>
        <td>{{ order.total }}</td>
        <td>
          <!--Кнопка Редактировать-->
          <div class="btn-group mr-2">
            <router-link :to="`/orders/${order.id}/edit`" class="btn btn-sn btn-outline-secondary">Редактировать
            </router-link>
          </div>
          <!--Кнопка Удалить-->
          <div class="btn-group mr-2">
            <a href="javascript:void(0)" class="btn btn-sn btn-outline-secondary" @click="del(order.id)">Удалить</a>
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