<template>
  <div>
    文章编辑
  </div>

</template>

<script setup>
import {useRoute} from "vue-router";
import {ref} from "vue";

const route = useRoute()

const content = ref("xxx")

console.log(route.params.id)
</script>

<style scoped>

</style>