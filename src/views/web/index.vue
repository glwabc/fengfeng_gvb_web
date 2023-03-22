<template>
  <div class="base_view index_view">
    <GVBNav></GVBNav>
    <GVBBanner></GVBBanner>
    <div class="gvb_base_container">
      <div class="gvb_inner_container gvb_index_main">
        <div class="left">
          <GVBCCard title="今日热搜" link_name="查看更多" link="/news">
            123
          </GVBCCard>
        </div>
        <div class="right">
          1
        </div>
      </div>
    </div>
    <div class="gvb_footer"></div>
  </div>
</template>

<script setup>
import GVBNav from "@/components/gvb_nav.vue"
import GVBBanner from "@/components/gvb_banner.vue"
import GVBCCard from "@/components/gvb_card.vue"
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

.index_view {
  .gvb_inner_container {
    display: flex;
    justify-content: space-between;
  }

  .gvb_index_main {
    .left {
      width: calc(100% - 416px);
    }

    .right {
      width: 396px;
    }
  }

}

</style>