<!--Здесь используем сиснтаксис script setup, доступный в vue 3.-->
<!--Хороший материал по теме: https://www.koderhq.com/tutorial/vue/script-setup/-->
<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import axios from "axios";
import {User} from '@/models/User'
import PaginatorComponent from "@/components/paginator-component.vue";

//объявляем пустой массив для списка всех пользователей
const users = ref([]);
// переменные для страничного вывода
//const page = ref(1);
const lastPage = ref(0);

//функция подгрузки списка пользователей
const load = async (page=1) => {
  // вариант без pagination
  // const {data} = await axios.get('users');
  // вариант с pagination
  const {data} = await axios.get(`users?page=${page}`);

  // Присваиваем величине users полученные из бэкенда данные
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
// watch(page, load);


//добавляем постраничный вывод (pagination) - ВАРИАНТ с watch
//переход на предыдцщую страницу
// const prev = async () => {
//   //просто меняем номер страницы
//   if (page.value > 1)
//     page.value--;
// };

//переход на следующую страницу
// const next = async () => {
//   //просто меняем номер страницы
//   if (page.value <= lastPage.value)
//     page.value++;
// };


// Функция удаления пользователя из таблицы
// в параметрах - id пользователя
const del = async (id: number) => {
  //выводим подтверждение
  if (confirm('Вы уверены, что желаете удалить пользователя?')) {
    //alert(`users/${id}`)
    try {
      // удалаяем пользователя в бэкенде
      await axios.delete(`users/${id}`);

      // также обновляем данные во фроненде
      // предварительно нужно создать структуру user в @/models/user (документ typescript)
      // фактически, просто применяем фильтр (не равно ИД пользователя)
      users.value = users.value.filter((u: User) => u.id !== id);
    } catch (e) {
      alert(e)
    }
  }
}

</script>


<template>
  <!--Кнопка Добавить пользователя-->
  <div class="btn-group mr-2">
    <router-link to="/users/create" class="btn btn-sn btn-outline-primary">Добавить</router-link>
  </div>

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
          <!--Кнопка Редактировать пользователя-->
          <div class="btn-group mr-2">
            <router-link :to="`/users/${user.id}/edit`" class="btn btn-sn btn-outline-secondary">Редактировать
            </router-link>
          </div>
          <!--Кнопка Удалить пользователя-->
          <div class="btn-group mr-2">
            <a href="javascript:void(0)" class="btn btn-sn btn-outline-secondary" @click="del(user.id)">Удалить</a>
          </div>

        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <!-- Для постраничного вывода будем использовать самописсный компонент paginator-->
  <!--Передаем последнюю страницу через defineProps, с использованием emit и event-->
  <paginator-component :last-page="lastPage" @page-changed="load($event)"/>


  <!--  Кнопки Предыдущая и Следующая-->
<!--  <nav>-->
<!--    <ul class="pagination">-->
<!--      <li class="page-item">-->
<!--        <a class="page-link" href="javascript:void(0)" @click="prev">Предыдущая</a>-->
<!--      </li>-->
<!--      <li class="page-item">-->
<!--        <a class="page-link" href="javascript:void(0)" @click="next">Следующая</a>-->
<!--      </li>-->
<!--    </ul>-->
<!--  </nav>-->
</template>


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



