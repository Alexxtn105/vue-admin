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


const upload = async (files: FileList | null) => {
  if (files === null)
    return;

  //берем ПЕРВЫЙ файл из списка открытых
  const file = files.item(0);

  //alert(file.slice().size)

  // пихаем содержимое файла в объект FormData, котороый в дальнейшем можно использовать в post-запросах
  const formData = new FormData();
  formData.append("image", file);

//отправляем post-запрос на загрузку собственных изображений
  try {
    const {data} = await axios.post('upload',
        {
//         // image: file   // <- так отправлять нельзя, нужно использовать FormData!!!
          image: formData // <- так можно
        });
    //тестовый вывод данных
    //const data={
    //  url:"http://localhost:3000/uploads/test.jpg"
    // }

    // необходимо оповестить о том, что страница изменилась
    // то есть сделать emit, в параметре отправить url прикрепленного файла
    emit('uploaded', data.url);
  } catch (e) {
    alert(e);
    return;
  }


}
</script>

<template>
  <label class="btn btn-primary">
    Открыть<input type="file" hidden @change="upload($event.target.files)">
  </label>
</template>

<style scoped>

</style>