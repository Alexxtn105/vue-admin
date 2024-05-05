<script setup lang="ts">
import {onMounted} from "vue";
import axios from "axios";
import * as c3 from 'c3'; //  npm install c3 @types/c3

onMounted(async () => {
  // создаем при помощи c3 заготовку для чарта
  const chart = c3.generate({
    bindto: '#chart',
    data: {
      x: 'x',
      columns: [
        //тестовые данные
        //['x', '2024-4-1','2024-5-1','2024-6-1'],
        //['Sales', 100, 200, 150]

        //реальные данные:
        ['x', '2024-4-1','2024-5-1','2024-6-1'],
        ['Sales', 100, 200, 150]

      ],
      types: {
        Sales: 'bar'
      }
    },

    axis: {
      x: {
        type: 'timeseries',
        tick: {
          format: '%Y-%m-%d'
        }
      }
    }
  });

  //делаем запрос для получения оеальных данных для графика
  const {data} = await axios.get('chart')

  //подгружаем данные в график
  chart.load({
    columns:[
        //используем spread-оператор "..."
        ['x', ...data.map((r:any)=>r.date)],
        ['Sales', ...data.map((r:any)=>r.sum)]
    ],
  })

});


</script>

<template>
  <h2>Daily sales</h2>
  <div id="chart"></div>
</template>