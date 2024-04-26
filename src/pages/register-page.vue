<template>
  <h1>{{ count }}</h1>
  <input type="number" v-model:="count">
</template>

<script>

import {ref} from 'vue'

export default {
  setup() {
    let count = ref(0);
    return {
      count
    }
  }
}
</script>





