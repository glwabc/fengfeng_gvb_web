<template>
  <div class="base_view index_view">
    <GVBNav></GVBNav>
    <GVBBanner></GVBBanner>
    <div class="gvb_base_container">
      <div class="gvb_inner_container gvb_index_main">
        <div class="left">
          <GVBNews></GVBNews>
          <GVBArticleCalendarCard style="margin-top: 20px"></GVBArticleCalendarCard>
        </div>
        <div class="right">
          <GVBTagsCard></GVBTagsCard>
          <GVBSiteCard style="margin-top: 20px"></GVBSiteCard>
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
import GVBNews from "@/components/index/gvb_news.vue"
import GVBArticleCalendarCard from "@/components/index/gvb_article_calendar.vue"
import GVBTagsCard from "@/components/index/gvb_tag_card.vue"
import GVBSiteCard from "@/components/index/gvb_site_card.vue"
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