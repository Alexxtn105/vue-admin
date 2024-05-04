<!--Кнопка открытия файла-->
<script setup lang="ts">
import {defineEmits} from "vue";

// upload - Функция загрузки собственных изображений из файлов
import axios from "axios";


// обязательно объявляем свойства (для получения данных в выизуальных компонент из других компонентов)
/*const props = defineProps({
    context: SetupContext
});
*/


// также объявляем нотификацию об изменении свойств, для генерации событий
const emit = defineEmits(['uploaded']);

const upload=()=>{
  alert('222')
}
const upload33 = async (files: FileList | null) => {
  if (files === null)
    return;

  //берем ПЕРВЫЙ файл из списка открытых
  const file = files.item(0);
  // пихаем содержимое файла в объект FormData, котороый в дальнейшем можно использовать в post-запросах
  const formData = new FormData();
  formData.append('image', file);

//отправляем post-запрос на загрузку собственных изображений
  const {data} = await axios.post('upload',
      {
        // image: file   // <- так отправлять нельзя, нужно использовать FormData!!!
        image: formData, // <- так можно
      });

  // необходимо оповестить о том, что страница изменилась
  // то есть сделать emit, в параметре отправить url прикрепленного файла
  emit('uploaded', data.url);

}
</script>

<template>
  <label class="btn btn-primary">
    Открыть<input type="file" hidden @change="upload($event.target.files)">
  </label>
</template>

<style scoped>

</style>