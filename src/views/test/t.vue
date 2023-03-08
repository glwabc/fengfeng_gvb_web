<template>
  <div>
    <GVModal v-model:visible="visible"></GVModal>
    <button @click="visible=!visible">显示</button>
  </div>
</template>

<script setup>
import {ref} from "vue";
import GVModal from "@/views/test/gv_modal.vue"

const visible = ref(false)

</script>

<style scoped>

</style>