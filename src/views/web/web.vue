<template>
  <router-view/>
</template>

<script setup>
import {useStore} from "@/stores/store";

const store = useStore()

store.loadNavList()
</script>


<style lang="scss">
.base_view {
  background-color: var(--bg);

  .gvb_base_container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;


    .gvb_inner_container {
      width: 1200px;
      margin-top: 20px;
    }
  }
}
</style>