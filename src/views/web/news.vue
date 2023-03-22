<template>
  <div class="base_view index_view">
    <GVBNav></GVBNav>
    <GVBBanner
        url="http://blog.fengfengzhidao.com/uploads/file/cover/19.png"
        slogan="xxx"
        abstract="重新构造一些数据用于查询 func main(){ var studentList []Student DB.Find(&studentList).Delete(&studentList) studentList = []Student{ {ID: 1, Name:  true}, {ID:, {ID:"></GVBBanner>
    <div class="gvb_base_container">
      <div class="gvb_inner_container">

      </div>
    </div>
    <div class="gvb_footer"></div>
  </div>
</template>

<script setup>
import GVBNav from "@/components/gvb_nav.vue"
import GVBBanner from "@/components/gvb_banner.vue"

</script>

<style lang="scss">


.base_view {
  background-color: var(--bg);

  .gvb_base_container {
    display: flex;
    justify-content: center;


    .gvb_inner_container {
      min-height: 1000px;
      width: 1200px;
      margin-top: 20px;
    }
  }


}

</style>