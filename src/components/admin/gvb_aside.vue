<template>
  <aside class="gvb_aside">
    <div class="gvb_aside_header flex">
      <div class="gvb_aside_logo flex">
        <img src="/slogan.png" alt="">
      </div>
      <div class="gvb_aside_title">枫枫知道后台系统</div>
    </div>
    <div class="gvb_aside_body flex">
      <GVBAsideMenu></GVBAsideMenu>
    </div>
  </aside>
</template>

<script setup>
import GVBAsideMenu from "./gvb_aside_menu.vue"
</script>

<style lang="scss">
.gvb_aside {
  width: 240px;
  height: 100vh;
  background-color: var(--slide);
  overflow-y: auto;

  .gvb_aside_header {
    width: 100%;
    height: 180px;
    flex-direction: column;
  }

  .gvb_aside_logo {
    padding: 10px;

    img {
      width: 80%;
    }
  }

  .gvb_aside_title {
    font-size: 20px;
    color: #e7e7e7;
  }
}
</style>