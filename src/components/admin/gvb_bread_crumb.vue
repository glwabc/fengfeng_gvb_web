<template>
  <a-breadcrumb>
    <a-breadcrumb-item><a href="javascript:void (0)" @click="goto('admin_index')">首页</a></a-breadcrumb-item>
    <a-breadcrumb-item v-for="(item, index) in store.bread_crumb_list" :key="index">
      {{ item }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup>
import {useRouter} from "vue-router";
import {useStore} from "@/stores/store";

const store = useStore()
const router = useRouter()

function goto(name) {
  router.push({
    name: name
  })
}
</script>

<style scoped>

</style>