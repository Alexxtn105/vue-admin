<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import {Role} from "@/models/Role";

const roles = ref([])

onMounted(async () => {
  try {
    const {data} = await axios.get('roles')

    roles.value = data;
  } catch (e) {
    alert(e);
  }
});

const del = async (id: number) => {
  //выводим подтверждение
  if (confirm('Вы уверены, что желаете удалить роль?')) {
    try {
      // удалаяем роль в бэкенде
      await axios.delete(`roles/${id}`);

      // также обновляем данные во фроненде
      // предварительно нужно создать структуру role в @/models/role (документ typescript)
      // фактически, просто применяем фильтр (не равно ИД роли)
      roles.value = roles.value.filter((r: Role) => r.id !== id);
    } catch (e) {
      alert(e)
    }
  }
}

</script>

<template>
  <!--Кнопка Добавить роль-->
  <div class="btn-group mr-2">
    <router-link to="/roles/create" class="btn btn-sn btn-outline-secondary">Добавить</router-link>
  </div>

  <!--  Таблица ролей-->
  <div class="table-responsive small">
    <table class="table table-striped table-sm">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Имя</th>
        <th scope="col">Действия</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="role in roles" :key="role.id">
        <td>{{ role.id }}</td>
        <td>{{ role.name }}</td>
        <td>
          <!--Кнопка Редактировать-->
          <div class="btn-group mr-2">
            <router-link :to="`/roles/${role.id}/edit`" class="btn btn-sn btn-outline-secondary">Редактировать
            </router-link>
          </div>
          <!--Кнопка Удалить-->
          <div class="btn-group mr-2">
            <a href="javascript:void(0)" class="btn btn-sn btn-outline-secondary" @click="del(role.id)">Удалить</a>
          </div>

        </td>
      </tr>
      </tbody>
    </table>
  </div>


</template>

<style scoped>

</style>