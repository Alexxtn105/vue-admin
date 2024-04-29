<template>
  <!--  Таблица пользователей-->
  <div class="table-responsive small">
    <table class="table table-striped table-sm">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Имя</th>
        <th scope="col">Email</th>
        <th scope="col">Роль</th>
        <th scope="col">Действия</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.first_name + ' ' + user.last_name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.role.name }}</td>
        <td>
<!--          <div class="btn-group mr-2">-->
<!--            <a href="javascript:void(0)" class="btn btn-sn btn-outline-secondary">Удалить</a>-->
<!--          </div>-->
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <!--  Кнопки Предыдущая и Следующая-->
  <nav>
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="javascript:void(0)" @click="prev">Предыдущая</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="javascript:void(0)" @click="next">Следующая</a>
      </li>
    </ul>
  </nav>
</template>

<!--Здесь используем сиснтаксис script setup, доступный в vue 3.-->
<!--Хороший материал по теме: https://www.koderhq.com/tutorial/vue/script-setup/-->
<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import axios from "axios";

//объявляем пустой массив для списка всех пользователей
const users = ref([]);
const page = ref(1);
const lastPage = ref(0);

//функция подгрузки списка пользователей
const load = async () => {
  // вариант без pagination
  // const {data} = await axios.get('users');
  // вариант с pagination
  const {data} = await axios.get(`users?page=${page.value}`);

  // Присваиваем влеичине users полученные из бэкенда данные
  // Здесь data.data означает то, что первая величина обеспечивается axios'ом,
  // а вторая бэкендом, так как мы используем pagination
  users.value = data.data;

  //берем индекс последней страницы из принятых данных, чтобы ограничить навигацию
  lastPage.value = data.meta.last_page;
}

// выводим список всех пользователей
onMounted(load);

// вариант страничного вывода с watch:
// при изменении наблюдаемой величины вызывается функция load
watch(page, load);

//добавляем постраничный вывод (pagination) - ВАРИАНТ с watch
//переход на предыдцщую страницу
const prev = async () => {
  //просто меняем номер страницы
  if (page.value > 1)
    page.value--;
};

//переход на следующую страницу
const next = async () => {
  //просто меняем номер страницы
  if (page.value <= lastPage.value)
    page.value++;
};

// //добавляем постраничный вывод (pagination) - ВАРИАНТ БЕЗ watch
// //переход на предыдцщую страницу
// const prev = async () => {
//   if (page.value <= 1)
//     return
//   page.value--;
//   await load();
// };
//
// //переход на следующую страницу
// const next = async () => {
//   if (page.value > lastPage.value)
//     return;
//   page.value++;
//   await load();
// };

</script>

<!--Это вариант с кучей бойлерплейта, тянущийся из vue 2-->
<!--<script lang="ts">-->
<!--import {onMounted, ref} from "vue";-->
<!--import axios from "axios";-->

<!--export default {-->
<!--  setup() {-->
<!--    const users = ref([]);-->

<!--    // выводим список всех пользователей-->
<!--    onMounted(async () => {-->
<!--      const {data} = await axios.get('users');-->

<!--      // Присваиваем влеичине users полученные из бэкенда данные-->
<!--      // Здесь data.data означает то, что первая величина обеспечивается axios'ом-->
<!--      users.value = data.data;-->

<!--    });-->

<!--    return {-->
<!--      users-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->



