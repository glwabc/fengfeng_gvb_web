<template>
  <div class="base_view index_view">
    <GVBNav is_show></GVBNav>
    <div class="gvb_banner">
      <img src="http://blog.fengfengzhidao.com/uploads/file/cover/republic-of-gamers-8-bit-3n.jpg" alt="">
    </div>
    <div class="gvb_base_container">
      <div class="gvb_inner_container">

      </div>
    </div>
    <div class="gvb_footer"></div>
  </div>
</template>

<script setup>
import GVBNav from "@/components/gvb_nav.vue"
</script>

<style lang="scss">


.base_view {
  background-color: var(--bg);

  .gvb_base_container {
    display: flex;
    justify-content: center;


    .gvb_inner_container {
      background-color: var(--card_bg);
      min-height: 1000px;
      width: 1200px;
      margin-top: 20px;
    }
  }

  .gvb_banner {
    height: 600px;
    width: 100%;
    background-color: #2b3539;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
}

</style>