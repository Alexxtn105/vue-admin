<script setup lang="ts">

import {onMounted, ref} from "vue";
import axios from "axios";
import PaginatorComponent from "@/components/paginator-component.vue";

//для полученных с сервера данных
const orders = ref([]);
// переменные для страничного вывода
const lastPage = ref(0);

//прикручиваем анимацию для анамации выпадающего списка заказанных позиций
// в ней будет id заказа, список которого открыт в данный момент
const selected = ref(0);

const load = async (page = 1) => {
  const {data} = await axios.get(`orders?page=${page}`);

  //присваиваем data.data поскольку данные выводятся постранично
  orders.value = data.data;

  //берем индекс последней страницы из принятых данных, чтобы ограничить навигацию
  lastPage.value = data.meta.last_page;
};

//как только сгенерировался html
onMounted(load);

// функция анимации выпадающего списка позиций в заказе
const select = (id: number) => {
  //текущий выделенный заказ
  //selected.value = id;// <-если сделать так, то при повторном нажатии на кнопку "посмотреть" список свертываться не будет
  //можно сделать так:
  selected.value = selected.value !== id ? id : 0;
}


//экспорт списка в CSV
const exportCSV = async () => {
  // поскольку мы скачиваем файл, то в конфигурации запроса указываем тип ответа blob:
  const {data} = await axios.post('export', {}, {responseType: 'blob'});
  //создаем blob
  const blob = new Blob([data], {type: 'text/csv'});
  // для того, чтобы загрузить его, создаем линк (программно генерим гиперссылку):
  const link = document.createElement('a'); // создаем элемент "a" (anchor)
  link.href = window.URL.createObjectURL(data);     // создаем гиперссылку
  link.download = 'orders.csv';                     // это будет имя заугружаемомго файла
  link.click();                                     // программно нажимаем ссылку

}
</script>

<template>
  <!--Кнопка Добавить-->
  <div class="btn-group mr-2">
    <a href="javascript:void(0)" class="btn btn-sn btn-outline-primary" @click="exportCSV">Экспорт в CSV</a>
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
      <!--Этот template невидимый. Используем его тег для того, чтобы сделать вложенные строки заказанных товаров-->
      <template v-for="order in orders" :key="order.id">
        <tr>
          <td>{{ order.id }}</td>
          <td>{{ order.name }}</td>
          <td>{{ order.email }}</td>
          <td>{{ order.total }}</td>
          <td>
            <!--Кнопка Редактировать-->
            <!--            <div class="btn-group mr-2">-->
            <!--              <router-link :to="`/orders/${order.id}/edit`" class="btn btn-sn btn-outline-secondary">Редактировать-->
            <!--              </router-link>-->
            <!--            </div>-->
            <!--Кнопка Удалить-->
            <!--            <div class="btn-group mr-2">-->
            <!--              <a href="javascript:void(0)" class="btn btn-sn btn-outline-secondary" @click="del(order.id)">Удалить</a>-->
            <!--            </div>-->
            <!--            Кнопка Посмотреть состав заказа-->
            <div class="btn-group mr-2">
              <a href="javascript:void(0)" class="btn btn-sn btn-outline-secondary"
                 @click="select(order.id)">Посмотреть</a>
            </div>

          </td>
        </tr>
        <!--Вложенная таблица заказанных позиций-->
        <tr>
          <td colspan="5">
            <!--Добавляем условие вывода для анимации (будет показан только один выделенный заказ)-->
            <!--<div v-if="selected===order.id">-->
            <!--Тут же применяем стили анимации выпадающего списка вместо v-if. Также нужен класс overflow-hidden, иначе страшные наложения-->
            <div class="overflow-hidden" :class="selected===order.id ? 'show' : 'hide'">
              <table class="table table-striped table-sm">
                <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Товар</th>
                  <th scope="col">Количество</th>
                  <th scope="col">Цена</th>
                </tr>
                <tr v-for="item in order.order_items" :key="item.id">
                  <td>{{ item.id }}</td>
                  <td>{{ item.product_title }}</td>
                  <td>{{ item.quantity }}</td>
                  <td type="number">{{ item.price }}</td>
                </tr>
                </thead>
                <tbody>
                </tbody>
              </table>

            </div>
          </td>
        </tr>
      </template>

      </tbody>
    </table>
  </div>
  <!-- Для постраничного вывода будем использовать самописсный компонент paginator-->
  <!--Передаем последнюю страницу через defineProps, с использованием emit и event-->
  <paginator-component :last-page="lastPage" @page-changed="load($event)"/>

</template>

<!--Стиль для анимации выпадающего списка позиций-->
<style scoped>
.show {
  max-height: 150px;
  transition: max-height 300ms ease-in;
}

.hide {
  max-height: 0px;
  transition: max-height 300ms ease-out;
}
</style>