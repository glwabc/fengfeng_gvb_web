<template>
  <GVIpt v-model="text"></GVIpt>
  <button @click="btn">点我</button>
</template>

<script setup>
import GVIpt from "./gv_ipt.vue"
import {ref} from "vue";
const text = ref("xxx")

function btn(){
  text.value = "牛逼"
}
</script>

<style scoped>

</style>