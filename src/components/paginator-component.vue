<script setup lang="ts">


// вариант страничного вывода с watch:
// при изменении наблюдаемой величины вызывается функция load
import {ref, watch, defineProps, defineEmits} from "vue";

// обязательно объявляем свойства (для получения данных в выизуальных компонент из других компонентов)
const props = defineProps({
  lastPage: {type: Number, default: 1},
});


// также обхявляем нотификацию об изменении свойств, для генерации событий
const emit = defineEmits(['page-changed']);

// переменные для страничного вывода
const page = ref(1);
//const lastPage = ref(0);

watch(page, () => {
  // необходимо оповестить о том, что страница изменилась
  // то есть сделать emit
  emit('page-changed', page.value);
});


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
  if (page.value <= props.lastPage)
    page.value++;
};


</script>

<template>
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

<style scoped>

</style>